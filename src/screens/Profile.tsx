import Typography from '../components/core/Typography';
import ScreenLayout from '../components/core/ScreenLayout';
import { Linking, View } from 'react-native';
import { useApp, useTheme } from '../components/core/AppProvider';
import { RADIUS, SPACING } from '../constants';
import censorPhoneNumber from '../utils/cursorPhoneNumber';
import SettingsSection, { SettingsItem } from '../components/SettingsSection';
import Confirmation from '../components/core/Confirmation';
import useAppNavigation from '../hooks/useAppNavigation';
import useAppSelector from '../hooks/useAppSelector';
import getInitials from '../utils/getInitials';
import useToast from '../hooks/useToast';

export default function Profile() {
  const theme = useTheme();
  const {appLogout} = useApp();
  const navigation = useAppNavigation();
  const {data} = useAppSelector(state => state.profile);
  const toast = useToast();

  const onConfirmed = () => {
    appLogout();
  };

  const openWhatsApp = async () => {
    const phone = '6287888161111';

    const uri = `whatsapp://send?phone=${phone}`;

    const supported = await Linking.canOpenURL(uri);
    if (!supported) {
      toast.show('error', 'WhatsApp not installed');
      return;
    }

    await Linking.openURL(uri);
  };

  return (
    <ScreenLayout>
      <View
        style={{
          alignItems: 'center',
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
            {getInitials(data.name || '')}
          </Typography>
        </View>
        <Typography marginTop={SPACING.sm} fontWeight={700}>
          {data.name || ''}
        </Typography>
        <Typography category="small" color={theme['text-secondary']}>
          {censorPhoneNumber(data.phone || '')}
        </Typography>
      </View>
      <SettingsSection>
        <SettingsItem
          title="Dapatkan bantuan Admin"
          description="Ajukan pertanyaan atau laporkan masalah langsung kepada Admin"
          iconName="help"
          onPress={openWhatsApp}
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
