import { GuestDataType } from '../types/guest-type';
import { api, ApiResponse } from './common';

export async function findMyGuests(signal?: AbortSignal) {
  const result = await api.get<GuestDataType[]>('/guest/my-list', {
    signal,
  });

  return {
    status: result.status,
    data: result.data,
  };
}

type createGuestPayloadType = {
  invitationId: string;
  name: string;
};

export async function createGuest(
  data: createGuestPayloadType,
  signal?: AbortSignal,
) {
  const result = await api.post<GuestDataType>('/guest', data, {
    signal,
  });

  return {
    status: result.status,
    data: result.data,
  };
}

type updateGuestPayloadType = Omit<createGuestPayloadType, 'invitationId'>;

export async function updateGuest(
  guestId: string,
  data: updateGuestPayloadType,
  signal?: AbortSignal,
) {
  const result = (await api.patch(`/guest/${guestId}`, data, {
    signal,
  })) as ApiResponse<GuestDataType>;

  return {
    status: result.status,
    data: result.data,
    message: result.message,
  };
}
