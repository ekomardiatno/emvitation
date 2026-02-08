import { RsvpDataType } from '../types/rsvp-type';
import { api } from './common';

export async function getMyReceivedRsvp(signal?: AbortSignal) {
  const result = await api.get<RsvpDataType[]>('/rsvp/my-received-rsvp', {
    signal,
  });

  return {
    status: result.status,
    data: result.data,
  };
}
