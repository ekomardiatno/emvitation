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

export default function ResetPassword() {
  const {control, handleSubmit} = useForm({
    resolver: yupResolver(resetPasswordSchema),
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
      <Button onPress={onSubmitNewPassword}>Simpan Kata Sandi</Button>

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
