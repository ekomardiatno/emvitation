import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ScreenTab from './ScreenTab'
import { useTheme } from './components/core/AppProvider'
import { Appearance } from 'react-native'
import { FONT_FAMILY } from './constants'

const Stack = createNativeStackNavigator()

const Navigation = () => {
  const theme = useTheme()
  const colorSchema = Appearance.getColorScheme();

  return (
    <NavigationContainer theme={{
      colors: {
        background: theme.backgroundBasicColor0,
        primary: theme.colorPrimaryDefault,
        text: theme.textBasicColor,
        border: theme.borderBasicColor2,
        card: theme.backgroundBasicColor1,
        notification: theme.colorInfoDefault
      },
      dark: colorSchema === 'dark',
      fonts: {
        bold: {
          fontFamily: FONT_FAMILY,
          fontWeight: 'bold'
        },
        regular: {
          fontFamily: FONT_FAMILY,
          fontWeight: 'normal'
        },
        heavy: {
          fontFamily: FONT_FAMILY,
          fontWeight: '800'
        },
        medium: {
          fontFamily: FONT_FAMILY,
          fontWeight: '500'
        }
      }
    }}>
      <Stack.Navigator>
        <Stack.Screen name='Main' component={ScreenTab} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation