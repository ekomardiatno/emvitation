import { BaseCommonDataType } from './common-type';

export type RsvpDataType = BaseCommonDataType & {
  id: string;
  guestId: string;
  status: 'attending' | 'not_attending' | 'maybe' | null;
  message: string | null;
};
