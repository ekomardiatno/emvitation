import { BaseCommonDataProp } from './common-type';

export type EventDataType = BaseCommonDataProp & {
  id: string;
  invitationId: string;
  title: string;
  date: Date | string;
  startTime: string;
  endTime: string;
  address: string | null;
  location: string | null;
  isMainEvent: boolean;
};
