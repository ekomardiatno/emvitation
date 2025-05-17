import { JSX } from "react"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from "./screens/Home"
import Wallet from "./screens/Wallet"
import Profile from "./screens/Profile"

const Tab = createBottomTabNavigator();

export default function ScreenTab(): JSX.Element {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false
    }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Wallet" component={Wallet} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  )
}