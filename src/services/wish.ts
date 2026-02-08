import { WishDataType } from '../types/wish-type';
import { api } from './common';

export async function getMyReceivedWishes(signal?: AbortSignal) {
  const result = await api.get<WishDataType[]>('/wish/my-received-wishes', {
    signal,
  });

  return {
    status: result.status,
    data: result.data,
  };
}
