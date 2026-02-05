import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { VendorDataType } from '../../types/vendor-type';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getAllVendors from '../../services/vendor';
import { ApiError } from '../../services/common';

const initialState: {
  vendors: VendorDataType[];
  isLoading: boolean;
  error: string | null;
} = {
  vendors: [],
  isLoading: true,
  error: null,
};

// Define the async thunk
export const loadingVendors = createAsyncThunk(
  'vendor/loadingVendors',
  async (_, {rejectWithValue}) => {
    try {
      const res = await getAllVendors();
      if (res.status >= 200 && res.status < 300) {
        return res.data;
      } else {
        throw new Error('Unable to load vendors');
      }
    } catch (e) {
      return rejectWithValue(
        (e as Error | ApiError)?.message || 'Unknown error',
      );
    }
  },
);

const vendorSlice = createSlice({
  name: 'vendor',
  initialState,
  reducers: {
    resetWeddings: state => {
      state.error = null;
      state.isLoading = true;
      state.vendors = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadingVendors.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadingVendors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.vendors = action.payload;
      })
      .addCase(loadingVendors.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

const vendorReducer = vendorSlice.reducer;
const persistedVendorReducer = persistReducer(
  {
    key: 'vendor',
    storage: AsyncStorage,
    whitelist: ['vendors'],
  },
  vendorReducer,
);

export const {resetWeddings} = vendorSlice.actions;

export default persistedVendorReducer;
