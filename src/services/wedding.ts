import { fileObjetType } from '../types/common-type';
import { WeddingDataType } from '../types/wedding-type';
import { api, ApiResponse } from './common';

export type createWeddingPayloadType = {
  templateId: string;
  groomName: string;
  brideName: string;
  groomNickname?: string;
  brideNickname?: string;
  groomFatherName?: string;
  brideFatherName?: string;
  groomMotherName?: string;
  brideMotherName?: string;
  groomHometown?: string;
  brideHometown?: string;
  groomPhoto?: fileObjetType;
  bridePhoto?: fileObjetType;
};

export type updateWeddingPayloadType = Omit<
  createWeddingPayloadType,
  'templateId' | 'groomName' | 'brideName'
> & {
  templateId?: string;
  groomName?: string;
  brideName?: string;
  status?: 'published' | 'draft' | 'locked';
};

export async function createWedding(
  payload: createWeddingPayloadType,
  signal?: AbortSignal,
) {
  const formData = new FormData();

  for (const key of Object.keys(payload) as Array<
    keyof createWeddingPayloadType
  >) {
    const value = payload[key];
    if (value === undefined) {
      continue;
    }
    if ((value as fileObjetType).filename) {
      formData.append(key, {
        uri: (value as fileObjetType).uri,
        type: (value as fileObjetType).type,
        name: (value as fileObjetType).filename,
      } as any);
    } else {
      formData.append(key, value);
    }
  }

  const result = await api.post<WeddingDataType>('/wedding/create', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    signal,
  });

  return {
    status: result.status,
    data: result.data,
  };
}

export async function updateWedding(
  weddingId: string,
  payload: updateWeddingPayloadType,
  signal?: AbortSignal,
) {
  const formData = new FormData();

  for (const key of Object.keys(payload) as Array<
    keyof createWeddingPayloadType
  >) {
    const value = payload[key];
    if (value === undefined) {
      continue;
    }
    if ((value as fileObjetType).filename) {
      formData.append(key, {
        uri: (value as fileObjetType).uri,
        type: (value as fileObjetType).type,
        name: (value as fileObjetType).filename,
      } as any);
    } else {
      formData.append(key, value);
    }
  }
  const result = (await api.post(`/wedding/update/${weddingId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    signal,
  })) as ApiResponse<WeddingDataType>;

  return {
    status: result.status,
    data: result.data,
    message: result.message,
  };
}

export async function findMyWeddingList(signal?: AbortSignal) {
  const result = await api.get<WeddingDataType[]>('/wedding/my-list', {
    signal,
  });

  return {
    status: result.status,
    data: result.data,
  };
}
