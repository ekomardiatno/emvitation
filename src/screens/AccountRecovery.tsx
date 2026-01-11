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

  const onVerifiedOtp = () => {
    navigation.replace('ResetPassword', {
      resetPasswordToken: 'tokenwillbepassedfromhere',
    });
  };

  const onSendCode = handleSubmit(() => {
    const values = getValues();
    otp.requestOtp(onVerifiedOtp, values.phoneNumber);
  });

  return (
    <ScreenLayout>
      <Typography category="h2">Pemulihan Akun</Typography>
      <Typography category="small" marginTop={SPACING.xs} style={{marginBottom: SPACING.lg}}>
        Masukkan nomor telepon untuk memulihkan akun
      </Typography>

      <Input
        control={control}
        name="phoneNumber"
        placeholder="081234567890"
        label="Nomor HP"
        containerStyle={{marginBottom: SPACING.lg}}
      />
      <Button isLoading={otp.isRequestingOtp} onPress={onSendCode}>
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
