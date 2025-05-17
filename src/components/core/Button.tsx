import { JSX, useMemo } from 'react'
import { GestureResponderEvent, StyleProp, TouchableOpacity, ViewStyle } from 'react-native'
import { BORDER_RADIUS, BORDER_WIDTH, COLORS } from '../../constants'
import { useTheme } from './AppProvider'
import Typography, { Category } from './Typography'

export type ButtonAppearance = 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'transparent'

const Button = ({ children, onPress, disabled = false, appearance = 'primary', style = {}, category = 'p1' }: {
  children: string;
  onPress: (event: GestureResponderEvent) => void | undefined;
  disabled?: boolean;
  appearance?: ButtonAppearance;
  style?: StyleProp<ViewStyle>;
  category?: Category;
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

  return (
    <TouchableOpacity activeOpacity={0.75} disabled={disabled} style={[{ borderRadius: BORDER_RADIUS, borderWidth: BORDER_WIDTH, backgroundColor: btnColor.background, borderColor: disabled ? theme.colorPrimaryDisabled : btnColor.border, paddingVertical: 10, paddingHorizontal: 16 }, style]} onPress={onPress}>
      <Typography color={btnColor.text} style={{ textAlign: 'center' }} category={category}>{children}</Typography>
    </TouchableOpacity>
  )
}

export default Button