import { createContext, JSX, useEffect, useState } from "react"
import { Dimensions, Keyboard, Platform, StatusBar, View } from "react-native"
import { useTheme } from "./AppProvider"
import { useSelector } from "react-redux"
import { APP_APPEARANCE_TYPE } from "../../constants"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { AppAppearanceType } from "../../types/app-appearance-type"

const { width: windowWidth, height: windowHeight } = Dimensions.get('window')
export const AppWindowDimensions = createContext({ width: windowWidth, height: windowHeight })

export default function ScreenSafeAreaView({ children }: {
  children: JSX.Element
}) {
  const appearanceType = useSelector<any>(state => state.appReducer.appearanceType) as AppAppearanceType
  const theme = useTheme()
  const [viewPort, setViewPort] = useState({
    width: windowWidth,
    height: windowHeight
  })

  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(theme.backgroundBasicColor1)
      StatusBar.setBarStyle(appearanceType === APP_APPEARANCE_TYPE.LIGHT ? 'dark-content' : 'light-content')
      StatusBar.setTranslucent(false)
    }
  }, [theme, appearanceType])

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.backgroundBasicColor1 }}>
        <View onLayout={e => {
          e.target.measure((_x, _y, width, height, _pageX, _pageY) => {
            setViewPort({ width, height: !Keyboard.isVisible() ? height : viewPort.height })
          })
        }} style={{ flex: 1 }}>
          <AppWindowDimensions.Provider value={{ width: viewPort.width, height: viewPort.height }}>
            {children}
          </AppWindowDimensions.Provider>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}