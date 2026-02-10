import { View } from 'react-native';
import ScreenLayout from '../components/core/ScreenLayout';
import Typography from '../components/core/Typography';
import { useTheme } from '../components/core/AppProvider';
import { SPACING } from '../constants';
import Input from '../components/core/Input';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { phoneRegex } from '../regexs';
import Button from '../components/core/Button';
import useAppNavigation from '../hooks/useAppNavigation';
import Divider from '../components/Divider';
import { useCallback, useEffect, useState } from 'react';
import { login } from '../services/auth';
import { ApiError } from '../services/common';
import useToast from '../hooks/useToast';
import getHiddenText from '../utils/getHiddenText';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/reducers/auth.reducer';
import { AuthStackNavigationProp } from '../types/navigation-type';

const loginSchema = yup.object({
  phoneNumber: yup
    .string()
    .required('Nomor HP harus diisi')
    .matches(phoneRegex, 'Nomor HP tidak valid'),
  password: yup
    .string()
    .required('Kata sandi harus diisi')
    .min(8, 'Kata sandi minimal 8 karakter'),
});

export default function Login() {
  const toast = useToast();
  const theme = useTheme();
  const {control, handleSubmit, getValues} = useForm({
    resolver: yupResolver(loginSchema),
  });
  const navigation = useAppNavigation<AuthStackNavigationProp>();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const dispatch = useDispatch();

  const fetchLogin = useCallback(
    async (signal?: AbortSignal) => {
      try {
        const {phoneNumber, password} = getValues();
        const res = await login(phoneNumber, password, signal);
        if (res.status >= 200 && res.status < 300) {
          dispatch(
            loginSuccess({
              accessToken: res.data.accessToken,
              refreshToken: res.data.refreshToken,
            }),
          );
          setIsLoggingIn(false);
        } else {
          throw new Error('Unable to login');
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
        setIsLoggingIn(false);
      }
    },
    [getValues, dispatch, toast],
  );

  useEffect(() => {
    const controller = new AbortController();
    if (isLoggingIn) {
      const signal = controller.signal;
      fetchLogin(signal);
    } else {
      controller.abort();
    }
  }, [isLoggingIn, fetchLogin]);

  const onLogin = handleSubmit(() => {
    // action
    setIsLoggingIn(true);
  });

  return (
    <ScreenLayout headerEnabled={false}>
      <View style={{flexGrow: 1, justifyContent: 'center'}}>
        <Typography category="h2">Masuk ke akun</Typography>
        <Typography category="small" marginTop={SPACING.xs}>
          Masukkan nomor HP dan kata sandi untuk masuk
        </Typography>

        <View style={{marginTop: SPACING.lg}}>
          <Input
            placeholder="082211332232"
            control={control}
            name="phoneNumber"
            label="Nomor HP"
            keyboardType="phone-pad"
            required
            iconName="phone"
          />
          <Input
            containerStyle={{marginTop: SPACING.md}}
            name="password"
            label="Kata Sandi"
            placeholder={getHiddenText(8)}
            control={control}
            required
            secureTextEntry
            iconName="lock"
          />
          <View style={{marginTop: SPACING.lg}}>
            <Button
              onPress={onLogin}
              disabled={isLoggingIn}
              isLoading={isLoggingIn}>
              Masuk
            </Button>
          </View>
        </View>

        <View style={{marginTop: SPACING.sm, alignItems: 'center'}}>
          <Typography
            category="small"
            fontWeight={700}
            color={theme['primary-bg']}
            onPress={() => {
              navigation.navigate('AccountRecovery');
            }}>
            Lupa password?
          </Typography>
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
          Belum punya akun?
        </Typography>
        <Button
          appearance="secondary"
          onPress={() => navigation.navigate('Registration')}>
          Daftar
        </Button>
      </View>
    </ScreenLayout>
  );
}
