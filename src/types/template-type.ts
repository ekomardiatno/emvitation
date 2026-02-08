import { BaseCommonDataType } from './common-type';

export type TemplateDataType = BaseCommonDataType & {
  id: string;
  name: string;
  description: string | null;
  previewImagePath: string;
  previewImageMime: string;
  templateCode: string | null;
};
