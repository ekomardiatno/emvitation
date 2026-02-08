import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { WeddingDataType } from './wedding-type';
import { EventDataType } from './event-type';

export type TemplateParamsProp = {
  action: 'view' | 'select';
  selectedTemplate?: string;
  from?: keyof AppStackParamList;
};

export type AuthStackParamList = {
  Login: undefined;
  Registration: undefined;
  RegistrationSuccess: undefined;
  AccountRecovery: undefined;
  ResetPassword: {
    resetPasswordToken: string;
  };
};

export type AppStackParamList = {
  Home: undefined;
  ChangePassword: undefined;
  WeddingForm?: {
    selectedTemplate?: string;
    wedding?: WeddingDataType;
  };
  Bill: undefined;
  Wallet: undefined;
  Profile: undefined;
  Template?: TemplateParamsProp;
  MyWedding: undefined;
  WeddingDetail: {
    wedding?: WeddingDataType;
  };
  ManageGuest: {invitationId: string};
  EventForm?: {
    invitationId: string;
    event?: EventDataType;
  };
  GiftInfoForm?: {
    invitationId: string;
    giftInfoId?: string;
  };
  RsvpList: undefined;
  WishList: undefined;
};

export type AppStackNavigationProp =
  NativeStackNavigationProp<AppStackParamList>;

export type AuthStackNavigationProp =
  NativeStackNavigationProp<AuthStackParamList>;
