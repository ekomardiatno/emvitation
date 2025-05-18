import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ScreenTab from './ScreenTab'
import { useTheme } from './components/core/AppProvider'
import { Appearance, ColorSchemeName, StatusBar } from 'react-native'
import { FONT_FAMILY } from './constants'
import { useEffect } from 'react'
import { setDarkAppearance, setLightAppearance } from './redux/actions/app.action'
import { useDispatch } from 'react-redux'
import CreateInvitation from './screens/CreateInvitation'

const Stack = createNativeStackNavigator()

const Navigation = () => {
  const theme = useTheme()
  const dispatch = useDispatch()
  const colorSchema = Appearance.getColorScheme()

  useEffect(() => {
    const autoSchemaChange = (colorSchema: ColorSchemeName) => {
      StatusBar.setBackgroundColor('rgba(0,0,0,0)');
      StatusBar.setTranslucent(true);
      StatusBar.setBarStyle(colorSchema === 'dark' ? 'light-content' : 'dark-content')
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
        background: theme.backgroundBasicColor1,
        primary: theme.colorPrimaryDefault,
        text: theme.textBasicColor,
        border: theme.borderBasicColor2,
        card: theme.backgroundBasicColor3,
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
        <Stack.Screen name='Create Invitation' component={CreateInvitation} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation