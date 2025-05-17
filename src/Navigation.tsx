import { createStaticNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ScreenTab from './ScreenTab'

const RootStack = createNativeStackNavigator({
  screens: {
    ScreenTab: {
      screen: ScreenTab,
      options: {
        headerShown: false
      }
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

export default Navigation