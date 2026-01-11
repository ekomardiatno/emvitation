import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import ScreenTab from './ScreenTab';
import { useTheme } from './components/core/AppProvider';
import { Appearance, ColorSchemeName, Platform, StatusBar } from 'react-native';
import { TYPOGRAPHY } from './constants';
import { useEffect } from 'react';
import {
  setDarkAppearance,
  setLightAppearance,
} from './redux/actions/app.action';
import { useDispatch } from 'react-redux';
import CreateInvitation from './screens/InvitationForm/CreateInvitation';
import Template from './screens/Template';
import MyInvitation from './screens/MyInvitation';
import InvitationDetail from './screens/InvitationDetail';
import ManageGuest from './screens/ManageGuest';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import CreateEvent from './screens/EventForm/CreateEvent';
import Login from './screens/Login';
import Registration from './screens/Registration';
import RegistrationSuccess from './screens/RegistrationSuccess';
import AccountRecovery from './screens/AccountRecovery';
import ResetPassword from './screens/ResetPassword';
import ChangePassword from './screens/ChangePassword';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const colorSchema = Appearance.getColorScheme();

  useEffect(() => {
    const autoSchemaChange = (schema: ColorSchemeName) => {
      StatusBar.setBarStyle(
        schema === 'dark' ? 'light-content' : 'dark-content',
      );
      if (Platform.OS === 'android') {
        changeNavigationBarColor('transparent', schema === 'light');
      }
      StatusBar.setTranslucent(true);
      if (schema === 'dark') {
        dispatch(setDarkAppearance());
      } else {
        dispatch(setLightAppearance());
      }
    };
    autoSchemaChange(colorSchema);
    Appearance.addChangeListener(schema => {
      autoSchemaChange(schema.colorScheme);
    });
  }, [colorSchema, dispatch]);

  const stackScreenOptions: NativeStackNavigationOptions = {
    headerShown: false,
  };

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
        dark: colorSchema === 'dark',
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
      <Stack.Navigator
        screenOptions={{
          animation: 'ios_from_right',
        }}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={stackScreenOptions}
        />
        <Stack.Screen
          name="Registration"
          component={Registration}
          options={stackScreenOptions}
        />
        <Stack.Screen
          name="RegistrationSuccess"
          component={RegistrationSuccess}
          options={stackScreenOptions}
        />
        <Stack.Screen
          name="AccountRecovery"
          component={AccountRecovery}
          options={stackScreenOptions}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={stackScreenOptions}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={stackScreenOptions}
        />
        <Stack.Screen
          name="Home"
          component={ScreenTab}
          options={stackScreenOptions}
        />
        <Stack.Screen
          name="CreateInvitation"
          component={CreateInvitation}
          options={stackScreenOptions}
        />
        <Stack.Screen
          name="Template"
          component={Template}
          options={stackScreenOptions}
        />
        <Stack.Screen
          name="MyInvitation"
          component={MyInvitation}
          options={stackScreenOptions}
        />
        <Stack.Screen
          name="InvitationDetail"
          component={InvitationDetail}
          options={stackScreenOptions}
        />
        <Stack.Screen
          name="ManageGuest"
          component={ManageGuest}
          options={stackScreenOptions}
        />
        <Stack.Screen
          name="CreateEvent"
          component={CreateEvent}
          options={stackScreenOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
