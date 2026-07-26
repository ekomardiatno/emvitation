import { api } from './common';

export async function getMyProfile(signal?: AbortSignal) {
  const result = await api.get<{email: string; name: string}>(
    '/user/find-my-profile',
    {
      signal,
    },
  );

  return {
    status: result.status,
    data: result.data,
  };
}
