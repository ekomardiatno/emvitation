import { BaseCommonDataType } from './common-type';

export type WishDataType = BaseCommonDataType & {
  id: string;
  invitationId: string;
  guestName: string;
  message: string;
};
