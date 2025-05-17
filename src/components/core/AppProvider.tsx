import { APP_APPEARANCE_TYPE, DARK_THEME, THEME } from '../../constants'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import { JSX } from 'react'

import { AppAppearanceType } from '../../types/app-appearance-type'

export const useTheme = (): ThemeType => {
  const appearanceType = useSelector<any>(state => state.appReducer.appearanceType) as AppAppearanceType
  const theme = appearanceType === APP_APPEARANCE_TYPE.LIGHT ? THEME : { ...THEME, ...DARK_THEME }
  return theme
}

const AppProvider = ({ children }: {
  children: JSX.Element
}): JSX.Element => {
  return (
    <View style={{ flex: 1 }}>
      {children}
    </View>
  )
}

export type ThemeType = {
  colorBasicFocus: string
  colorBasicHover: string
  colorBasicDefault: string
  colorBasicActive: string
  colorBasicDisabled: string
  colorBasicFocusBorder: string
  colorBasicHoverBorder: string
  colorBasicDefaultBorder: string
  colorBasicActiveBorder: string
  colorBasicDisabledBorder: string
  colorBasicTransparentFocus: string
  colorBasicTransparentHover: string
  colorBasicTransparentDefault: string
  colorBasicTransparentActive: string
  colorBasicTransparentDisabled: string
  colorBasicTransparentFocusBorder: string
  colorBasicTransparentHoverBorder: string
  colorBasicTransparentDefaultBorder: string
  colorBasicTransparentActiveBorder: string
  colorBasicTransparentDisabledBorder: string
  colorPrimaryFocus: string
  colorPrimaryHover: string
  colorPrimaryDefault: string
  colorPrimaryActive: string
  colorPrimaryDisabled: string
  colorPrimaryFocusBorder: string
  colorPrimaryHoverBorder: string
  colorPrimaryDefaultBorder: string
  colorPrimaryActiveBorder: string
  colorPrimaryDisabledBorder: string
  colorPrimaryTransparentFocus: string
  colorPrimaryTransparentHover: string
  colorPrimaryTransparentDefault: string
  colorPrimaryTransparentActive: string
  colorPrimaryTransparentDisabled: string
  colorPrimaryTransparentFocusBorder: string
  colorPrimaryTransparentHoverBorder: string
  colorPrimaryTransparentDefaultBorder: string
  colorPrimaryTransparentActiveBorder: string
  colorPrimaryTransparentDisabledBorder: string
  colorSuccessFocus: string
  colorSuccessHover: string
  colorSuccessDefault: string
  colorSuccessActive: string
  colorSuccessDisabled: string
  colorSuccessFocusBorder: string
  colorSuccessHoverBorder: string
  colorSuccessDefaultBorder: string
  colorSuccessActiveBorder: string
  colorSuccessDisabledBorder: string
  colorSuccessTransparentFocus: string
  colorSuccessTransparentHover: string
  colorSuccessTransparentDefault: string
  colorSuccessTransparentActive: string
  colorSuccessTransparentDisabled: string
  colorSuccessTransparentFocusBorder: string
  colorSuccessTransparentHoverBorder: string
  colorSuccessTransparentDefaultBorder: string
  colorSuccessTransparentActiveBorder: string
  colorSuccessTransparentDisabledBorder: string
  colorInfoFocus: string
  colorInfoHover: string
  colorInfoDefault: string
  colorInfoActive: string
  colorInfoDisabled: string
  colorInfoFocusBorder: string
  colorInfoHoverBorder: string
  colorInfoDefaultBorder: string
  colorInfoActiveBorder: string
  colorInfoDisabledBorder: string
  colorInfoTransparentFocus: string
  colorInfoTransparentHover: string
  colorInfoTransparentDefault: string
  colorInfoTransparentActive: string
  colorInfoTransparentDisabled: string
  colorInfoTransparentFocusBorder: string
  colorInfoTransparentHoverBorder: string
  colorInfoTransparentDefaultBorder: string
  colorInfoTransparentActiveBorder: string
  colorInfoTransparentDisabledBorder: string
  colorWarningFocus: string
  colorWarningHover: string
  colorWarningDefault: string
  colorWarningActive: string
  colorWarningDisabled: string
  colorWarningFocusBorder: string
  colorWarningHoverBorder: string
  colorWarningDefaultBorder: string
  colorWarningActiveBorder: string
  colorWarningDisabledBorder: string
  colorWarningTransparentFocus: string
  colorWarningTransparentHover: string
  colorWarningTransparentDefault: string
  colorWarningTransparentActive: string
  colorWarningTransparentDisabled: string
  colorWarningTransparentFocusBorder: string
  colorWarningTransparentHoverBorder: string
  colorWarningTransparentDefaultBorder: string
  colorWarningTransparentActiveBorder: string
  colorWarningTransparentDisabledBorder: string
  colorDangerFocus: string
  colorDangerHover: string
  colorDangerDefault: string
  colorDangerActive: string
  colorDangerDisabled: string
  colorDangerFocusBorder: string
  colorDangerHoverBorder: string
  colorDangerDefaultBorder: string
  colorDangerActiveBorder: string
  colorDangerDisabledBorder: string
  colorDangerTransparentFocus: string
  colorDangerTransparentHover: string
  colorDangerTransparentDefault: string
  colorDangerTransparentActive: string
  colorDangerTransparentDisabled: string
  colorDangerTransparentFocusBorder: string
  colorDangerTransparentHoverBorder: string
  colorDangerTransparentDefaultBorder: string
  colorDangerTransparentActiveBorder: string
  colorDangerTransparentDisabledBorder: string
  colorControlFocus: string
  colorControlHover: string
  colorControlDefault: string
  colorControlActive: string
  colorControlDisabled: string
  colorControlFocusBorder: string
  colorControlHoverBorder: string
  colorControlDefaultBorder: string
  colorControlActiveBorder: string
  colorControlDisabledBorder: string
  colorControlTransparentFocus: string
  colorControlTransparentHover: string
  colorControlTransparentDefault: string
  colorControlTransparentActive: string
  colorControlTransparentDisabled: string
  colorControlTransparentFocusBorder: string
  colorControlTransparentHoverBorder: string
  colorControlTransparentDefaultBorder: string
  colorControlTransparentActiveBorder: string
  colorControlTransparentDisabledBorder: string
  backgroundBasicColor0: string
  backgroundBasicColor1: string
  backgroundBasicColor2: string
  backgroundBasicColor3: string
  backgroundBasicColor4: string
  backgroundAlternativeColor1: string
  backgroundAlternativeColor2: string
  backgroundAlternativeColor3: string
  backgroundAlternativeColor4: string
  borderBasicColor0: string
  borderBasicColor1: string
  borderBasicColor2: string
  borderBasicColor3: string
  borderBasicColor4: string
  borderBasicColor5: string
  borderAlternativeColor1: string
  borderAlternativeColor2: string
  borderAlternativeColor3: string
  borderAlternativeColor4: string
  borderAlternativeColor5: string
  borderPrimaryColor1: string
  borderPrimaryColor2: string
  borderPrimaryColor3: string
  borderPrimaryColor4: string
  borderPrimaryColor5: string
  borderSuccessColor1: string
  borderSuccessColor2: string
  borderSuccessColor3: string
  borderSuccessColor4: string
  borderSuccessColor5: string
  borderInfoColor1: string
  borderInfoColor2: string
  borderInfoColor3: string
  borderInfoColor4: string
  borderInfoColor5: string
  borderWarningColor1: string
  borderWarningColor2: string
  borderWarningColor3: string
  borderWarningColor4: string
  borderWarningColor5: string
  borderDangerColor1: string
  borderDangerColor2: string
  borderDangerColor3: string
  borderDangerColor4: string
  borderDangerColor5: string
  textBasicColor: string
  textAlternateColor: string
  textControlColor: string
  textDisabledColor: string
  textHintColor: string
  textPrimaryColor: string
  textPrimaryFocusColor: string
  textPrimaryHoverColor: string
  textPrimaryActiveColor: string
  textPrimaryDisabledColor: string
  textSuccessColor: string
  textSuccessFocusColor: string
  textSuccessHoverColor: string
  textSuccessActiveColor: string
  textSuccessDisabledColor: string
  textInfoColor: string
  textInfoFocusColor: string
  textInfoHoverColor: string
  textInfoActiveColor: string
  textInfoDisabledColor: string
  textWarningColor: string
  textWarningFocusColor: string
  textWarningHoverColor: string
  textWarningActiveColor: string
  textWarningDisabledColor: string
  textDangerColor: string
  textDangerFocusColor: string
  textDangerHoverColor: string
  textDangerActiveColor: string
  textDangerDisabledColor: string
  outlineColor: string
  backgroundModalBackdropColor: string
}

export default AppProvider