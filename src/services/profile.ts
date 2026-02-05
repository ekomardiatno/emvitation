import { api, ApiResponse } from './common';

export async function getMyProfile(signal?: AbortSignal) {
  const result = await api.get<{phone: string; name: string}>(
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

export async function changePassword(
  data: {
    password: string;
    newPassword: string;
    reNewPassword: string;
  },
  signal?: AbortSignal,
) {
  const result = (await api.post('/user/change-password', data, {
    signal,
  })) as ApiResponse<null>;

  return {
    status: result.status,
    data: result.data,
    message: result.message,
  };
}
