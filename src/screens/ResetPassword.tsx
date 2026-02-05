import ScreenLayout from '../components/core/ScreenLayout';
import Typography from '../components/core/Typography';
import { SPACING } from '../constants';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '../components/core/Input';
import { View } from 'react-native';
import Button from '../components/core/Button';
import Confirmation from '../components/core/Confirmation';
import { useCallback, useEffect, useState } from 'react';
import useAppNavigation from '../hooks/useAppNavigation';
import getHiddenText from '../utils/getHiddenText';
import { RouteProp } from '@react-navigation/native';
import {
  AuthStackNavigationProp,
  AuthStackParamList,
} from '../types/navigation-type';
import useToast from '../hooks/useToast';
import { resetPassword } from '../services/auth';
import { ApiError } from '../services/common';

const resetPasswordSchema = yup.object({
  password: yup
    .string()
    .required('Kata sandi harus diisi')
    .min(8, 'Kata sandi minimal 8 karakter'),
  reEnterPassword: yup
    .string()
    .required('Ulangi kata sandi harus diisi')
    .oneOf([yup.ref('password')], 'Kata sandi tidak cocok'),
});

type ResetPasswordRouteProp = RouteProp<AuthStackParamList, 'ResetPassword'>;

export default function ResetPassword({
  route,
}: {
  route?: ResetPasswordRouteProp;
}) {
  const {control, handleSubmit, getValues} = useForm({
    resolver: yupResolver(resetPasswordSchema),
  });
  const navigation = useAppNavigation<AuthStackNavigationProp>();
  const toast = useToast();
  const [isCanceling, setIsCanceling] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);

  const onCancel = () => {
    navigation.goBack();
  };

  const onBackPress = () => {
    setIsCanceling(true);
  };

  const onSubmitNewPassword = handleSubmit(() => {
    setIsResettingPassword(true);
  });

  const fetchResetPassword = useCallback(
    async (signal?: AbortSignal) => {
      const values = getValues();
      try {
        const res = await resetPassword(
          {
            newPassword: values.password,
            reNewPassword: values.reEnterPassword,
          },
          route?.params.resetPasswordToken || '',
          signal,
        );
        if (res.status >= 200 && res.status < 300) {
          toast.show('success', 'Password berhasil diatur ulang');
          navigation.goBack();
          setIsResettingPassword(false);
        } else {
          throw new Error(res.message || 'Unable to reset password');
        }
      } catch (e) {
        if (
          e instanceof Error ||
          (e instanceof Error && e.message !== 'canceled') ||
          (e as ApiError).message
        ) {
          toast.show('error', (e as Error | ApiError).message);
        }
        setIsResettingPassword(false);
      }
    },
    [getValues, navigation, route?.params.resetPasswordToken, toast],
  );

  useEffect(() => {
    const controller = new AbortController();
    if (isResettingPassword) {
      const signal = controller.signal;
      fetchResetPassword(signal);
    } else {
      controller.abort();
    }
  }, [fetchResetPassword, isResettingPassword]);

  return (
    <ScreenLayout onBackPress={onBackPress}>
      <Typography category="h2">Atur Ulang Kata Sandi</Typography>
      <Typography
        category="small"
        marginTop={SPACING.xs}
        style={{marginBottom: SPACING.lg}}>
        Silakan buat kata sandi baru untuk akun kamu.
      </Typography>

      <View style={{gap: SPACING.md, marginBottom: SPACING.lg}}>
        <Input
          control={control}
          label="Kata Sandi"
          secureTextEntry
          name="password"
          placeholder={getHiddenText(8)}
          iconName="lock"
        />
        <Input
          control={control}
          label="Ulangi Kata Sandi"
          secureTextEntry
          name="reEnterPassword"
          placeholder={getHiddenText(8)}
          iconName="lock"
        />
      </View>
      <Button onPress={onSubmitNewPassword} isLoading={isResettingPassword}>
        Simpan Kata Sandi
      </Button>

      <Confirmation
        visible={isCanceling}
        onConfirmed={onCancel}
        onCancel={() => setIsCanceling(false)}
        appearance="warning"
        cautionTitle="Yakin ingin membatalkan?"
        cautionText="Anda dapat melanjutkan reset kata sandi kapan saja jika berubah pikiran."
        confirmText="Ya, batalkan"
        cancelText="Tidak jadi"
      />
    </ScreenLayout>
  );
}
