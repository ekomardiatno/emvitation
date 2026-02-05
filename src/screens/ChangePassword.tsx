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
import { changePassword } from '../services/profile';
import useToast from '../hooks/useToast';
import { ApiError } from '../services/common';

const changePasswordSchema = yup.object({
  currentPassword: yup
    .string()
    .required('Kata sandi harus diisi')
    .min(8, 'Kata sandi minimal 8 karakter'),
  newPassword: yup
    .string()
    .required('Kata sandi harus diisi')
    .min(8, 'Kata sandi minimal 8 karakter'),
  reEnterNewPassword: yup
    .string()
    .required('Ulangi kata sandi harus diisi')
    .oneOf([yup.ref('newPassword')], 'Kata sandi tidak cocok'),
});

export default function ChangePassword() {
  const {control, handleSubmit, getValues} = useForm({
    resolver: yupResolver(changePasswordSchema),
  });
  const navigation = useAppNavigation();

  const [isCanceling, setIsCanceling] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const toast = useToast();

  const onCancel = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onBackPress = () => {
    setIsCanceling(true);
  };

  const onSubmitNewPassword = handleSubmit(() => {
    setIsChangingPassword(true);
  });

  const fetchChangePassword = useCallback(
    async (signal?: AbortSignal) => {
      const values = getValues();
      try {
        const res = await changePassword(
          {
            password: values.currentPassword,
            newPassword: values.newPassword,
            reNewPassword: values.reEnterNewPassword,
          },
          signal,
        );
        if (res.status >= 200 && res.status < 300) {
          toast.show('success', res.message || 'Berhasil ubah kata sandi');
          onCancel();
          setIsChangingPassword(false);
        } else {
          throw new Error(res.message || 'Unable to change password');
        }
      } catch (e) {
        if (
          (e instanceof Error && e.message !== 'canceled') ||
          (e as ApiError).message
        ) {
          toast.show('error', (e as Error | ApiError).message);
        }
        setIsChangingPassword(false);
      }
    },
    [getValues, onCancel, toast],
  );

  useEffect(() => {
    const controller = new AbortController();
    if (isChangingPassword) {
      fetchChangePassword(controller.signal);
    } else {
      controller.abort();
    }
  }, [isChangingPassword, fetchChangePassword]);

  return (
    <ScreenLayout onBackPress={onBackPress}>
      <Typography category="h2">Ubah Kata Sandi</Typography>
      <Typography
        category="small"
        marginTop={SPACING.xs}
        style={{marginBottom: SPACING.lg}}>
        Silakan buat kata sandi baru untuk akun kamu
      </Typography>

      <View style={{gap: SPACING.md, marginBottom: SPACING.lg}}>
        <Input
          control={control}
          label="Kata Sandi Sekarang"
          secureTextEntry
          name="currentPassword"
          placeholder={getHiddenText(8)}
          iconName="lock"
          editable={!isChangingPassword}
        />
        <Input
          control={control}
          label="Kata Sandi Baru"
          secureTextEntry
          name="newPassword"
          placeholder={getHiddenText(8)}
          iconName="lock"
          editable={!isChangingPassword}
        />
        <Input
          control={control}
          label="Ulangi Kata Sandi Baru"
          secureTextEntry
          name="reEnterNewPassword"
          placeholder={getHiddenText(8)}
          iconName="lock"
          editable={!isChangingPassword}
        />
      </View>
      <Button onPress={onSubmitNewPassword} isLoading={isChangingPassword}>
        Simpan Kata Sandi
      </Button>

      <Confirmation
        visible={isCanceling}
        onConfirmed={onCancel}
        onCancel={() => setIsCanceling(false)}
        appearance="warning"
        cautionTitle="Yakin ingin membatalkan?"
        cautionText="Kamu dapat melanjutkan kapan saja jika berubah pikiran"
        confirmText="Ya, batalkan"
        cancelText="Tidak jadi"
      />
    </ScreenLayout>
  );
}
