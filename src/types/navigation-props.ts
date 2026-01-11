import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type TemplateParamsProp = {
  action: 'view' | 'select';
  onSelected?: (templateId: number) => void;
};

export type RouteNavigationParamList = {
  Login: undefined;
  Registration: undefined;
  RegistrationSuccess: undefined;
  AccountRecovery: undefined;
  ResetPassword: {
    resetPasswordToken: string;
  };
  ChangePassword: undefined;
  Home: undefined;
  CreateInvitation: undefined;
  Bill: undefined;
  Wallet: undefined;
  Profile: undefined;
  Template?: TemplateParamsProp;
  MyInvitation: undefined;
  InvitationDetail: {invitationId: number};
  ManageGuest: {invitationId: number};
  CreateEvent: undefined;
};

export type NavigationProp =
  NativeStackNavigationProp<RouteNavigationParamList>;
