import { api } from './common';

export async function googleSignIn(idToken: string, signal?: AbortSignal) {
  const result = await api.post<{
    accessToken: string;
    refreshToken: string;
  }>(
    '/user/google-sign-in',
    { idToken },
    { signal },
  );

  return {
    status: result.status,
    data: result.data,
  };
}

export async function authRefreshToken(rt: string, signal?: AbortSignal) {
  const result = await api.post<{
    accessToken: string;
    refreshToken: string;
  }>(
    '/token/refresh',
    {
      refreshToken: rt,
    },
    {
      signal,
    },
  );

  return {
    status: result.status,
    data: result.data,
  };
}
