import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EventDataType } from '../../types/event-type';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { findMyEvents } from '../../services/event';
import { ApiError } from '../../services/common';

const initialState: {
  events: EventDataType[];
  isLoading: boolean;
  error: string | null;
} = {
  events: [],
  isLoading: true,
  error: null,
};

// Define the async thunk
export const loadingEvents = createAsyncThunk(
  'event/loadingEvents',
  async (_, {rejectWithValue}) => {
    try {
      const res = await findMyEvents({});
      if (res.status >= 200 && res.status < 300) {
        return res.data;
      } else {
        throw new Error('Unable to load events');
      }
    } catch (e) {
      return rejectWithValue(
        (e as Error | ApiError)?.message || 'Unknown error',
      );
    }
  },
);

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    patchEvent: (state, action: PayloadAction<EventDataType>) => {
      state.events = state.events.map(e => {
        if (e.id === action.payload.id) {
          return {
            ...e,
            ...action.payload,
          };
        }
        return e;
      });
    },
    pushEvent: (state, action: PayloadAction<EventDataType>) => {
      state.events.push(action.payload);
    },
    removeEvent: (state, action: PayloadAction<string>) => {
      state.events = state.events.filter(g => g.id !== action.payload);
    },
    resetEvents: state => {
      state.error = null;
      state.events = [];
      state.isLoading = true;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadingEvents.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadingEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.events = action.payload;
      })
      .addCase(loadingEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

const eventReducer = eventSlice.reducer;
const persistedEventReducer = persistReducer(
  {
    key: 'event',
    storage: AsyncStorage,
    whitelist: ['events'],
  },
  eventReducer,
);

export const {patchEvent, pushEvent, resetEvents, removeEvent} =
  eventSlice.actions;

export default persistedEventReducer;
