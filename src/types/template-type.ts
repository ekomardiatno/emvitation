import { BaseCommonDataProp } from './common-type';

export type TemplateDataType = BaseCommonDataProp & {
  id: string;
  name: string;
  description: string | null;
  previewImagePath: string;
  previewImageMime: string;
};
