import { APP_API_NOAUTH_TOKEN } from '../config';
import { ApiResponse, api } from './common';

export async function login(
  phone: string,
  password: string,
  signal?: AbortSignal,
) {
  const result = await api.post<{
    accessToken: string;
    refreshToken: string;
  }>(
    '/user/login',
    {
      phone,
      password,
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

export async function getOtp(phone: string, signal?: AbortSignal) {
  const result = await api.post<{
    validUntil: number;
    otp: string;
  }>(
    '/otp-request',
    {
      phone,
    },
    {
      headers: {
        Authorization: `Bearer ${APP_API_NOAUTH_TOKEN}`,
      },
      signal,
    },
  );

  return {
    status: result.status,
    data: result.data,
  };
}

export async function requestResetPassword(
  phone: string,
  signal?: AbortSignal,
) {
  const result = await api.post<{
    token: string;
  }>(
    '/reset-password-request',
    {
      phone,
    },
    {
      headers: {
        Authorization: `Bearer ${APP_API_NOAUTH_TOKEN}`,
      },
      signal,
    },
  );

  return {
    status: result.status,
    data: result.data,
  };
}

export async function resetPassword(
  data: {
    newPassword: string;
    reNewPassword: string;
  },
  token: string,
  signal?: AbortSignal,
) {
  const result = (await api.post(
    '/user/reset-password',
    {
      newPassword: data.newPassword,
      reNewPassword: data.reNewPassword,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      signal,
    },
  )) as ApiResponse<null>;

  return {
    status: result.status,
    data: result.data,
    message: result.message,
  };
}

export async function register(
  data: {
    name: string;
    phone: string;
    password: string;
    rePassword: string;
  },
  signal?: AbortSignal,
) {
  const result = (await api.post('/user', data, {
    headers: {
      Authorization: `Bearer ${APP_API_NOAUTH_TOKEN}`,
    },
    signal,
  })) as ApiResponse<null>;

  return {
    status: result.status,
    data: result.data,
    message: result.message,
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
