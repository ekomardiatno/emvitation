import ScreenLayout from '../components/core/ScreenLayout';
import Typography from '../components/core/Typography';
import { HIDDEN_TEXT, SPACING } from '../constants';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '../components/core/Input';
import { View } from 'react-native';
import Button from '../components/core/Button';
import Confirmation from '../components/core/Confirmation';
import { useState } from 'react';
import useAppNavigation from '../hooks/useAppNavigation';

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
  const {control, handleSubmit} = useForm({
    resolver: yupResolver(changePasswordSchema),
  });
  const navigation = useAppNavigation();

  const [isCanceling, setIsCanceling] = useState(false);

  const onCancel = () => {
    navigation.goBack();
  };

  const onBackPress = () => {
    setIsCanceling(true);
  };

  const onSubmitNewPassword = handleSubmit(() => {
    navigation.goBack();
  });

  return (
    <ScreenLayout onBackPress={onBackPress}>
      <Typography category="h2">Ubah Kata Sandi</Typography>
      <Typography category="small" marginTop={SPACING.xs} style={{marginBottom: SPACING.lg}}>
        Silakan buat kata sandi baru untuk akun kamu
      </Typography>

      <View style={{gap: SPACING.md, marginBottom: SPACING.lg}}>
        <Input
          control={control}
          label="Kata Sandi Sekarang"
          secureTextEntry
          name="currentPassword"
          placeholder={HIDDEN_TEXT}
          iconName="lock"
        />
        <Input
          control={control}
          label="Kata Sandi Baru"
          secureTextEntry
          name="newPassword"
          placeholder={HIDDEN_TEXT}
          iconName="lock"
        />
        <Input
          control={control}
          label="Ulangi Kata Sandi Baru"
          secureTextEntry
          name="reEnterNewPassword"
          placeholder={HIDDEN_TEXT}
          iconName="lock"
        />
      </View>
      <Button onPress={onSubmitNewPassword}>Simpan Kata Sandi</Button>

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
