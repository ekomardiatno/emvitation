import {
  ColorValue,
  StyleProp,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
} from 'react-native';
import { TYPOGRAPHY } from '../../constants';
import { useTheme } from './AppProvider';
import {
  FontWeightLabelType,
  FontWeightType,
  TypographyCategoryType,
} from '../../types/typography-type';

const Typography = ({
  children,
  category = 'regular',
  marginTop = 0,
  marginBottom = 0,
  marginLeft = 0,
  marginRight = 0,
  size,
  color,
  style,
  fontWeight,
  ...props
}: TextProps & {
  category?: TypographyCategoryType;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  color?: ColorValue | string;
  size?: number;
  animated?: boolean;
  fontWeight?: FontWeightType[keyof FontWeightType];
}) => {
  const theme = useTheme();
  const flatStyle = StyleSheet.flatten(style);

  const textStyle: StyleProp<TextStyle> = {
    textAlignVertical: 'center',
    ...flatStyle,
    marginTop:
      marginTop ||
      flatStyle?.marginTop ||
      (size && typeof size === 'number' ? ((size * 2.5) / 20) * -1 : undefined),
    marginBottom: marginBottom || flatStyle?.marginBottom,
    marginLeft: marginLeft || flatStyle?.marginLeft,
    marginRight: marginRight || flatStyle?.marginRight,
    lineHeight:
      style && flatStyle?.lineHeight
        ? flatStyle?.lineHeight
        : (size && typeof size === 'number'
            ? size + (size * 6) / 15
            : undefined) ?? TYPOGRAPHY.textStyle[category].lineHeight,
    fontSize:
      (size && typeof size === 'number' ? size : undefined) ||
      flatStyle?.fontSize ||
      TYPOGRAPHY.textStyle[category].fontSize,
    color: color || flatStyle?.color || theme['text-primary'],
    fontFamily: getFontFamily({
      fontFamily: flatStyle?.fontFamily || TYPOGRAPHY.fontFamily.base,
      fontWeight:
        fontWeight ||
        (flatStyle?.fontWeight as 300 | 400 | 500 | 600 | 700) ||
        TYPOGRAPHY.textStyle[category].fontWeight,
      fontStyle: flatStyle?.fontStyle,
    }),
    fontWeight: undefined,
  };

  return (
    <Text allowFontScaling={true} style={textStyle} {...props}>
      {children}
    </Text>
  );
};

export const getFontFamily = ({
  fontFamily = TYPOGRAPHY.fontFamily.base,
  fontWeight = 400,
  fontStyle = 'normal',
}: {
  fontFamily?: string;
  fontWeight?: FontWeightType[keyof FontWeightType];
  fontStyle?: 'italic' | 'normal';
}) => {
  const font = `${fontFamily}-${getFontWeight(fontWeight)}${
    fontStyle === 'italic' ? 'Italic' : ''
  }`;
  return font;
};

const getFontWeight = (
  fontWeight: TextStyle['fontWeight'],
): FontWeightLabelType => {
  let weight: FontWeightLabelType = 'Regular';
  switch (fontWeight) {
    case '100':
    case 100:
    case 'thin':
      weight = 'Thin';
      break;
    case '200':
    case 200:
    case 'ultralight':
      weight = 'ExtraLight';
      break;
    case '300':
    case 300:
    case 'light':
      weight = 'Light';
      break;
    case '400':
    case 400:
    case 'regular':
    case 'normal':
      weight = 'Regular';
      break;
    case '500':
    case 500:
    case 'medium':
      weight = 'Medium';
      break;
    case '600':
    case 600:
    case 'semibold':
      weight = 'SemiBold';
      break;
    case '700':
    case 700:
    case 'bold':
      weight = 'Bold';
      break;
    case '800':
    case 800:
    case 'heavy':
      weight = 'ExtraBold';
      break;
    case '900':
    case 900:
    case 'black':
      weight = 'Black';
      break;
  }
  return weight;
};

export default Typography;
