import { BaseCommonDataType } from './common-type';

export type EventDataType = BaseCommonDataType & {
  id: string;
  invitationId: string;
  title: string;
  date: Date | string;
  startTime: string;
  endTime: string;
  venue: string | null;
  address: string | null;
  location: string | null;
  isMainEvent: boolean;
};
