import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getMyReceivedRsvp } from '../../services/rsvp';
import { ApiError } from '../../services/common';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RsvpDataType } from '../../types/rsvp-type';

const initialState: {
  isLoading: boolean;
  rsvp: RsvpDataType[];
  error: string | null;
} = {
  isLoading: true,
  rsvp: [],
  error: null,
};

// Define the async thunk
export const loadingRsvp = createAsyncThunk(
  'rsvp/loadingRsvp',
  async (_, {rejectWithValue}) => {
    try {
      const res = await getMyReceivedRsvp();
      if (res.status >= 200 && res.status < 300) {
        return res.data;
      } else {
        throw new Error('Unable to load rsvp');
      }
    } catch (e) {
      return rejectWithValue(
        (e as Error | ApiError)?.message || 'Unknown error',
      );
    }
  },
);

const rsvpSlice = createSlice({
  name: 'rsvp',
  initialState,
  reducers: {
    resetRsvp: state => {
      state.error = null;
      state.isLoading = true;
      state.rsvp = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadingRsvp.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadingRsvp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.rsvp = action.payload;
      })
      .addCase(loadingRsvp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

const rsvpReducer = rsvpSlice.reducer;
const persistedRsvpReducer = persistReducer(
  {
    key: 'rsvp',
    storage: AsyncStorage,
    whitelist: ['rsvp'],
  },
  rsvpReducer,
);

export const {resetRsvp} = rsvpSlice.actions;

export default persistedRsvpReducer;
