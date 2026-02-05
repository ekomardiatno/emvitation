import { store } from '.';
import { tokenService } from '../../services/tokenService';

export const syncTokensFromStore = () => {
  const state = store.getState().auth;

  if (state.accessToken && state.refreshToken) {
    tokenService.setTokens(state.accessToken, state.refreshToken);
  }
};
