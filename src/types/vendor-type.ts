import { BaseCommonDataType } from './common-type';

export type VendorDataType = BaseCommonDataType & {
  id: string;
  name: string;
  category: string | null;
  location: string | null;
  bannerImagePath: string | null;
  bannerImageMime: string | null;
  logoImagePath: string | null;
  logoImageMime: string | null;
  instagramUrl: string | null;
};
