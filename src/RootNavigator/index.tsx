import { NavigationContainer } from '@react-navigation/native';
import { useTheme } from '../components/core/AppProvider';
import { TYPOGRAPHY } from '../constants';
import useAppSelector from '../hooks/useAppSelector';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import { useEffect, useState } from 'react';
import BootSplash from 'react-native-bootsplash';
import AnimatedSplash from '../screens/AnimatedSplash';

export default function RootNavigator() {
  const theme = useTheme();
  const {isAuthenticated, isLoading} = useAppSelector(state => state.auth);

  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      BootSplash.hide({fade: true});
    }
  }, [isLoading]);

  if (isLoading || showSplash) {
    return <AnimatedSplash onFinish={() => setShowSplash(false)} />;
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
