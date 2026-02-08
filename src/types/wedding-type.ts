import { BaseCommonDataType } from './common-type';

export type WeddingDataType = BaseCommonDataType & {
  id: string;
  userId: string;
  templateId: string;
  invitationId: string;
  groomName: string;
  brideName: string;
  groomNickname: string | null;
  brideNickname: string | null;
  groomFatherName: string | null;
  brideFatherName: string | null;
  groomMotherName: string | null;
  brideMotherName: string | null;
  groomHometown: string | null;
  brideHometown: string | null;
  groomPhotoPath: string | null;
  groomPhotoMime: string | null;
  bridePhotoPath: string | null;
  bridePhotoMime: string | null;
  status: 'draft' | 'locked' | 'published';
};
