import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Registration from '../screens/Registration';
import RegistrationSuccess from '../screens/RegistrationSuccess';
import AccountRecovery from '../screens/AccountRecovery';
import ResetPassword from '../screens/ResetPassword';

const Stack = createNativeStackNavigator();

const stackScreenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

export default function AuthStack() {
  return (
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
    </Stack.Navigator>
  );
}
