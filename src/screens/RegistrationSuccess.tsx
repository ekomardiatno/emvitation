import { View } from 'react-native';
import ScreenLayout from '../components/core/ScreenLayout';
import Typography from '../components/core/Typography';
import { SPACING } from '../constants';
import { useTheme } from '../components/core/AppProvider';
import useAppNavigation from '../hooks/useAppNavigation';
import Button from '../components/core/Button';
import Divider from '../components/Divider';
import { IconState } from '../components/core/Confirmation';
import { AuthStackNavigationProp } from '../types/navigation-type';

export default function RegistrationSuccess() {
  const theme = useTheme();
  const navigation = useAppNavigation<AuthStackNavigationProp>();

  return (
    <ScreenLayout contentVerticalAlign="center" headerEnabled={false}>
      <View style={{flexGrow: 1, justifyContent: 'center'}}>
        <IconState
          appearance="success"
          style={{marginBottom: SPACING.md, alignSelf: 'center'}}
        />
        <Typography style={{textAlign: 'center'}} category="h3">
          Pendaftaran Berhasil
        </Typography>
        <Typography
          color={theme['text-secondary']}
          style={{textAlign: 'center'}}
          category="small">
          Akun berhasil dibuat
        </Typography>
      </View>
      <View style={{marginTop: SPACING.xl}}>
        <Divider
          icon="circle"
          marginBottom={SPACING.md}
          marginHorizontal={SPACING['2xl']}
        />
        <View>
          <Button
            appearance="success"
            onPress={() => {
              navigation.goBack();
            }}>
            Masuk
          </Button>
        </View>
      </View>
    </ScreenLayout>
  );
}
