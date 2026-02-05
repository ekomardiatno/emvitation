import { DARK_THEME, THEME } from '../../constants';
import { Appearance, ColorSchemeName, Platform, StatusBar } from 'react-native';

import { MapStyleElement } from 'react-native-maps';
import { createContext, useContext, useEffect, useState } from 'react';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import useAppDispatch from '../../hooks/useAppDispatch';
import { logout } from '../../redux/reducers/auth.reducer';
import { resetEvents } from '../../redux/reducers/event.reducer';
import { resetGuests } from '../../redux/reducers/guest.reducer';
import { resetProfile } from '../../redux/reducers/profile.reducer';
import { resetTemplates } from '../../redux/reducers/template.reducer';
import { resetWeddings } from '../../redux/reducers/wedding.reducer';

type AppContextType = {theme: ThemeType; appLogout: () => void};

const AppContext = createContext<AppContextType>({
  theme: DARK_THEME,
  appLogout: () => {},
});

export const useTheme = (): ThemeType => {
  return useContext(AppContext).theme;
};

export const useApp = (): AppContextType => {
  return useContext(AppContext);
};

const AppProvider = ({children}: {children: React.ReactNode}) => {
  const [theme, setTheme] = useState<ThemeType>(DARK_THEME);
  const colorSchema = Appearance.getColorScheme();
  const dispatch = useAppDispatch();

  const appLogout = () => {
    dispatch(logout());
    dispatch(resetEvents());
    dispatch(resetGuests());
    dispatch(resetProfile());
    dispatch(resetTemplates());
    dispatch(resetWeddings());
  };

  useEffect(() => {
    const autoSchemaChange = (schema: ColorSchemeName) => {
      StatusBar.setBarStyle(
        schema === 'dark' ? 'light-content' : 'dark-content',
      );
      if (Platform.OS === 'android') {
        changeNavigationBarColor('transparent', schema === 'light');
      }
      StatusBar.setTranslucent(true);
      setTheme(schema === 'dark' ? DARK_THEME : THEME);
    };
    autoSchemaChange(colorSchema);
    Appearance.addChangeListener(schema => {
      autoSchemaChange(schema.colorScheme);
    });
  }, [colorSchema]);

  return (
    <AppContext.Provider value={{theme, appLogout}}>
      {children}
    </AppContext.Provider>
  );
};

export type ThemeType = {
  // core background & text colors
  schema: ColorSchemeName;
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
