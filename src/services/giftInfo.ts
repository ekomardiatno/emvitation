import { GiftInfoDataType } from '../types/gift-info-type';
import { api, ApiResponse } from './common';

export type createGiftInfoPayloadType = {
  invitationId: string;
  type: 'bank' | 'e-wallet';
  provider: string;
  accountName: string;
  accountNumber: string;
};

export async function addGiftInfo(
  payload: createGiftInfoPayloadType,
  signal?: AbortSignal,
) {
  const result = (await api.post(`/gift-info`, payload, {
    signal,
  })) as ApiResponse<GiftInfoDataType>;

  return {
    status: result.status,
    data: result.data,
    message: result.message,
  };
}

export type updateGiftInfoPayloadType = Partial<
  Omit<createGiftInfoPayloadType, 'invitationId'>
>;

export async function updateGiftInfo(
  giftInfoId: string,
  payload: updateGiftInfoPayloadType,
  signal?: AbortSignal,
) {
  const result = (await api.put(`/gift-info/${giftInfoId}`, payload, {
    signal,
  })) as ApiResponse<GiftInfoDataType>;

  return {
    status: result.status,
    data: result.data,
    message: result.message,
  };
}

export async function deleteGiftInfo(giftInfoId: string, signal?: AbortSignal) {
  const result = (await api.delete(`/gift-info/${giftInfoId}`, {
    signal,
  })) as ApiResponse<null>;

  return {
    status: result.status,
    data: result.data,
    message: result.message,
  };
}

export async function getGiftInfoByInvitationId(
  invitationId: string,
  signal?: AbortSignal,
) {
  const result = (await api.get(`/gift-info/${invitationId}`, {
    signal,
  })) as ApiResponse<GiftInfoDataType[]>;

  return {
    status: result.status,
    data: result.data,
    message: result.message,
  };
}
