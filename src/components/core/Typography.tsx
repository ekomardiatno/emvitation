import { Animated, ColorValue, StyleProp, StyleSheet, Text, TextProps, TextStyle } from 'react-native'
import { FONT_FAMILY, TEXT_CONFIG } from '../../constants'
import { useTheme } from './AppProvider'

export type Category = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 's1' | 's2' | 'p1' | 'p2' | 'c1' | 'c2' | 'label'

export type FontWeight = | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900
  | 'ultralight'
  | 'thin'
  | 'light'
  | 'medium'
  | 'regular'
  | 'semibold'
  | 'condensedBold'
  | 'condensed'
  | 'heavy'
  | 'black'
  | undefined
type GetFontFamily = {
  fontFamily?: string
  fontWeight?: FontWeight
  fontStyle?: 'normal' | 'italic' | undefined
}

const Typography = ({ children, category = 'p1', marginTop = 0, marginBottom = 0, marginLeft = 0, marginRight = 0, size, color, animated = false, style, ...props }: TextProps & {
  category?: Category
  marginTop?: number
  marginBottom?: number
  marginLeft?: number
  marginRight?: number
  color?: ColorValue | string
  size?: number | Animated.Value
  animated?: boolean
}) => {
  const theme = useTheme()
  const flatStyle = StyleSheet.flatten(style)

  const textStyle: StyleProp<TextStyle> = {
    textAlignVertical: "center", ...flatStyle, marginTop: marginTop || flatStyle?.marginTop || ((size && typeof size === 'number' ? (size * 2.5 / 20) * -1 : undefined) ?? TEXT_CONFIG[category].fontSize * 2.5 / 20 * -1), marginBottom: marginBottom || flatStyle?.marginBottom, marginLeft: marginLeft || flatStyle?.marginLeft, marginRight: marginRight || flatStyle?.marginRight, lineHeight: (style && flatStyle?.lineHeight) ? flatStyle?.lineHeight : (size && typeof size === 'number' ? size + (size * 6 / 15) : undefined) ?? (TEXT_CONFIG[category].fontSize + (TEXT_CONFIG[category].fontSize * 6 / 15)), fontSize: (size && typeof size === 'number' ? size : undefined) || flatStyle?.fontSize || TEXT_CONFIG[category].fontSize, color: color || flatStyle?.color || theme.textBasicColor, fontFamily: getFontFamily({ fontWeight: flatStyle?.fontWeight || TEXT_CONFIG[category].fontWeight, fontStyle: flatStyle?.fontStyle }), fontWeight: undefined
  }

  if (animated) {
    const animatedTextStyle = {
      ...textStyle,
      marginTop: marginTop || flatStyle?.marginTop || ((size && typeof size !== 'number' ? Animated.multiply(Animated.divide(Animated.multiply(size, 2.5), 20), -1) : undefined) ?? TEXT_CONFIG[category].fontSize * 2.5 / 20 * -1),
    }
    return (
      <Animated.Text
        style={animatedTextStyle}
        {...props}
      >
        {children}
      </Animated.Text>
    )
  }

  return (
    <Text
      style={textStyle}
      {...props}
    >
      {children}
    </Text>
  )
}

export const getFontFamily = ({ fontFamily = FONT_FAMILY, fontWeight, fontStyle = 'normal' }: GetFontFamily) => {
  const font = `${fontFamily}-${getFontWeight(fontWeight)}${fontStyle === 'italic' ? 'Italic' : ''}`
  return font
}

type FontWeightLabelType = 'Thin' | 'ExtraLight' | 'Light' | 'Regular' | 'Medium' | 'SemiBold' | 'Bold' | 'ExtraBold' | 'Black'

const getFontWeight = (fontWeight: FontWeight): FontWeightLabelType => {
  let weight: FontWeightLabelType = 'Regular'
  switch (fontWeight) {
    case '100':
    case 100:
    case 'thin':
      weight = 'Thin'
      break
    case '200':
    case 200:
    case 'ultralight':
      weight = 'ExtraLight'
      break
    case '300':
    case 300:
    case 'light':
      weight = 'Light'
      break
    case '400':
    case 400:
    case 'regular':
    case 'normal':
      weight = 'Regular'
      break
    case '500':
    case 500:
    case 'medium':
      weight = 'Medium'
      break
    case '600':
    case 600:
    case 'semibold':
      weight = 'SemiBold'
      break
    case '700':
    case 700:
    case 'bold':
      weight = 'Bold'
      break
    case '800':
    case 800:
    case 'heavy':
      weight = 'ExtraBold'
      break
    case '900':
    case 900:
    case 'black':
      weight = 'Black'
      break
  }
  return weight
}

export default Typography