import { useContext } from 'react';
import OtpContext from '../contexts/OtpContext';

export default function useOtp() {
  return useContext(OtpContext);
}
