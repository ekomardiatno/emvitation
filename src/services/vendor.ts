import { VendorDataType } from '../types/vendor-type';
import { api } from './common';

export default async function getAllVendors(signal?: AbortSignal) {
  const result = await api.get<VendorDataType[]>('/vendor', {
    signal,
  });

  return {
    status: result.status,
    data: result.data,
  };
}
