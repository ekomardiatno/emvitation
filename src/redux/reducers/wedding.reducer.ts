import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WeddingDataType } from '../../types/wedding-type';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { findMyWeddingList } from '../../services/wedding';
import { ApiError } from '../../services/common';

const initialState: {
  weddings: WeddingDataType[];
  isLoading: boolean;
  error: string | null;
} = {
  weddings: [],
  isLoading: true,
  error: null,
};

// Define the async thunk
export const loadingWeddings = createAsyncThunk(
  'wedding/loadingWeddings',
  async (_, {rejectWithValue}) => {
    try {
      const res = await findMyWeddingList();
      if (res.status >= 200 && res.status < 300) {
        return res.data;
      } else {
        throw new Error('Unable to load weddings');
      }
    } catch (e) {
      return rejectWithValue(
        (e as Error | ApiError)?.message || 'Unknown error',
      );
    }
  },
);

const weddingSlice = createSlice({
  name: 'wedding',
  initialState,
  reducers: {
    patchWedding: (state, action: PayloadAction<WeddingDataType>) => {
      state.weddings = state.weddings.map(w => {
        if (w.id === action.payload.id) {
          return {
            ...w,
            ...action.payload,
          };
        }
        return w;
      });
    },
    pushWedding: (state, action: PayloadAction<WeddingDataType>) => {
      state.weddings.push(action.payload);
    },
    resetWeddings: state => {
      state.error = null;
      state.isLoading = true;
      state.weddings = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadingWeddings.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadingWeddings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.weddings = action.payload;
      })
      .addCase(loadingWeddings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

const weddingReducer = weddingSlice.reducer;
const persistedWeddingReducer = persistReducer(
  {
    key: 'wedding',
    storage: AsyncStorage,
    whitelist: ['weddings'],
  },
  weddingReducer,
);

export const {patchWedding, pushWedding, resetWeddings} = weddingSlice.actions;

export default persistedWeddingReducer;
