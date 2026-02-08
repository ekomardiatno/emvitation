import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import ChangePassword from '../screens/ChangePassword';
import Profile from '../screens/Profile';
import WeddingForm from '../screens/WeddingForm';
import Template from '../screens/Template';
import MyWedding from '../screens/MyWedding';
import WeddingDetail from '../screens/WeddingDetail';
import ManageGuest from '../screens/ManageGuest';
import EventForm from '../screens/EventForm';
import GiftInfoForm from '../screens/GiftInfoForm';
import WishList from '../screens/WishList';
import RsvpList from '../screens/RsvpList';

const Stack = createNativeStackNavigator();

const stackScreenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

export default function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'ios_from_right',
      }}>
      <Stack.Screen name="Home" component={Home} options={stackScreenOptions} />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={stackScreenOptions}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={stackScreenOptions}
      />
      <Stack.Screen
        name="WeddingForm"
        component={WeddingForm}
        options={stackScreenOptions}
      />
      <Stack.Screen
        name="Template"
        component={Template}
        options={stackScreenOptions}
      />
      <Stack.Screen
        name="MyWedding"
        component={MyWedding}
        options={stackScreenOptions}
      />
      <Stack.Screen
        name="WeddingDetail"
        component={WeddingDetail}
        options={stackScreenOptions}
      />
      <Stack.Screen
        name="ManageGuest"
        component={ManageGuest}
        options={stackScreenOptions}
      />
      <Stack.Screen
        name="EventForm"
        component={EventForm}
        options={stackScreenOptions}
      />
      <Stack.Screen
        name="GiftInfoForm"
        component={GiftInfoForm}
        options={stackScreenOptions}
      />
      <Stack.Screen
        name="WishList"
        component={WishList}
        options={stackScreenOptions}
      />
      <Stack.Screen
        name="RsvpList"
        component={RsvpList}
        options={stackScreenOptions}
      />
    </Stack.Navigator>
  );
}
