import { APP_APPEARANCE_TYPE, DARK_THEME, THEME } from '../../constants';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

import { AppAppearanceType } from '../../types/app-appearance-type';
import { MapStyleElement } from 'react-native-maps';

export const useTheme = (): ThemeType => {
  const appearanceType = useSelector<any>(
    state => state.appReducer.appearanceType,
  ) as AppAppearanceType;
  const theme =
    appearanceType === APP_APPEARANCE_TYPE.LIGHT
      ? THEME
      : {...THEME, ...DARK_THEME};
  return theme;
};

const AppProvider = ({children}: {children: React.ReactNode}) => {
  return <View style={{flex: 1}}>{children}</View>;
};

export type ThemeType = {
  // core background & text colors
  light: string;
  dark: string;
  'bg-app': string;
  'bg-surface': string;
  'bg-muted': string;
  'text-primary': string;
  'text-secondary': string;
  'text-disabled': string;
  'text-inverse': string;
  // borders & dividers
  'border-default': string;
  'border-muted': string;
  divider: string;
  'focus-ring': string;
  // primary actions
  'primary-bg': string;
  'primary-hover-bg': string;
  'primary-text': string;
  'primary-hover-text': string;
  'primary-disabled-bg': string;
  'primary-disabled-text': string;
  // Secondary / Ghost actions
  'secondary-bg': string;
  'secondary-hover-bg': string;
  'secondary-text': string;
  'secondary-hover-text': string;
  'secondary-disabled-bg': string;
  'secondary-disabled-text': string;
  'ghost-hover-bg': string;
  // Links
  'link-default': string;
  'link-hover': string;
  'link-visited': string;
  // Form elements
  'input-bg': string;
  'input-border': string;
  'input-focus-border': string;
  'input-placeholder': string;
  'input-text': string;
  // Semantic colors (optional)
  'success-bg': string;
  'success-text': string;
  'error-bg': string;
  'error-text': string;
  'warning-bg': string;
  'warning-text': string;
  'info-bg': string;
  'info-text': string;
  // Overlays & elevation (optional)
  overlay: string;
  googleMapStyle: MapStyleElement[];
};

export default AppProvider;
