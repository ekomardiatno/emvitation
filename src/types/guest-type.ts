import { BaseCommonDataProp } from './common-type';

export type GuestDataType = BaseCommonDataProp & {
  id: string;
  invitationId: string;
  name: string;
};
