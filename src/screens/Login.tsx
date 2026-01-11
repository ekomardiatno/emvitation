import { View } from 'react-native';
import ScreenLayout from '../components/core/ScreenLayout';
import Typography from '../components/core/Typography';
import { useTheme } from '../components/core/AppProvider';
import { HIDDEN_TEXT, SPACING } from '../constants';
import Input from '../components/core/Input';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { phoneRegex } from '../regexs';
import Button from '../components/core/Button';
import useAppNavigation from '../hooks/useAppNavigation';
import Divider from '../components/Divider';

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
  const theme = useTheme();
  const {control, handleSubmit} = useForm({
    resolver: yupResolver(loginSchema),
  });
  const navigation = useAppNavigation();

  const onLogin = handleSubmit(() => {
    // action
    navigation.navigate('Home');
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
            placeholder={HIDDEN_TEXT}
            control={control}
            required
            secureTextEntry
            iconName="lock"
          />
          <View style={{marginTop: SPACING.lg}}>
            <Button onPress={onLogin}>Masuk</Button>
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
