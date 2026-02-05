import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TemplateDataType } from '../../types/template-type';
import { findAllTemplates } from '../../services/template';
import { ApiError } from '../../services/common';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState: {
  isLoading: boolean;
  templates: TemplateDataType[];
  error: string | null;
} = {
  isLoading: true,
  templates: [],
  error: null,
};

// Define the async thunk
export const loadingTemplates = createAsyncThunk(
  'template/loadingTemplates',
  async (_, {rejectWithValue}) => {
    try {
      const res = await findAllTemplates();
      if (res.status >= 200 && res.status < 300) {
        return res.data;
      } else {
        throw new Error('Unable to load templates');
      }
    } catch (e) {
      return rejectWithValue(
        (e as Error | ApiError)?.message || 'Unknown error',
      );
    }
  },
);

const templateSlice = createSlice({
  name: 'template',
  initialState,
  reducers: {
    resetTemplates: state => {
      state.error = null;
      state.isLoading = true;
      state.templates = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadingTemplates.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadingTemplates.fulfilled, (state, action) => {
        state.isLoading = false;
        state.templates = action.payload;
      })
      .addCase(loadingTemplates.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

const templateReducer = templateSlice.reducer;
const persistedTemplateReducer = persistReducer(
  {
    key: 'template',
    storage: AsyncStorage,
    whitelist: ['templates'],
  },
  templateReducer,
);

export const {resetTemplates} = templateSlice.actions;

export default persistedTemplateReducer;
