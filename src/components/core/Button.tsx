import { JSX, useMemo } from 'react'
import { GestureResponderEvent, StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native'
import { BORDER_RADIUS, BORDER_WIDTH, COLORS } from '../../constants'
import { useTheme } from './AppProvider'
import Typography, { Category } from './Typography'
import { PlatformPressable } from '@react-navigation/elements'

export type ButtonAppearance = 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'transparent'

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
          background: disabled ? theme.colorPrimaryDisabled : theme.colorPrimaryDefault,
          border: disabled ? theme.colorPrimaryDisabledBorder : theme.colorPrimaryDefaultBorder,
          text: disabled ? COLORS.colorBasic600 : COLORS.colorBasic100
        }
      case 'info':
        return {
          background: disabled ? theme.colorInfoDisabled : theme.colorInfoDefault,
          border: disabled ? theme.colorInfoDisabledBorder : theme.colorInfoDefaultBorder,
          text: disabled ? COLORS.colorBasic600 : COLORS.colorBasic100
        }
      case 'warning':
        return {
          background: disabled ? theme.colorWarningDisabled : theme.colorWarningDefault,
          border: disabled ? theme.colorWarningDisabledBorder : theme.colorWarningDefaultBorder,
          text: disabled ? COLORS.colorBasic600 : COLORS.colorBasic100
        }
      case 'danger':
        return {
          background: disabled ? theme.colorDangerDisabled : theme.colorDangerDefault,
          border: disabled ? theme.colorDangerDisabledBorder : theme.colorDangerDefaultBorder,
          text: disabled ? COLORS.colorBasic600 : COLORS.colorBasic100
        }
      case 'success':
        return {
          background: disabled ? theme.colorSuccessDisabled : theme.colorSuccessDefault,
          border: disabled ? theme.colorSuccessDisabledBorder : theme.colorSuccessDefaultBorder,
          text: disabled ? COLORS.colorBasic600 : COLORS.colorBasic100
        }
      default:
        return {
          background: 'transparent',
          border: 'transparent',
          text: disabled ? theme.textDisabledColor : theme.textBasicColor
        }
    }
  }, [appearance, disabled])

  const textStyleProps = StyleSheet.flatten(textStyle)
  const styleProps = StyleSheet.flatten(style)

  return (
    <View style={{ borderRadius: styleProps.borderRadius ?? BORDER_RADIUS, flex: styleProps.flex, flexGrow: styleProps.flexGrow, overflow: 'hidden', flexBasis: styleProps.flexBasis, width: styleProps.width }}>
      <PlatformPressable disabled={disabled} style={[{ borderRadius: BORDER_RADIUS, borderWidth: BORDER_WIDTH, backgroundColor: btnColor.background, borderColor: disabled ? theme.colorPrimaryDisabled : btnColor.border, paddingVertical: 12, paddingHorizontal: 15 }, style]} onPress={onPress}>
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