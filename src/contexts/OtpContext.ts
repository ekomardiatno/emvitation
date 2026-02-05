import { createContext } from 'react';

const OtpContext = createContext<{
  requestOtp: (
    onVerifiedCallback: (otp?: string) => void,
    phoneNumber: string,
  ) => void;
  cancel: () => void;
  isRequestingOtp: boolean;
  requestOtpError: Error | null;
}>({
  requestOtp: () => {},
  cancel: () => {},
  isRequestingOtp: false,
  requestOtpError: null,
});

export default OtpContext;
