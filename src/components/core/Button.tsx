import { JSX, useMemo } from 'react'
import { GestureResponderEvent, StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native'
import { BORDER_RADIUS, BORDER_WIDTH, COLORS } from '../../constants'
import { useTheme } from './AppProvider'
import Typography, { Category } from './Typography'
import { PlatformPressable } from '@react-navigation/elements'

export type ButtonAppearance = 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'transparent' | 'secondary' | 'basic'

const Button = ({ children, onPress, disabled = false, appearance = 'primary', style = {}, textStyle, category = 'p1' }: {
  children: string | JSX.Element
  onPress?: ((e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | GestureResponderEvent) => void)
  disabled?: boolean
  appearance?: ButtonAppearance
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  category?: Category
}): JSX.Element => {
  const theme = useTheme()

  const btnColor = useMemo(() => {
    switch (appearance) {
      case 'primary':
        return {
          background: disabled ? COLORS.colorGray300 : COLORS.colorRose500,
          border: disabled ? COLORS.colorGray300 : COLORS.colorRose500,
          text: COLORS.colorGray50
        }
      case 'info':
        return {
          background: disabled ? COLORS.colorGray300 : COLORS.colorTeal600,
          border: disabled ? COLORS.colorGray300 : COLORS.colorTeal600,
          text: COLORS.colorGray50
        }
      case 'warning':
        return {
          background: disabled ? COLORS.colorGray300 : COLORS.colorAmber600,
          border: disabled ? COLORS.colorGray300 : COLORS.colorAmber600,
          text: COLORS.colorGray50
        }
      case 'danger':
        return {
          background: disabled ? COLORS.colorGray300 : COLORS.colorRed700,
          border: disabled ? COLORS.colorGray300 : COLORS.colorRed700,
          text: COLORS.colorGray50
        }
      case 'success':
        return {
          background: disabled ? COLORS.colorGray300 : COLORS.colorGreen600,
          border: disabled ? COLORS.colorGray300 : COLORS.colorGreen600,
          text: COLORS.colorGray50
        }
      case 'secondary':
        return {
          background: disabled ? COLORS.colorGray300 : COLORS.colorSky600,
          border: disabled ? COLORS.colorGray300 : COLORS.colorSky600,
          text: COLORS.colorGray50
        }
      case 'basic': {
        return {
          background: disabled ? theme.backgroundBasicColor1 : theme.backgroundBasicColor2,
          border: disabled ? theme.backgroundBasicColor2 : theme.backgroundBasicColor3,
          text: disabled ? theme.textDisabledColor : theme.textBasicColor
        }
      }
      default:
        return {
          background: 'transparent',
          border: 'transparent',
          text: disabled ? theme.textDisabledColor : theme.textBasicColor
        }
    }
  }, [appearance, disabled, theme])

  const textStyleProps = StyleSheet.flatten(textStyle)
  const styleProps = StyleSheet.flatten(style)

  return (
    <View style={{ borderRadius: styleProps.borderRadius ?? BORDER_RADIUS, flex: styleProps.flex, flexGrow: styleProps.flexGrow, overflow: 'hidden', flexBasis: styleProps.flexBasis, width: styleProps.width }}>
      <PlatformPressable disabled={disabled} pressColor={disabled ? 'transparent' : 'rgba(0,0,0,.25)'} style={[{ borderRadius: BORDER_RADIUS, borderWidth: BORDER_WIDTH, backgroundColor: btnColor.background, borderColor: btnColor.border, paddingVertical: 12, paddingHorizontal: 15 }, style]} onPress={onPress}>
        {
          typeof children === 'string' ?
            <Typography color={textStyleProps?.color || btnColor.text} style={{ textAlign: 'center', ...textStyleProps }} category={category}>{children}</Typography>
            :
            children
        }
      </PlatformPressable>
    </View>
  )
}

export default Button