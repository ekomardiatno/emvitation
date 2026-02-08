import { EventDataType } from '../types/event-type';
import { api, ApiResponse } from './common';

export async function findMyEvents(
  filter: {
    invitationId?: string;
  },
  signal?: AbortSignal,
) {
  const params = new URLSearchParams();

  if (filter.invitationId) {
    params.append('invitationId', filter.invitationId);
  }

  const result = await api.get<EventDataType[]>(
    `/event/my-list${params.toString() ? `?${params.toString()}` : ''}`,
    {
      signal,
    },
  );

  return {
    status: result.status,
    data: result.data,
  };
}

export type createEventPayloadType = {
  invitationId: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  address?: string | null;
  location?: string | null;
  isMainEvent?: boolean;
};

export async function createEvent(
  data: createEventPayloadType,
  signal?: AbortSignal,
) {
  const result = await api.post<EventDataType>('/event', data, {
    signal,
  });

  return {
    status: result.status,
    data: result.data,
  };
}

export type updateEventPayloadType = Omit<
  createEventPayloadType,
  'invitationId' | 'title' | 'date' | 'startTime' | 'endTime'
> & {
  invitationId?: string;
  title?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
};

export async function updateEvent(
  eventId: string,
  data: updateEventPayloadType,
  signal?: AbortSignal,
) {
  const result = (await api.patch(`/event/${eventId}`, data, {
    signal,
  })) as ApiResponse<EventDataType>;

  return {
    status: result.status,
    data: result.data,
    message: result.message,
  };
}

export async function deleteEvent(eventId: string, signal?: AbortSignal) {
  const result = (await api.delete(`/event/${eventId}`, {
    signal,
  })) as ApiResponse<null>;

  return {
    status: result.status,
    data: result.data,
    message: result.message,
  };
}
