import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import Login from '../screens/Login';

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
    </Stack.Navigator>
  );
}
