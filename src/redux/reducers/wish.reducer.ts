import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getMyReceivedWishes } from '../../services/wish';
import { ApiError } from '../../services/common';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WishDataType } from '../../types/wish-type';

const initialState: {
  isLoading: boolean;
  wishes: WishDataType[];
  error: string | null;
} = {
  isLoading: true,
  wishes: [],
  error: null,
};

// Define the async thunk
export const loadingWishes = createAsyncThunk(
  'wish/loadingWishes',
  async (_, {rejectWithValue}) => {
    try {
      const res = await getMyReceivedWishes();
      if (res.status >= 200 && res.status < 300) {
        return res.data;
      } else {
        throw new Error('Unable to load wishes');
      }
    } catch (e) {
      return rejectWithValue(
        (e as Error | ApiError)?.message || 'Unknown error',
      );
    }
  },
);

const wishSlice = createSlice({
  name: 'wish',
  initialState,
  reducers: {
    resetWishes: state => {
      state.error = null;
      state.isLoading = true;
      state.wishes = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadingWishes.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadingWishes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.wishes = action.payload;
      })
      .addCase(loadingWishes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

const wishReducer = wishSlice.reducer;
const persistedWishReducer = persistReducer(
  {
    key: 'wish',
    storage: AsyncStorage,
    whitelist: ['wish'],
  },
  wishReducer,
);

export const {resetWishes} = wishSlice.actions;

export default persistedWishReducer;
