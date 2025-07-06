
import { FontWeight } from "../components/core/Typography"
import customColors from "./customColors"

export const HIDDEN_AMOUNT_TEXT = '• • • • • • •'

export const REDUX_KEY_NAME = 'EMVITE_REDUX'

export const FONT_FAMILY = 'Inter'

export const TEXT_CONFIG = {
  h1: {
    fontSize: 36,
    fontWeight: 800 as FontWeight
  },
  h2: {
    fontSize: 32,
    fontWeight: 700 as FontWeight
  },
  h3: {
    fontSize: 30,
    fontWeight: 700 as FontWeight
  },
  h4: {
    fontSize: 26,
    fontWeight: 600 as FontWeight
  },
  h5: {
    fontSize: 22,
    fontWeight: 500 as FontWeight
  },
  h6: {
    fontSize: 18,
    fontWeight: 500 as FontWeight
  },
  s1: {
    fontSize: 15,
    fontWeight: 300 as FontWeight
  },
  s2: {
    fontSize: 13,
    fontWeight: 300 as FontWeight
  },
  p1: {
    fontSize: 15,
    fontWeight: 400 as FontWeight
  },
  p2: {
    fontSize: 13,
    fontWeight: 400 as FontWeight
  },
  c1: {
    fontSize: 12,
    fontWeight: 400 as FontWeight
  },
  c2: {
    fontSize: 12,
    fontWeight: 600 as FontWeight
  },
  label: {
    fontSize: 12,
    fontWeight: 800 as FontWeight
  }
}

export const COLORS = {
  ...{
    colorPrimary100: "#F2F6FF",
    colorPrimary200: "#D9E4FF",
    colorPrimary300: "#A6C1FF",
    colorPrimary400: "#598BFF",
    colorPrimary500: "#3366FF",
    colorPrimary600: "#274BDB",
    colorPrimary700: "#1A34B8",
    colorPrimary800: "#102694",
    colorPrimary900: "#091C7A",
  },

  colorPrimaryTransparent100: "rgba(51, 102, 255, 0.08)",
  colorPrimaryTransparent200: "rgba(51, 102, 255, 0.16)",
  colorPrimaryTransparent300: "rgba(51, 102, 255, 0.24)",
  colorPrimaryTransparent400: "rgba(51, 102, 255, 0.32)",
  colorPrimaryTransparent500: "rgba(51, 102, 255, 0.40)",
  colorPrimaryTransparent600: "rgba(51, 102, 255, 0.48)",

  ...{
    colorSuccess100: "#EDFFF3",
    colorSuccess200: "#B3FFD6",
    colorSuccess300: "#8CFAC7",
    colorSuccess400: "#51F0B0",
    colorSuccess500: "#00E096",
    colorSuccess600: "#00B383",
    colorSuccess700: "#008F72",
    colorSuccess800: "#007566",
    colorSuccess900: "#00524C",
  },

  colorSuccessTransparent100: "rgba(0, 224, 150, 0.08)",
  colorSuccessTransparent200: "rgba(0, 224, 150, 0.16)",
  colorSuccessTransparent300: "rgba(0, 224, 150, 0.24)",
  colorSuccessTransparent400: "rgba(0, 224, 150, 0.32)",
  colorSuccessTransparent500: "rgba(0, 224, 150, 0.40)",
  colorSuccessTransparent600: "rgba(0, 224, 150, 0.48)",

  ...{
    colorInfo100: "#F2F8FF",
    colorInfo200: "#C7E2FF",
    colorInfo300: "#94CBFF",
    colorInfo400: "#42AAFF",
    colorInfo500: "#0095FF",
    colorInfo600: "#006FD6",
    colorInfo700: "#0057C2",
    colorInfo800: "#0041A8",
    colorInfo900: "#002885",
  },

  colorInfoTransparent100: "rgba(0, 149, 255, 0.08)",
  colorInfoTransparent200: "rgba(0, 149, 255, 0.16)",
  colorInfoTransparent300: "rgba(0, 149, 255, 0.24)",
  colorInfoTransparent400: "rgba(0, 149, 255, 0.32)",
  colorInfoTransparent500: "rgba(0, 149, 255, 0.40)",
  colorInfoTransparent600: "rgba(0, 149, 255, 0.48)",

  ...{
    colorWarning100: "#FFFDF2",
    colorWarning200: "#FFF1C2",
    colorWarning300: "#FFE59E",
    colorWarning400: "#FFC94D",
    colorWarning500: "#FFAA00",
    colorWarning600: "#DB8B00",
    colorWarning700: "#B86E00",
    colorWarning800: "#945400",
    colorWarning900: "#703C00",
  },

  colorWarningTransparent100: "rgba(255, 170, 0, 0.08)",
  colorWarningTransparent200: "rgba(255, 170, 0, 0.16)",
  colorWarningTransparent300: "rgba(255, 170, 0, 0.24)",
  colorWarningTransparent400: "rgba(255, 170, 0, 0.32)",
  colorWarningTransparent500: "rgba(255, 170, 0, 0.40)",
  colorWarningTransparent600: "rgba(255, 170, 0, 0.48)",

  ...{
    colorDanger100: "#FFF2F2",
    colorDanger200: "#FFD6D9",
    colorDanger300: "#FFA8B4",
    colorDanger400: "#FF708D",
    colorDanger500: "#FF3D71",
    colorDanger600: "#DB2C66",
    colorDanger700: "#B81D5B",
    colorDanger800: "#94124E",
    colorDanger900: "#700940",
  },

  colorDangerTransparent100: "rgba(255, 61, 113, 0.08)",
  colorDangerTransparent200: "rgba(255, 61, 113, 0.16)",
  colorDangerTransparent300: "rgba(255, 61, 113, 0.24)",
  colorDangerTransparent400: "rgba(255, 61, 113, 0.32)",
  colorDangerTransparent500: "rgba(255, 61, 113, 0.40)",
  colorDangerTransparent600: "rgba(255, 61, 113, 0.48)",

  colorBasic000: "#FFFFFF",
  colorBasic100: "#F2F8FD",
  colorBasic200: "#E3F0FA",
  colorBasic300: "#D0E6F5",
  colorBasic400: "#B6D2EA",
  colorBasic500: "#9CB4C9",
  colorBasic600: "#8296A8",
  colorBasic700: "#687887",
  colorBasic800: "#4E5A66",
  colorBasic900: "#343C44",
  colorBasic1000: "#20252A",
  colorBasic1100: "#000000",

  colorBasicTransparent100: "rgba(143, 155, 179, 0.08)",
  colorBasicTransparent200: "rgba(143, 155, 179, 0.16)",
  colorBasicTransparent300: "rgba(143, 155, 179, 0.24)",
  colorBasicTransparent400: "rgba(143, 155, 179, 0.32)",
  colorBasicTransparent500: "rgba(143, 155, 179, 0.40)",
  colorBasicTransparent600: "rgba(143, 155, 179, 0.48)",

  colorBasicControlTransparent100: "rgba(255, 255, 255, 0.08)",
  colorBasicControlTransparent200: "rgba(255, 255, 255, 0.16)",
  colorBasicControlTransparent300: "rgba(255, 255, 255, 0.24)",
  colorBasicControlTransparent400: "rgba(255, 255, 255, 0.32)",
  colorBasicControlTransparent500: "rgba(255, 255, 255, 0.40)",
  colorBasicControlTransparent600: "rgba(255, 255, 255, 0.48)",
  ...customColors
}

export const THEME = {
  colorBasicFocus: COLORS.colorBasic400,
  colorBasicHover: COLORS.colorBasic200,
  colorBasicDefault: COLORS.colorBasic300,
  colorBasicActive: COLORS.colorBasic400,
  colorBasicDisabled: COLORS.colorBasicTransparent300,
  colorBasicFocusBorder: COLORS.colorBasic500,
  colorBasicHoverBorder: COLORS.colorBasic200,
  colorBasicDefaultBorder: COLORS.colorBasic300,
  colorBasicActiveBorder: COLORS.colorBasic400,
  colorBasicDisabledBorder: COLORS.colorBasicTransparent300,

  colorBasicTransparentFocus: COLORS.colorBasicTransparent300,
  colorBasicTransparentHover: COLORS.colorBasicTransparent200,
  colorBasicTransparentDefault: COLORS.colorBasicTransparent100,
  colorBasicTransparentActive: COLORS.colorBasicTransparent300,
  colorBasicTransparentDisabled: COLORS.colorBasicTransparent200,
  colorBasicTransparentFocusBorder: COLORS.colorBasic600,
  colorBasicTransparentHoverBorder: COLORS.colorBasic600,
  colorBasicTransparentDefaultBorder: COLORS.colorBasic600,
  colorBasicTransparentActiveBorder: COLORS.colorBasic600,
  colorBasicTransparentDisabledBorder: COLORS.colorBasicTransparent300,

  colorPrimaryFocus: COLORS.colorPrimary600,
  colorPrimaryHover: COLORS.colorPrimary400,
  colorPrimaryDefault: COLORS.colorPrimary500,
  colorPrimaryActive: COLORS.colorPrimary600,
  colorPrimaryDisabled: COLORS.colorBasicTransparent300,
  colorPrimaryFocusBorder: COLORS.colorPrimary700,
  colorPrimaryHoverBorder: COLORS.colorPrimary400,
  colorPrimaryDefaultBorder: COLORS.colorPrimary500,
  colorPrimaryActiveBorder: COLORS.colorPrimary600,
  colorPrimaryDisabledBorder: COLORS.colorBasicTransparent300,

  colorPrimaryTransparentFocus: COLORS.colorPrimaryTransparent300,
  colorPrimaryTransparentHover: COLORS.colorPrimaryTransparent200,
  colorPrimaryTransparentDefault: COLORS.colorPrimaryTransparent100,
  colorPrimaryTransparentActive: COLORS.colorPrimaryTransparent300,
  colorPrimaryTransparentDisabled: COLORS.colorBasicTransparent200,
  colorPrimaryTransparentFocusBorder: COLORS.colorPrimary500,
  colorPrimaryTransparentHoverBorder: COLORS.colorPrimary500,
  colorPrimaryTransparentDefaultBorder: COLORS.colorPrimary500,
  colorPrimaryTransparentActiveBorder: COLORS.colorPrimary500,
  colorPrimaryTransparentDisabledBorder: COLORS.colorBasicTransparent300,

  colorSuccessFocus: COLORS.colorSuccess600,
  colorSuccessHover: COLORS.colorSuccess400,
  colorSuccessDefault: COLORS.colorSuccess500,
  colorSuccessActive: COLORS.colorSuccess600,
  colorSuccessDisabled: COLORS.colorBasicTransparent300,
  colorSuccessFocusBorder: COLORS.colorSuccess700,
  colorSuccessHoverBorder: COLORS.colorSuccess400,
  colorSuccessDefaultBorder: COLORS.colorSuccess500,
  colorSuccessActiveBorder: COLORS.colorSuccess600,
  colorSuccessDisabledBorder: COLORS.colorBasicTransparent300,

  colorSuccessTransparentFocus: COLORS.colorSuccessTransparent300,
  colorSuccessTransparentHover: COLORS.colorSuccessTransparent200,
  colorSuccessTransparentDefault: COLORS.colorSuccessTransparent100,
  colorSuccessTransparentActive: COLORS.colorSuccessTransparent300,
  colorSuccessTransparentDisabled: COLORS.colorBasicTransparent200,
  colorSuccessTransparentFocusBorder: COLORS.colorSuccess500,
  colorSuccessTransparentHoverBorder: COLORS.colorSuccess500,
  colorSuccessTransparentDefaultBorder: COLORS.colorSuccess500,
  colorSuccessTransparentActiveBorder: COLORS.colorSuccess500,
  colorSuccessTransparentDisabledBorder: COLORS.colorBasicTransparent300,

  colorInfoFocus: COLORS.colorInfo600,
  colorInfoHover: COLORS.colorInfo400,
  colorInfoDefault: COLORS.colorInfo500,
  colorInfoActive: COLORS.colorInfo600,
  colorInfoDisabled: COLORS.colorBasicTransparent300,
  colorInfoFocusBorder: COLORS.colorInfo700,
  colorInfoHoverBorder: COLORS.colorInfo400,
  colorInfoDefaultBorder: COLORS.colorInfo500,
  colorInfoActiveBorder: COLORS.colorInfo600,
  colorInfoDisabledBorder: COLORS.colorBasicTransparent300,

  colorInfoTransparentFocus: COLORS.colorInfoTransparent300,
  colorInfoTransparentHover: COLORS.colorInfoTransparent200,
  colorInfoTransparentDefault: COLORS.colorInfoTransparent100,
  colorInfoTransparentActive: COLORS.colorInfoTransparent300,
  colorInfoTransparentDisabled: COLORS.colorBasicTransparent200,
  colorInfoTransparentFocusBorder: COLORS.colorInfo500,
  colorInfoTransparentHoverBorder: COLORS.colorInfo500,
  colorInfoTransparentDefaultBorder: COLORS.colorInfo500,
  colorInfoTransparentActiveBorder: COLORS.colorInfo500,
  colorInfoTransparentDisabledBorder: COLORS.colorBasicTransparent300,

  colorWarningFocus: COLORS.colorWarning600,
  colorWarningHover: COLORS.colorWarning400,
  colorWarningDefault: COLORS.colorWarning500,
  colorWarningActive: COLORS.colorWarning600,
  colorWarningDisabled: COLORS.colorBasicTransparent300,
  colorWarningFocusBorder: COLORS.colorWarning700,
  colorWarningHoverBorder: COLORS.colorWarning400,
  colorWarningDefaultBorder: COLORS.colorWarning500,
  colorWarningActiveBorder: COLORS.colorWarning600,
  colorWarningDisabledBorder: COLORS.colorBasicTransparent300,

  colorWarningTransparentFocus: COLORS.colorWarningTransparent300,
  colorWarningTransparentHover: COLORS.colorWarningTransparent200,
  colorWarningTransparentDefault: COLORS.colorWarningTransparent100,
  colorWarningTransparentActive: COLORS.colorWarningTransparent300,
  colorWarningTransparentDisabled: COLORS.colorBasicTransparent200,
  colorWarningTransparentFocusBorder: COLORS.colorWarning500,
  colorWarningTransparentHoverBorder: COLORS.colorWarning500,
  colorWarningTransparentDefaultBorder: COLORS.colorWarning500,
  colorWarningTransparentActiveBorder: COLORS.colorWarning500,
  colorWarningTransparentDisabledBorder: COLORS.colorBasicTransparent300,

  colorDangerFocus: COLORS.colorDanger600,
  colorDangerHover: COLORS.colorDanger400,
  colorDangerDefault: COLORS.colorDanger500,
  colorDangerActive: COLORS.colorDanger600,
  colorDangerDisabled: COLORS.colorBasicTransparent300,
  colorDangerFocusBorder: COLORS.colorDanger700,
  colorDangerHoverBorder: COLORS.colorDanger400,
  colorDangerDefaultBorder: COLORS.colorDanger500,
  colorDangerActiveBorder: COLORS.colorDanger600,
  colorDangerDisabledBorder: COLORS.colorBasicTransparent300,

  colorDangerTransparentFocus: COLORS.colorDangerTransparent300,
  colorDangerTransparentHover: COLORS.colorDangerTransparent200,
  colorDangerTransparentDefault: COLORS.colorDangerTransparent100,
  colorDangerTransparentActive: COLORS.colorDangerTransparent300,
  colorDangerTransparentDisabled: COLORS.colorBasicTransparent200,
  colorDangerTransparentFocusBorder: COLORS.colorDanger500,
  colorDangerTransparentHoverBorder: COLORS.colorDanger500,
  colorDangerTransparentDefaultBorder: COLORS.colorDanger500,
  colorDangerTransparentActiveBorder: COLORS.colorDanger500,
  colorDangerTransparentDisabledBorder: COLORS.colorBasicTransparent300,

  colorControlFocus: COLORS.colorBasic300,
  colorControlHover: COLORS.colorBasic200,
  colorControlDefault: COLORS.colorBasic100,
  colorControlActive: COLORS.colorBasic300,
  colorControlDisabled: COLORS.colorBasicTransparent300,
  colorControlFocusBorder: COLORS.colorBasic500,
  colorControlHoverBorder: COLORS.colorBasic200,
  colorControlDefaultBorder: COLORS.colorBasic100,
  colorControlActiveBorder: COLORS.colorBasic300,
  colorControlDisabledBorder: COLORS.colorBasicTransparent300,

  colorControlTransparentFocus: COLORS.colorBasicControlTransparent300,
  colorControlTransparentHover: COLORS.colorBasicControlTransparent200,
  colorControlTransparentDefault: COLORS.colorBasicControlTransparent100,
  colorControlTransparentActive: COLORS.colorBasicControlTransparent300,
  colorControlTransparentDisabled: COLORS.colorBasicTransparent200,
  colorControlTransparentFocusBorder: COLORS.colorBasic100,
  colorControlTransparentHoverBorder: COLORS.colorBasic100,
  colorControlTransparentDefaultBorder: COLORS.colorBasic100,
  colorControlTransparentActiveBorder: COLORS.colorBasic100,
  colorControlTransparentDisabledBorder: COLORS.colorBasicTransparent300,

  backgroundBasicColor0: COLORS.colorBasic000,
  backgroundBasicColor1: COLORS.colorBasic100,
  backgroundBasicColor2: COLORS.colorBasic200,
  backgroundBasicColor3: COLORS.colorBasic300,
  backgroundBasicColor4: COLORS.colorBasic400,

  backgroundAlternativeColor1: COLORS.colorBasic1100,
  backgroundAlternativeColor2: COLORS.colorBasic1000,
  backgroundAlternativeColor3: COLORS.colorBasic900,
  backgroundAlternativeColor4: COLORS.colorBasic800,

  borderBasicColor0: COLORS.colorBasic000,
  borderBasicColor1: COLORS.colorBasic100,
  borderBasicColor2: COLORS.colorBasic200,
  borderBasicColor3: COLORS.colorBasic300,
  borderBasicColor4: COLORS.colorBasic400,
  borderBasicColor5: COLORS.colorBasic500,

  borderAlternativeColor1: COLORS.colorBasic1100,
  borderAlternativeColor2: COLORS.colorBasic1000,
  borderAlternativeColor3: COLORS.colorBasic900,
  borderAlternativeColor4: COLORS.colorBasic800,
  borderAlternativeColor5: COLORS.colorBasic700,

  borderPrimaryColor1: COLORS.colorPrimary500,
  borderPrimaryColor2: COLORS.colorPrimary600,
  borderPrimaryColor3: COLORS.colorPrimary700,
  borderPrimaryColor4: COLORS.colorPrimary800,
  borderPrimaryColor5: COLORS.colorPrimary900,

  borderSuccessColor1: COLORS.colorSuccess500,
  borderSuccessColor2: COLORS.colorSuccess600,
  borderSuccessColor3: COLORS.colorSuccess700,
  borderSuccessColor4: COLORS.colorSuccess800,
  borderSuccessColor5: COLORS.colorSuccess900,

  borderInfoColor1: COLORS.colorInfo500,
  borderInfoColor2: COLORS.colorInfo600,
  borderInfoColor3: COLORS.colorInfo700,
  borderInfoColor4: COLORS.colorInfo800,
  borderInfoColor5: COLORS.colorInfo900,

  borderWarningColor1: COLORS.colorWarning500,
  borderWarningColor2: COLORS.colorWarning600,
  borderWarningColor3: COLORS.colorWarning700,
  borderWarningColor4: COLORS.colorWarning800,
  borderWarningColor5: COLORS.colorWarning900,

  borderDangerColor1: COLORS.colorDanger500,
  borderDangerColor2: COLORS.colorDanger600,
  borderDangerColor3: COLORS.colorDanger700,
  borderDangerColor4: COLORS.colorDanger800,
  borderDangerColor5: COLORS.colorDanger900,

  textBasicColor: COLORS.colorBasic900,
  textAlternateColor: COLORS.colorBasic100,
  textControlColor: COLORS.colorBasic100,
  textDisabledColor: COLORS.colorBasic500,
  textHintColor: COLORS.colorBasic700,

  textPrimaryColor: COLORS.colorPrimary500,
  textPrimaryFocusColor: COLORS.colorPrimary600,
  textPrimaryHoverColor: COLORS.colorPrimary400,
  textPrimaryActiveColor: COLORS.colorPrimary600,
  textPrimaryDisabledColor: COLORS.colorPrimary400,

  textSuccessColor: COLORS.colorSuccess500,
  textSuccessFocusColor: COLORS.colorSuccess600,
  textSuccessHoverColor: COLORS.colorSuccess400,
  textSuccessActiveColor: COLORS.colorSuccess600,
  textSuccessDisabledColor: COLORS.colorSuccess400,

  textInfoColor: COLORS.colorInfo500,
  textInfoFocusColor: COLORS.colorInfo700,
  textInfoHoverColor: COLORS.colorInfo400,
  textInfoActiveColor: COLORS.colorInfo600,
  textInfoDisabledColor: COLORS.colorInfo400,

  textWarningColor: COLORS.colorWarning500,
  textWarningFocusColor: COLORS.colorWarning600,
  textWarningHoverColor: COLORS.colorWarning400,
  textWarningActiveColor: COLORS.colorWarning600,
  textWarningDisabledColor: COLORS.colorWarning400,

  textDangerColor: COLORS.colorDanger500,
  textDangerFocusColor: COLORS.colorDanger600,
  textDangerHoverColor: COLORS.colorDanger400,
  textDangerActiveColor: COLORS.colorDanger600,
  textDangerDisabledColor: COLORS.colorDanger400,

  outlineColor: COLORS.colorBasicTransparent200,
  backgroundModalBackdropColor: 'rgba(0,0,0,.5)'
}

export const DARK_THEME = {
  backgroundBasicColor0: '#121519',
  backgroundBasicColor1: COLORS.colorBasic1100,
  backgroundBasicColor2: COLORS.colorBasic1000,
  backgroundBasicColor3: COLORS.colorBasic900,
  backgroundBasicColor4: COLORS.colorBasic800,

  backgroundAlternativeColor1: COLORS.colorBasic100,
  backgroundAlternativeColor2: COLORS.colorBasic200,
  backgroundAlternativeColor3: COLORS.colorBasic300,
  backgroundAlternativeColor4: COLORS.colorBasic400,

  borderBasicColor0: '#121519',
  borderBasicColor1: COLORS.colorBasic1100,
  borderBasicColor2: COLORS.colorBasic1000,
  borderBasicColor3: COLORS.colorBasic900,
  borderBasicColor4: COLORS.colorBasic800,
  borderBasicColor5: COLORS.colorBasic700,

  borderAlternativeColor1: COLORS.colorBasic100,
  borderAlternativeColor2: COLORS.colorBasic200,
  borderAlternativeColor3: COLORS.colorBasic300,
  borderAlternativeColor4: COLORS.colorBasic400,
  borderAlternativeColor5: COLORS.colorBasic500,

  textBasicColor: COLORS.colorBasic100,
  textAlternateColor: COLORS.colorBasic900,
  textDisabledColor: COLORS.colorBasic700,
  textHintColor: COLORS.colorBasic500,

  outlineColor: COLORS.colorBasic700,
  backgroundModalBackdropColor: 'rgba(32, 37, 42, .5)'
}

export const SIZE = {
  tiny: 24,
  small: 32,
  medium: 40,
  large: 48,
  giant: 56,
}

export const BORDER_RADIUS = 8
export const BORDER_WIDTH = 1

export const APP_APPEARANCE_TYPE = {
  LIGHT: 'LIGHT',
  DARK: 'DARK'
}

export const GUTTER_SPACE = 15

export const SCROLL_SPEED_MULTIPLIER = 1