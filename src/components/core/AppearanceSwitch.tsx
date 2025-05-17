import { useEffect, useRef, useState } from 'react'
import {
  View,
  TouchableOpacity,
  Animated
} from 'react-native'
import { APP_APPEARANCE_TYPE, COLORS } from '../../constants'
import { useTheme } from './AppProvider'
import Icon from '@react-native-vector-icons/material-icons'
import { useDispatch, useSelector } from 'react-redux'
import { setDarkAppearance, setLightAppearance } from '../../redux/actions/app.action'
import { AppAppearanceType } from '../../types/app-appearance-type'

export let handleChangeAppearance: () => void | null

const AppearanceSwitch = () => {
  const theme = useTheme()
  const appearanceType = useSelector<any>(state => state.appReducer.appearanceType) as AppAppearanceType
  const posX = useRef(new Animated.Value(0))
  const [mode, setMode] = useState<string | null>(null)
  const dispatch = useDispatch()
  const autoSelectAppearance = useSelector<any>(state => state.appReducer.autoSelectAppearance)
  const selectedMode = mode as AppAppearanceType

  const handleChangeMode = () => {
    if(!autoSelectAppearance) {
      setMode((state) => {
        const toValue = state === APP_APPEARANCE_TYPE.LIGHT ? 12 : 0
        Animated.timing(posX.current, {
          toValue,
          duration: 500,
          useNativeDriver: false
        }).start((finished) => {
          if (finished)
            dispatch(state === APP_APPEARANCE_TYPE.DARK ? setLightAppearance() : setDarkAppearance())
        })
        return state === APP_APPEARANCE_TYPE.LIGHT ? APP_APPEARANCE_TYPE.DARK : APP_APPEARANCE_TYPE.LIGHT
      })
    }
  }

  useEffect(() => {
    handleChangeAppearance = handleChangeMode
    setMode(appearanceType)
  }, [appearanceType])
  
  useEffect(() => {
    posX.current.setValue(appearanceType === APP_APPEARANCE_TYPE.DARK ? 12 : 0)
  }, [appearanceType])
  
  const spinDeg = posX.current.interpolate({
    inputRange: [0, 12],
    outputRange: ['0deg', '250deg'],
    extrapolate: 'clamp'
  })
  const lightOpacity = posX.current.interpolate({
    inputRange: [0, 12],
    outputRange: [1, 0],
    extrapolate: 'clamp'
  })
  const darkOpacity = posX.current.interpolate({
    inputRange: [0, 12],
    outputRange: [0, 1],
    extrapolate: 'clamp'
  })

  return (
    <TouchableOpacity onPress={handleChangeMode} activeOpacity={0.85}>
      <View style={{ height: 20, width: 32, borderRadius: 20 / 2, overflow: 'hidden', opacity: autoSelectAppearance ? .5 : 1 }}>
        <Animated.View style={{ backgroundColor: theme.colorWarningDisabled, position: 'absolute', top: 0, left: 0, width: 32, height: 20, opacity: lightOpacity }} />
        <Animated.View style={{ backgroundColor: theme.colorPrimaryDisabled, position: 'absolute', top: 0, left: 0, width: 32, height: 20, opacity: darkOpacity }} />
        <Animated.View style={{ width: 16, height: 16, margin: 2, borderRadius: 16 / 2, left: posX.current, transform: [{ rotate: spinDeg }], overflow: 'hidden' }}>
          <Animated.View style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, alignItems: 'center', justifyContent: 'center', opacity: lightOpacity, backgroundColor: theme.colorWarningDefault }}>
            <Icon name='light-mode' size={10} color={COLORS.colorBasic100} />
          </Animated.View>
          <Animated.View style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, alignItems: 'center', justifyContent: 'center', opacity: darkOpacity, backgroundColor: theme.colorPrimaryDefault }}>
            <Icon name='dark-mode' size={10} color={COLORS.colorBasic100} />
          </Animated.View>
        </Animated.View>
      </View>
    </TouchableOpacity>
  )
}

export default AppearanceSwitch