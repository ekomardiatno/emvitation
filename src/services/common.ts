import axios, { AxiosResponse } from 'axios';
import { APP_API_URL } from '../config';
import { tokenService } from './tokenService';
import { authRefreshToken } from './auth';
import { resetAppState, store } from '../redux/store';
import { loginSuccess } from '../redux/reducers/auth.reducer';

const api = axios.create({
  baseURL: APP_API_URL,
});

let isRefreshing = false;
let queue: {
  resolve: (token: string) => void;
  reject: (err: any) => void;
}[] = [];

const processQueue = (error: any, token: string | null = null) => {
  queue.forEach(p => (error ? p.reject(error) : p.resolve(token!)));

  queue = [];
};

api.interceptors.response.use(
  (
    response: AxiosResponse<{
      success: boolean;
      data: any;
      message?: string;
    }> & {
      message?: string;
    },
  ) => {
    response.message = response.data.message;
    response.data = response.data.data;
    return response;
  },
  async error => {
    console.error(error);
    console.log(error.config);
    const originalRequest = error.config;

    const status = error.response?.status || error.status || 500;
    const errorData = error.response?.data as
      | {
          message: string,
          errors?: any[]
        }
      | undefined;
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject({
        status,
        message: errorData?.message || error.message,
      });
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        queue.push({
          resolve: token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(api(originalRequest));
          },
          reject,
        });
      });
    }

    isRefreshing = true;

    try {
      const res = await authRefreshToken(tokenService.getRefreshToken() || '');
      const {accessToken, refreshToken} = res.data;

      store.dispatch(loginSuccess({accessToken, refreshToken}));

      processQueue(null, accessToken);

      originalRequest.headers.Authorization = `Bearer ${accessToken}`;

      return api(originalRequest);
    } catch (err) {
      processQueue(err);
      resetAppState(store.dispatch);
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  },
);

api.interceptors.request.use(config => {
  const token = tokenService.getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export {api};

export type ApiError = {
  status: number;
  message: string;
};

export interface ApiResponse<T = any> {
  status: number;
  data: T;
  message?: string;
}
