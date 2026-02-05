import persistReducer from 'redux-persist/es/persistReducer';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '../../types/auth-type';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { tokenService } from '../../services/tokenService';

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    finishAuthCheck: state => {
      state.isLoading = false;
    },

    loginSuccess: (
      state,
      action: PayloadAction<{accessToken: string; refreshToken: string}>,
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
      state.isLoading = false;

      tokenService.setTokens(
        action.payload.accessToken,
        action.payload.refreshToken,
      );
    },

    logout: state => {
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.isLoading = false;

      tokenService.clear();
    },
  },
});

export const {loginSuccess, logout, finishAuthCheck} =
  authSlice.actions;

const authReducer = authSlice.reducer;
const persistedAuthReducer = persistReducer(
  {
    key: 'auth',
    storage: AsyncStorage,
    whitelist: ['accessToken', 'refreshToken', 'isAuthenticated'],
  },
  authReducer,
);

export default persistedAuthReducer;
export {authReducer};
