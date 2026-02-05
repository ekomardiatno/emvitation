import ScreenLayout from '../components/core/ScreenLayout';
import Typography from '../components/core/Typography';
import * as yup from 'yup';
import { phoneRegex } from '../regexs';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Input from '../components/core/Input';
import { SPACING } from '../constants';
import Button from '../components/core/Button';
import OtpProvider from '../components/OtpProvider';
import useOtp from '../hooks/useOtp';
import useAppNavigation from '../hooks/useAppNavigation';
import { useCallback, useEffect, useState } from 'react';
import { requestResetPassword } from '../services/auth';
import { ApiError } from '../services/common';
import useToast from '../hooks/useToast';

const recoverySchema = yup.object({
  phoneNumber: yup
    .string()
    .required('Nomor HP harus diisi')
    .matches(phoneRegex, 'Nomor HP tidak valid'),
});

function AccountRecoveryScreen() {
  const {control, handleSubmit, getValues} = useForm({
    resolver: yupResolver(recoverySchema),
  });
  const otp = useOtp();
  const navigation = useAppNavigation();
  const [isRequestingResetPassword, setIsRequestingResetPassword] =
    useState(false);
  const toast = useToast();
  const [prevPhoneNumber, setPrevPhoneNumber] = useState<null | string>(null);

  const onVerifiedOtp = async () => {
    setIsRequestingResetPassword(true);
  };

  const onSendCode = handleSubmit(() => {
    const values = getValues();
    if (values.phoneNumber !== prevPhoneNumber) {
      otp.requestOtp(onVerifiedOtp, values.phoneNumber);
    } else {
      onVerifiedOtp();
    }
  });

  const fetchResetPassword = useCallback(
    async (signal?: AbortSignal) => {
      const values = getValues();
      setPrevPhoneNumber(values.phoneNumber);
      try {
        const res = await requestResetPassword(values.phoneNumber, signal);
        if (res.status >= 200 && res.status < 300 && res.data.token) {
          navigation.replace('ResetPassword', {
            resetPasswordToken: res.data.token,
          });
          setIsRequestingResetPassword(false);
        } else {
          throw new Error('Unable to reset password');
        }
      } catch (e) {
        if (
          (e instanceof Error && e.message !== 'canceled') ||
          (e as ApiError).status
        ) {
          toast.show(
            'error',
            (e as Error | ApiError).message || 'Unable to login',
          );
        }
        setIsRequestingResetPassword(false);
      }
    },
    [getValues, navigation, toast],
  );

  useEffect(() => {
    const controller = new AbortController();
    if (isRequestingResetPassword) {
      const signal = controller.signal;
      fetchResetPassword(signal);
    } else {
      controller.abort();
    }
  }, [isRequestingResetPassword, fetchResetPassword]);

  return (
    <ScreenLayout>
      <Typography category="h2">Pemulihan Akun</Typography>
      <Typography
        category="small"
        marginTop={SPACING.xs}
        style={{marginBottom: SPACING.lg}}>
        Masukkan nomor telepon untuk memulihkan akun
      </Typography>

      <Input
        control={control}
        name="phoneNumber"
        placeholder="081234567890"
        label="Nomor HP"
        editable={!(otp.isRequestingOtp || isRequestingResetPassword)}
        containerStyle={{marginBottom: SPACING.lg}}
      />
      <Button
        isLoading={otp.isRequestingOtp || isRequestingResetPassword}
        onPress={onSendCode}>
        Kirim Kode
      </Button>
    </ScreenLayout>
  );
}

export default function AccountRecovery() {
  return (
    <OtpProvider>
      <AccountRecoveryScreen />
    </OtpProvider>
  );
}
