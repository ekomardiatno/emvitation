import { NavigationContainer } from '@react-navigation/native';
import { useTheme } from '../components/core/AppProvider';
import { TYPOGRAPHY } from '../constants';
import useAppSelector from '../hooks/useAppSelector';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import { useEffect } from 'react';
import BootSplash from 'react-native-bootsplash';

export default function RootNavigator() {
  const theme = useTheme();
  const {isAuthenticated, isLoading} = useAppSelector(state => state.auth);

  useEffect(() => {
    if (!isLoading) {
      BootSplash.hide({fade: true, duration: 1000});
    }
  }, [isLoading]);

  if (isLoading) {
    return null;
  }

  return (
    <NavigationContainer
      theme={{
        colors: {
          background: theme['bg-app'],
          primary: theme['primary-bg'],
          text: theme['text-primary'],
          border: theme['border-default'],
          card: theme['bg-surface'],
          notification: theme['info-bg'],
        },
        dark: theme.schema === 'dark',
        fonts: {
          bold: {
            fontFamily: TYPOGRAPHY.fontFamily.base,
            fontWeight: 'bold',
          },
          regular: {
            fontFamily: TYPOGRAPHY.fontFamily.base,
            fontWeight: 'normal',
          },
          heavy: {
            fontFamily: TYPOGRAPHY.fontFamily.base,
            fontWeight: '800',
          },
          medium: {
            fontFamily: TYPOGRAPHY.fontFamily.base,
            fontWeight: '500',
          },
        },
      }}>
      {isAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
