import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GuestDataType } from '../../types/guest-type';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { findMyGuests } from '../../services/guest';
import { ApiError } from '../../services/common';

const initialState: {
  guests: GuestDataType[];
  isLoading: boolean;
  error: string | null;
} = {
  guests: [],
  isLoading: true,
  error: null,
};

// Define the async thunk
export const loadingGuests = createAsyncThunk(
  'guest/loadingGuests',
  async (_, {rejectWithValue}) => {
    try {
      const res = await findMyGuests();
      if (res.status >= 200 && res.status < 300) {
        return res.data;
      } else {
        throw new Error('Unable to load guests');
      }
    } catch (e) {
      return rejectWithValue(
        (e as Error | ApiError)?.message || 'Unknown error',
      );
    }
  },
);

const guestSlice = createSlice({
  name: 'guest',
  initialState,
  reducers: {
    patchGuest: (state, action: PayloadAction<GuestDataType>) => {
      state.guests = state.guests.map(e => {
        if (e.id === action.payload.id) {
          return {
            ...e,
            ...action.payload,
          };
        }
        return e;
      });
    },
    pushGuest: (state, action: PayloadAction<GuestDataType>) => {
      state.guests.push(action.payload);
    },
    resetGuests: state => {
      state.error = null;
      state.guests = [];
      state.isLoading = true;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadingGuests.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadingGuests.fulfilled, (state, action) => {
        state.isLoading = false;
        state.guests = action.payload;
      })
      .addCase(loadingGuests.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

const guestReducer = guestSlice.reducer;
const persistedGuestReducer = persistReducer(
  {
    key: 'guest',
    storage: AsyncStorage,
    whitelist: ['guests'],
  },
  guestReducer,
);

export const {patchGuest, pushGuest, resetGuests} = guestSlice.actions;

export default persistedGuestReducer;
