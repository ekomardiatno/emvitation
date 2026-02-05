let accessToken: string | null = null;
let refreshToken: string | null = null;

export const tokenService = {
  setTokens(at: string, rt: string) {
    accessToken = at;
    refreshToken = rt;
  },

  clear() {
    accessToken = null;
    refreshToken = null;
  },

  getAccessToken() {
    return accessToken;
  },

  getRefreshToken() {
    return refreshToken;
  },
};
