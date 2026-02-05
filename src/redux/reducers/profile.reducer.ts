import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProfileType } from '../../types/profile-type';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState: ProfileType = {
  data: {
    name: null,
    phone: null,
  },
  isLoading: true,
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (
      state,
      action: PayloadAction<{name: string; phone: string}>,
    ) => {
      state.data.name = action.payload.name;
      state.data.phone = action.payload.phone;
      state.isLoading = false;
    },
    resetProfile: state => {
      state.data.name = null;
      state.data.phone = null;
      state.isLoading = true;
      state.error = null;
    },
    gettingProfile: state => {
      state.error = null;
      state.isLoading = true;
    },
    getProfileError: (state, action: PayloadAction<{error: string}>) => {
      state.error = action.payload.error;
      state.isLoading = false;
    },
  },
});

const profileReducer = profileSlice.reducer;

const persitedProfileReducer = persistReducer(
  {
    key: 'profile',
    storage: AsyncStorage,
    whitelist: ['data'],
  },
  profileReducer,
);

export const {getProfileError, gettingProfile, resetProfile, setProfile} =
  profileSlice.actions;

export default persitedProfileReducer;
