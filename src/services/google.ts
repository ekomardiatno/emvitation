import { SearchTextProps } from '../types/google-place-type';
import { api } from './common';

export async function searchPlaces(
  data: {
    textQuery: string;
    location?: {
      latitude: number;
      longitude: number;
      radius?: number;
    };
    pageToken?: string;
  },
  signal?: AbortSignal,
) {
  const result = await api.post<SearchTextProps>(
    '/google/search-places',
    data,
    {
      signal,
    },
  );

  return {
    status: result.status,
    data: result.data,
  };
}
