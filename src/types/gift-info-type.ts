import { BaseCommonDataProp } from './common-type';

export type GiftInfoDataType = BaseCommonDataProp & {
  id: string;
  invitationId: string;
  type: 'bank' | 'e-wallet';
  provider:
    | 'BCA'
    | 'BRI'
    | 'BNI'
    | 'Mandiri'
    | 'BSI'
    | 'BRK Syariah'
    | 'BTN'
    | 'GoPay'
    | 'ShopeePay'
    | 'Dana';
  accountName: string;
  accountNumber: string;
};
