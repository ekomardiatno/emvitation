import { TemplateDataType } from '../types/template-type';
import { api } from './common';

export async function findAllTemplates(signal?: AbortSignal) {
  const res = await api.get<TemplateDataType[]>('/template', {
    signal,
  });

  return {
    status: res.status,
    data: res.data,
  };
}
