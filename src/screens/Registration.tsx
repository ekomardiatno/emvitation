import ScreenLayout from '../components/core/ScreenLayout';
import Typography from '../components/core/Typography';
import { Keyboard, View } from 'react-native';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { phoneRegex } from '../regexs';
import Input from '../components/core/Input';
import { SPACING } from '../constants';
import Button from '../components/core/Button';
import useAppNavigation from '../hooks/useAppNavigation';
import Divider from '../components/Divider';
import useOtp from '../hooks/useOtp';
import OtpProvider from '../components/OtpProvider';
import getHiddenText from '../utils/getHiddenText';
import { useCallback, useEffect, useState } from 'react';
import { register } from '../services/auth';
import useToast from '../hooks/useToast';
import { ApiError } from '../services/common';

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
  const [isRegistering, setIsRegistering] = useState(false);
  const toast = useToast();
  const [prevPhoneNumber, setPrevPhoneNumber] = useState<null | string>(null);

  const onOtpVerified = () => {
    setIsRegistering(true);
  };

  const onSubmitting = handleSubmit(() => {
    Keyboard.dismiss();
    const values = getValues();
    if (prevPhoneNumber !== values.phoneNumber) {
      otp.requestOtp(onOtpVerified, values.phoneNumber);
    } else {
      onOtpVerified();
    }
  });

  const fetchRegister = useCallback(
    async (signal?: AbortSignal) => {
      const values = getValues();
      setPrevPhoneNumber(values.phoneNumber);
      try {
        const res = await register(
          {
            name: values.name,
            password: values.password,
            phone: values.phoneNumber,
            rePassword: values.reEnterPassword,
          },
          signal,
        );
        if (res.status >= 200 && res.status < 300) {
          toast.show('success', res.message || 'Pendaftaran user berhasil.');
          navigation.replace('RegistrationSuccess');
          setIsRegistering(false);
        } else {
          throw new Error(res.message || 'Unable to create user');
        }
      } catch (e) {
        if (
          (e instanceof Error && e.message !== 'canceled') ||
          (e as ApiError).message
        ) {
          toast.show(
            'error',
            (e as Error | ApiError).message || 'Unable to create user',
          );
        }
        setIsRegistering(false);
      }
    },
    [getValues, navigation, toast],
  );

  useEffect(() => {
    const controller = new AbortController();
    if (isRegistering) {
      const signal = controller.signal;
      fetchRegister(signal);
    } else {
      controller.abort();
    }
  }, [isRegistering, fetchRegister]);

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
            label="Nama"
            placeholder="Eko Mardiatno"
            control={control}
            name="name"
            iconName="person"
            editable={!isRegistering}
          />
          <Input
            label="Nomor HP"
            placeholder="082212992212"
            control={control}
            name="phoneNumber"
            iconName="phone"
            editable={!isRegistering}
          />
          <Input
            control={control}
            label="Kata Sandi"
            secureTextEntry
            name="password"
            placeholder={getHiddenText(8)}
            iconName="lock"
            editable={!isRegistering}
          />
          <Input
            control={control}
            label="Ulangi Kata Sandi"
            secureTextEntry
            name="reEnterPassword"
            placeholder={getHiddenText(8)}
            iconName="lock"
            editable={!isRegistering}
          />
        </View>
        <View style={{marginTop: SPACING.xl}}>
          <Button
            onPress={onSubmitting}
            isLoading={otp.isRequestingOtp || isRegistering}>
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
