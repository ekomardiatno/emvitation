import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ScreenTab from './ScreenTab'
import { useTheme } from './components/core/AppProvider'
import { Appearance, ColorSchemeName, Platform, StatusBar } from 'react-native'
import { FONT_FAMILY } from './constants'
import { useEffect } from 'react'
import { setDarkAppearance, setLightAppearance } from './redux/actions/app.action'
import { useDispatch } from 'react-redux'
import CreateInvitation from './screens/CreateInvitation'
import Template from './screens/Template'
import MyInvitation from './screens/MyInvitation'
import InvitationDetail from './screens/InvitationDetail'
import ManageGuest from './screens/ManageGuest'
import changeNavigationBarColor from 'react-native-navigation-bar-color'

const Stack = createNativeStackNavigator()

const Navigation = () => {
  const theme = useTheme()
  const dispatch = useDispatch()
  const colorSchema = Appearance.getColorScheme()

  useEffect(() => {
    const autoSchemaChange = (colorSchema: ColorSchemeName) => {
      StatusBar.setBarStyle(colorSchema === 'dark' ? 'light-content' : 'dark-content')
      if(Platform.OS === 'android') {
        changeNavigationBarColor('transparent', colorSchema === 'light')
      }
      StatusBar.setTranslucent(true)
      if (colorSchema === 'dark') {
        dispatch(setDarkAppearance())
      } else {
        dispatch(setLightAppearance())
      }
    }
    autoSchemaChange(colorSchema)
    Appearance.addChangeListener(schema => {
      autoSchemaChange(schema.colorScheme)
    })
  }, [colorSchema])

  return (
    <NavigationContainer theme={{
      colors: {
        background: theme.backgroundBasicColor0,
        primary: theme.colorPrimaryDefault,
        text: theme.textBasicColor,
        border: theme.borderBasicColor1,
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
      <Stack.Navigator screenOptions={{
        animation: 'ios_from_right'
      }}>
        <Stack.Screen name='Main' component={ScreenTab} options={{ headerShown: false }} />
        <Stack.Screen name='Create Invitation' component={CreateInvitation} options={{ headerShown: false }} />
        <Stack.Screen name='Template' component={Template} options={{ headerShown: false }} />
        <Stack.Screen name='My Invitation' component={MyInvitation} options={{ headerShown: false }} />
        <Stack.Screen name='Invitation Detail' component={InvitationDetail} options={{ headerShown: false }} />
        <Stack.Screen name='Manage Guest' component={ManageGuest} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation