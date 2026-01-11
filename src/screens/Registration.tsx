import ScreenLayout from '../components/core/ScreenLayout';
import Typography from '../components/core/Typography';
import { View } from 'react-native';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { phoneRegex } from '../regexs';
import Input from '../components/core/Input';
import { HIDDEN_TEXT, SPACING } from '../constants';
import Button from '../components/core/Button';
import useAppNavigation from '../hooks/useAppNavigation';
import Divider from '../components/Divider';
import useOtp from '../hooks/useOtp';
import OtpProvider from '../components/OtpProvider';

const registerSchema = yup.object({
  name: yup.string().required('Nama harus diisi'),
  phoneNumber: yup
    .string()
    .required('Nomor HP harus diisi')
    .matches(phoneRegex, 'Nomor HP tidak valid'),
  password: yup
    .string()
    .required('Kata sandi harus diisi')
    .min(8, 'Kata sandi minimal 8 karakter'),
  reEnterPassword: yup
    .string()
    .required('Ulangi kata sandi harus diisi')
    .oneOf([yup.ref('password')], 'Kata sandi tidak cocok'),
});

function RegistrationScreen() {
  const {control, handleSubmit, getValues} = useForm({
    resolver: yupResolver(registerSchema),
  });
  const navigation = useAppNavigation();
  const otp = useOtp();

  const onSubmitting = handleSubmit(() => {
    const values = getValues();
    otp.requestOtp(() => {
      navigation.replace('RegistrationSuccess');
    }, values.phoneNumber);
  });

  return (
    <ScreenLayout headerEnabled={false}>
      <View style={{flexGrow: 1, justifyContent: 'center'}}>
        <View style={{marginBottom: SPACING.lg}}>
          <Typography category="h2">Daftar Akun</Typography>
          <Typography category="small" marginTop={SPACING.xs}>
            Silakan lengkapi data untuk membuat akun baru
          </Typography>
        </View>
        <View style={{gap: SPACING.md}}>
          <Input
            label="Name"
            placeholder="Eko Mardiatno"
            control={control}
            name="name"
            iconName="person"
          />
          <Input
            label="Nomor HP"
            placeholder="082212992212"
            control={control}
            name="phoneNumber"
            iconName="phone"
          />
          <Input
            control={control}
            label="Kata Sandi"
            secureTextEntry
            name="password"
            placeholder={HIDDEN_TEXT}
            iconName="lock"
          />
          <Input
            control={control}
            label="Ulangi Kata Sandi"
            secureTextEntry
            name="reEnterPassword"
            placeholder={HIDDEN_TEXT}
            iconName="lock"
          />
        </View>
        <View style={{marginTop: SPACING.xl}}>
          <Button onPress={onSubmitting} isLoading={otp.isRequestingOtp}>
            Daftar
          </Button>
        </View>
      </View>

      <View style={{marginTop: SPACING.xl}}>
        <Divider
          icon="circle"
          marginBottom={SPACING.md}
          marginHorizontal={SPACING.xl}
        />
        <Typography
          style={{textAlign: 'center'}}
          category="small"
          marginBottom={SPACING.sm}
          fontWeight={400}>
          Sudah punya akun?
        </Typography>
        <Button appearance="secondary" onPress={() => navigation.goBack()}>
          Masuk
        </Button>
      </View>
    </ScreenLayout>
  );
}

export default function Registration() {
  return (
    <OtpProvider>
      <RegistrationScreen />
    </OtpProvider>
  );
}
