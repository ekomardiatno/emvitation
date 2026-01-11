import Typography from '../components/core/Typography';
import ScreenLayout from '../components/core/ScreenLayout';
import { View } from 'react-native';
import { useTheme } from '../components/core/AppProvider';
import { RADIUS, SPACING } from '../constants';
import censorPhoneNumber from '../utils/cursorPhoneNumber';
import SettingsSection, { SettingsItem } from '../components/SettingsSection';
import Confirmation from '../components/core/Confirmation';
import useAppNavigation from '../hooks/useAppNavigation';

export default function Profile() {
  const theme = useTheme();
  const navigation = useAppNavigation();

  const onConfirmed = () => {
    navigation.goBack();
  };
  return (
    <ScreenLayout headerEnabled={false}>
      <View
        style={{
          alignItems: 'center',
          paddingTop: SPACING['3xl'],
          marginBottom: SPACING['2xl'],
        }}>
        <View
          style={{
            width: 60,
            height: 60,
            borderRadius: RADIUS.full,
            backgroundColor: theme['info-bg'],
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Typography
            category="h1"
            color={theme['info-text']}
            style={{textTransform: 'uppercase'}}>
            EM
          </Typography>
        </View>
        <Typography marginTop={SPACING.sm} fontWeight={700}>
          Eko Mardiatno
        </Typography>
        <Typography category="small" color={theme['text-secondary']}>
          {censorPhoneNumber('082219299071')}
        </Typography>
      </View>
      <SettingsSection>
        <SettingsItem
          title="Dapatkan bantuan Admin"
          description="Ajukan pertanyaan atau laporkan masalah langsung kepada Admin"
          iconName="help"
        />
        <SettingsItem
          title="Ubah kata sandi"
          description="Ganti kata sandi secara berkala untuk meningkatkan keamanan akun Anda"
          iconName="lock"
          onPress={() => {
            navigation.navigate('ChangePassword');
          }}
        />
      </SettingsSection>
      <View style={{marginTop: SPACING.lg, gap: 20}}>
        <Confirmation
          mode="button"
          onConfirmed={onConfirmed}
          cautionTitle="Keluar dari akun?"
          cautionText="Tenang, kamu bisa masuk lagi kapan saya."
          confirmText="Ya, keluar"
          cancelText="Batal">
          Logout
        </Confirmation>
      </View>
      <View style={{marginTop: SPACING.sm}}>
        <Typography style={{textAlign: 'center'}} category="xsmall">
          {require('../../package.json').version}
        </Typography>
      </View>
    </ScreenLayout>
  );
}
