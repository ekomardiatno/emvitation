/* eslint-disable quotes */

import { ThemeType } from '../components/core/AppProvider';
import { FontWeightType } from '../types/typography-type';

export const REDUX_KEY_NAME = 'EMVITE_REDUX';

const BASE_COLORS = {
  colorNeutral0: '#fff',
  colorSlate50: '#f8fafc',
  colorSlate100: '#f1f5f9',
  colorSlate200: '#e2e8f0',
  colorSlate300: '#cbd5e1',
  colorSlate400: '#94a3b8',
  colorSlate500: '#64748b',
  colorSlate600: '#475569',
  colorSlate700: '#334155',
  colorSlate800: '#1e293b',
  colorSlate900: '#0f172a',
  colorSlate950: '#020617',
  colorGray50: '#f9fafb',
  colorGray100: '#f3f4f6',
  colorGray200: '#e5e7eb',
  colorGray300: '#d1d5db',
  colorGray400: '#9ca3af',
  colorGray500: '#6b7280',
  colorGray600: '#4b5563',
  colorGray700: '#374151',
  colorGray800: '#1f2937',
  colorGray900: '#111827',
  colorGray950: '#030712',
  colorZinc50: '#fafafa',
  colorZinc100: '#f4f4f5',
  colorZinc200: '#e4e4e7',
  colorZinc300: '#d4d4d8',
  colorZinc400: '#a1a1aa',
  colorZinc500: '#71717a',
  colorZinc600: '#52525b',
  colorZinc700: '#3f3f46',
  colorZinc800: '#27272a',
  colorZinc900: '#18181b',
  colorZinc950: '#09090b',
  colorNeutral50: '#fafafa',
  colorNeutral100: '#f5f5f5',
  colorNeutral200: '#e5e5e5',
  colorNeutral300: '#d4d4d4',
  colorNeutral400: '#a3a3a3',
  colorNeutral500: '#737373',
  colorNeutral600: '#525252',
  colorNeutral700: '#404040',
  colorNeutral800: '#262626',
  colorNeutral900: '#171717',
  colorNeutral950: '#0a0a0a',
  colorStone50: '#fafaf9',
  colorStone100: '#f5f5f4',
  colorStone200: '#e7e5e4',
  colorStone300: '#d6d3d1',
  colorStone400: '#a8a29e',
  colorStone500: '#78716c',
  colorStone600: '#57534e',
  colorStone700: '#44403c',
  colorStone800: '#292524',
  colorStone900: '#1c1917',
  colorStone950: '#0c0a09',
  colorRed50: '#fef2f2',
  colorRed100: '#fee2e2',
  colorRed200: '#fecaca',
  colorRed300: '#fca5a5',
  colorRed400: '#f87171',
  colorRed500: '#ef4444',
  colorRed600: '#dc2626',
  colorRed700: '#b91c1c',
  colorRed800: '#991b1b',
  colorRed900: '#7f1d1d',
  colorRed950: '#450a0a',
  colorOrange50: '#fff7ed',
  colorOrange100: '#ffedd5',
  colorOrange200: '#fed7aa',
  colorOrange300: '#fdba74',
  colorOrange400: '#fb923c',
  colorOrange500: '#f97316',
  colorOrange600: '#ea580c',
  colorOrange700: '#c2410c',
  colorOrange800: '#9a3412',
  colorOrange900: '#7c2d12',
  colorOrange950: '#431407',
  colorAmber50: '#fffbeb',
  colorAmber100: '#fef3c7',
  colorAmber200: '#fde68a',
  colorAmber300: '#fcd34d',
  colorAmber400: '#fbbf24',
  colorAmber500: '#f59e0b',
  colorAmber600: '#d97706',
  colorAmber700: '#b45309',
  colorAmber800: '#92400e',
  colorAmber900: '#78350f',
  colorAmber950: '#451a03',
  colorYellow50: '#fefce8',
  colorYellow100: '#fef9c3',
  colorYellow200: '#fef08a',
  colorYellow300: '#fde047',
  colorYellow400: '#facc15',
  colorYellow500: '#eab308',
  colorYellow600: '#ca8a04',
  colorYellow700: '#a16207',
  colorYellow800: '#854d0e',
  colorYellow900: '#713f12',
  colorYellow950: '#422006',
  colorLime50: '#f7fee7',
  colorLime100: '#ecfccb',
  colorLime200: '#d9f99d',
  colorLime300: '#bef264',
  colorLime400: '#a3e635',
  colorLime500: '#84cc16',
  colorLime600: '#65a30d',
  colorLime700: '#4d7c0f',
  colorLime800: '#3f6212',
  colorLime900: '#365314',
  colorLime950: '#1a2e05',
  colorGreen50: '#f0fdf4',
  colorGreen100: '#dcfce7',
  colorGreen200: '#bbf7d0',
  colorGreen300: '#86efac',
  colorGreen400: '#4ade80',
  colorGreen500: '#22c55e',
  colorGreen600: '#16a34a',
  colorGreen700: '#15803d',
  colorGreen800: '#166534',
  colorGreen900: '#14532d',
  colorGreen950: '#052e16',
  colorEmerald50: '#ecfdf5',
  colorEmerald100: '#d1fae5',
  colorEmerald200: '#a7f3d0',
  colorEmerald300: '#6ee7b7',
  colorEmerald400: '#34d399',
  colorEmerald500: '#10b981',
  colorEmerald600: '#059669',
  colorEmerald700: '#047857',
  colorEmerald800: '#065f46',
  colorEmerald900: '#064e3b',
  colorEmerald950: '#022c22',
  colorTeal50: '#f0fdfa',
  colorTeal100: '#ccfbf1',
  colorTeal200: '#99f6e4',
  colorTeal300: '#5eead4',
  colorTeal400: '#2dd4bf',
  colorTeal500: '#14b8a6',
  colorTeal600: '#0d9488',
  colorTeal700: '#0f766e',
  colorTeal800: '#115e59',
  colorTeal900: '#134e4a',
  colorTeal950: '#042f2e',
  colorCyan50: '#ecfeff',
  colorCyan100: '#cffafe',
  colorCyan200: '#a5f3fc',
  colorCyan300: '#67e8f9',
  colorCyan400: '#22d3ee',
  colorCyan500: '#06b6d4',
  colorCyan600: '#0891b2',
  colorCyan700: '#0e7490',
  colorCyan800: '#155e75',
  colorCyan900: '#164e63',
  colorCyan950: '#083344',
  colorSky50: '#f0f9ff',
  colorSky100: '#e0f2fe',
  colorSky200: '#bae6fd',
  colorSky300: '#7dd3fc',
  colorSky400: '#38bdf8',
  colorSky500: '#0ea5e9',
  colorSky600: '#0284c7',
  colorSky700: '#0369a1',
  colorSky800: '#075985',
  colorSky900: '#0c4a6e',
  colorSky950: '#082f49',
  colorBlue50: '#eff6ff',
  colorBlue100: '#dbeafe',
  colorBlue200: '#bfdbfe',
  colorBlue300: '#93c5fd',
  colorBlue400: '#60a5fa',
  colorBlue500: '#3b82f6',
  colorBlue600: '#2563eb',
  colorBlue700: '#1d4ed8',
  colorBlue800: '#1e40af',
  colorBlue900: '#1e3a8a',
  colorBlue950: '#172554',
  colorIndigo50: '#eef2ff',
  colorIndigo100: '#e0e7ff',
  colorIndigo200: '#c7d2fe',
  colorIndigo300: '#a5b4fc',
  colorIndigo400: '#818cf8',
  colorIndigo500: '#6366f1',
  colorIndigo600: '#4f46e5',
  colorIndigo700: '#4338ca',
  colorIndigo800: '#3730a3',
  colorIndigo900: '#312e81',
  colorIndigo950: '#1e1b4b',
  colorViolet50: '#f5f3ff',
  colorViolet100: '#ede9fe',
  colorViolet200: '#ddd6fe',
  colorViolet300: '#c4b5fd',
  colorViolet400: '#a78bfa',
  colorViolet500: '#8b5cf6',
  colorViolet600: '#7c3aed',
  colorViolet700: '#6d28d9',
  colorViolet800: '#5b21b6',
  colorViolet900: '#4c1d95',
  colorViolet950: '#2e1065',
  colorPurple50: '#faf5ff',
  colorPurple100: '#f3e8ff',
  colorPurple200: '#e9d5ff',
  colorPurple300: '#d8b4fe',
  colorPurple400: '#c084fc',
  colorPurple500: '#a855f7',
  colorPurple600: '#9333ea',
  colorPurple700: '#7e22ce',
  colorPurple800: '#6b21a8',
  colorPurple900: '#581c87',
  colorPurple950: '#3b0764',
  colorFuchsia50: '#fdf4ff',
  colorFuchsia100: '#fae8ff',
  colorFuchsia200: '#f5d0fe',
  colorFuchsia300: '#f0abfc',
  colorFuchsia400: '#e879f9',
  colorFuchsia500: '#d946ef',
  colorFuchsia600: '#c026d3',
  colorFuchsia700: '#a21caf',
  colorFuchsia800: '#86198f',
  colorFuchsia900: '#701a75',
  colorFuchsia950: '#4a044e',
  colorPink50: '#fdf2f8',
  colorPink100: '#fce7f3',
  colorPink200: '#fbcfe8',
  colorPink300: '#f9a8d4',
  colorPink400: '#f472b6',
  colorPink500: '#ec4899',
  colorPink600: '#db2777',
  colorPink700: '#be185d',
  colorPink800: '#9d174d',
  colorPink900: '#831843',
  colorPink950: '#500724',
  colorRose50: '#fff1f2',
  colorRose100: '#ffe4e6',
  colorRose200: '#fecdd3',
  colorRose300: '#fda4af',
  colorRose400: '#fb7185',
  colorRose500: '#f43f5e',
  colorRose600: '#e11d48',
  colorRose700: '#be123c',
  colorRose800: '#9f1239',
  colorRose900: '#881337',
  colorRose950: '#4c0519',
};

export const THEME: ThemeType = {
  schema: 'light',
  // core background & text colors
  light: BASE_COLORS.colorNeutral0,
  dark: BASE_COLORS.colorSlate900,
  'bg-app': BASE_COLORS.colorNeutral50,
  'bg-surface': BASE_COLORS.colorNeutral0,
  'bg-muted': BASE_COLORS.colorNeutral100,
  'text-primary': BASE_COLORS.colorNeutral900,
  'text-secondary': BASE_COLORS.colorNeutral500,
  'text-disabled': BASE_COLORS.colorNeutral300,
  'text-inverse': BASE_COLORS.colorNeutral100,
  // borders & dividers
  'border-default': BASE_COLORS.colorNeutral200,
  'border-muted': BASE_COLORS.colorNeutral100,
  divider: BASE_COLORS.colorNeutral200,
  'focus-ring': BASE_COLORS.colorRose500,
  // primary actions
  'primary-bg': BASE_COLORS.colorRose500,
  'primary-hover-bg': BASE_COLORS.colorRose600,
  'primary-text': BASE_COLORS.colorNeutral50,
  'primary-hover-text': BASE_COLORS.colorNeutral50,
  'primary-disabled-bg': BASE_COLORS.colorRose300,
  'primary-disabled-text': BASE_COLORS.colorNeutral50,
  // Secondary / Ghost actions
  'secondary-bg': BASE_COLORS.colorNeutral100,
  'secondary-hover-bg': BASE_COLORS.colorNeutral200,
  'secondary-text': BASE_COLORS.colorNeutral900,
  'secondary-hover-text': BASE_COLORS.colorNeutral900,
  'secondary-disabled-bg': BASE_COLORS.colorNeutral100,
  'secondary-disabled-text': BASE_COLORS.colorNeutral400,
  'ghost-hover-bg': BASE_COLORS.colorNeutral100,
  // Links
  'link-default': BASE_COLORS.colorRose600,
  'link-hover': BASE_COLORS.colorRose700,
  'link-visited': BASE_COLORS.colorRose700,
  // Form elements
  'input-bg': BASE_COLORS.colorNeutral0,
  'input-border': BASE_COLORS.colorNeutral300,
  'input-focus-border': BASE_COLORS.colorRose500,
  'input-placeholder': BASE_COLORS.colorNeutral400,
  'input-text': BASE_COLORS.colorNeutral900,
  // Semantic colors (optional)
  'success-bg': BASE_COLORS.colorGreen100,
  'success-text': BASE_COLORS.colorGreen600,
  'error-bg': BASE_COLORS.colorRose100,
  'error-text': BASE_COLORS.colorRose600,
  'warning-bg': BASE_COLORS.colorYellow100,
  'warning-text': BASE_COLORS.colorYellow600,
  'info-bg': BASE_COLORS.colorBlue100,
  'info-text': BASE_COLORS.colorBlue600,
  // Overlays & elevation (optional)
  overlay: 'rgba(0, 0, 0, 0.15)',
  googleMapStyle: [
    {
      featureType: 'landscape.natural',
      elementType: 'geometry.fill',
      stylers: [
        {
          visibility: 'on',
        },
        {
          color: '#e0efef',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'geometry.fill',
      stylers: [
        {
          visibility: 'on',
        },
        {
          hue: '#1900ff',
        },
        {
          color: '#c0e8e8',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [
        {
          lightness: 100,
        },
        {
          visibility: 'simplified',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'labels',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'transit.line',
      elementType: 'geometry',
      stylers: [
        {
          visibility: 'on',
        },
        {
          lightness: 700,
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'all',
      stylers: [
        {
          color: '#7dcdcd',
        },
      ],
    },
  ],
};

export const DARK_THEME: ThemeType = {
  schema: 'dark',
  // core background & text colors
  light: BASE_COLORS.colorNeutral0,
  dark: BASE_COLORS.colorSlate900,
  'bg-app': BASE_COLORS.colorSlate950,
  'bg-surface': BASE_COLORS.colorSlate900,
  'bg-muted': BASE_COLORS.colorSlate800,
  'text-primary': BASE_COLORS.colorSlate100,
  'text-secondary': BASE_COLORS.colorSlate400,
  'text-disabled': BASE_COLORS.colorSlate700,
  'text-inverse': BASE_COLORS.colorSlate900,
  // borders & dividers
  'border-default': BASE_COLORS.colorSlate800,
  'border-muted': BASE_COLORS.colorSlate900,
  divider: BASE_COLORS.colorSlate800,
  'focus-ring': BASE_COLORS.colorRose400,
  // primary actions
  'primary-bg': BASE_COLORS.colorRose500,
  'primary-hover-bg': BASE_COLORS.colorRose400,
  'primary-text': BASE_COLORS.colorSlate100,
  'primary-hover-text': BASE_COLORS.colorSlate100,
  'primary-disabled-bg': BASE_COLORS.colorRose700,
  'primary-disabled-text': BASE_COLORS.colorSlate100,
  // Secondary / Ghost actions
  'secondary-bg': BASE_COLORS.colorSlate800,
  'secondary-hover-bg': BASE_COLORS.colorSlate700,
  'secondary-text': BASE_COLORS.colorSlate100,
  'secondary-hover-text': BASE_COLORS.colorSlate100,
  'secondary-disabled-bg': BASE_COLORS.colorSlate800,
  'secondary-disabled-text': BASE_COLORS.colorSlate600,
  'ghost-hover-bg': BASE_COLORS.colorSlate800,
  // Links
  'link-default': BASE_COLORS.colorRose400,
  'link-hover': BASE_COLORS.colorRose300,
  'link-visited': BASE_COLORS.colorRose500,
  // Form elements
  'input-bg': BASE_COLORS.colorSlate900,
  'input-border': BASE_COLORS.colorSlate700,
  'input-focus-border': BASE_COLORS.colorRose400,
  'input-placeholder': BASE_COLORS.colorSlate600,
  'input-text': BASE_COLORS.colorSlate100,
  // Semantic colors (optional)
  'success-bg': BASE_COLORS.colorGreen900,
  'success-text': BASE_COLORS.colorGreen400,
  'error-bg': BASE_COLORS.colorRose900,
  'error-text': BASE_COLORS.colorRose400,
  'warning-bg': BASE_COLORS.colorYellow900,
  'warning-text': BASE_COLORS.colorYellow400,
  'info-bg': BASE_COLORS.colorBlue900,
  'info-text': BASE_COLORS.colorBlue400,
  // Overlays & elevation (optional)
  overlay: 'rgba(255, 255, 255, 0.15)',
  googleMapStyle: [
    {
      featureType: 'all',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
    {
      featureType: 'all',
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#000000',
        },
        {
          lightness: 13,
        },
      ],
    },
    {
      featureType: 'administrative',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#000000',
        },
      ],
    },
    {
      featureType: 'administrative',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#144b53',
        },
        {
          lightness: 14,
        },
        {
          weight: 1.4,
        },
      ],
    },
    {
      featureType: 'landscape',
      elementType: 'all',
      stylers: [
        {
          color: '#08304b',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [
        {
          color: '#0c4152',
        },
        {
          lightness: 5,
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#000000',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#0b434f',
        },
        {
          lightness: 25,
        },
      ],
    },
    {
      featureType: 'road.arterial',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#000000',
        },
      ],
    },
    {
      featureType: 'road.arterial',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#0b3d51',
        },
        {
          lightness: 16,
        },
      ],
    },
    {
      featureType: 'road.local',
      elementType: 'geometry',
      stylers: [
        {
          color: '#000000',
        },
      ],
    },
    {
      featureType: 'transit',
      elementType: 'all',
      stylers: [
        {
          color: '#146474',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'all',
      stylers: [
        {
          color: '#021019',
        },
      ],
    },
  ],
};

export const RADIUS: {
  none: 0;
  xs: 2;
  sm: 4;
  md: 8;
  lg: 12;
  xl: 16;
  full: 999;
} = {
  none: 0,
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 999,
};

export const SPACING: {
  none: 0;
  xxs: 2;
  xs: 4;
  sm: 8;
  md: 12;
  lg: 16;
  xl: 24;
  '2xl': 32;
  '3xl': 48;
} = {
  none: 0,
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 32,
  '3xl': 48,
};

export const CONTAINER_GUTTER = SPACING.lg

export const FONT_WEIGHT: FontWeightType = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

export const FONT_FAMILY = {
  base: 'Rubik',
  handwrite: 'Lobster',
  mono: 'IBMPlexMono',
};

export const TYPOGRAPHY = {
  fontFamily: FONT_FAMILY,
  fontWeight: FONT_WEIGHT,
  textStyle: {
    h1: {
      fontSize: 26,
      lineHeight: 34,
      fontWeight: FONT_WEIGHT.bold,
    },
    h2: {
      fontSize: 22,
      lineHeight: 30,
      fontWeight: FONT_WEIGHT.semibold,
    },
    h3: {
      fontSize: 20,
      lineHeight: 28,
      fontWeight: FONT_WEIGHT.semibold,
    },
    h4: {
      fontSize: 18,
      lineHeight: 26,
      fontWeight: FONT_WEIGHT.medium,
    },
    large: {
      fontSize: 15,
      lineHeight: 23,
      fontWeight: FONT_WEIGHT.regular,
    },
    regular: {
      fontSize: 13,
      lineHeight: 20,
      fontWeight: FONT_WEIGHT.regular,
    },
    small: {
      fontSize: 11,
      lineHeight: 18,
      fontWeight: FONT_WEIGHT.light,
    },
    xsmall: {
      fontSize: 10,
      lineHeight: 16,
      fontWeight: FONT_WEIGHT.light,
    },
  },
};

export const PROVIDERS: {
  type: 'bank' | 'e-wallet';
  name:
    | 'BCA'
    | 'BNI'
    | 'BRI'
    | 'Mandiri'
    | 'BTN'
    | 'BSI'
    | 'BRK Syariah'
    | 'GoPay'
    | 'ShopeePay'
    | 'Dana';
  logo: {
    regular: any;
    white: any;
  };
}[] = [
  {
    type: 'bank',
    name: 'BCA',
    logo: {
      regular: require('../assets/images/providers/bca.webp'),
      white: require('../assets/images/providers/bca-white.webp'),
    },
  },
  {
    type: 'bank',
    name: 'BNI',
    logo: {
      regular: require('../assets/images/providers/bni.webp'),
      white: require('../assets/images/providers/bni-white.webp'),
    },
  },
  {
    type: 'bank',
    name: 'BRI',
    logo: {
      regular: require('../assets/images/providers/bri.webp'),
      white: require('../assets/images/providers/bri-white.webp'),
    },
  },
  {
    type: 'bank',
    name: 'Mandiri',
    logo: {
      regular: require('../assets/images/providers/mandiri.webp'),
      white: require('../assets/images/providers/mandiri-white.webp'),
    },
  },
  {
    type: 'bank',
    name: 'BTN',
    logo: {
      regular: require('../assets/images/providers/btn.webp'),
      white: require('../assets/images/providers/btn-white.webp'),
    },
  },
  {
    type: 'bank',
    name: 'BSI',
    logo: {
      regular: require('../assets/images/providers/bsi.webp'),
      white: require('../assets/images/providers/bsi-white.webp'),
    },
  },
  {
    type: 'bank',
    name: 'BRK Syariah',
    logo: {
      regular: require('../assets/images/providers/brk-syariah.webp'),
      white: require('../assets/images/providers/brk-syariah-white.webp'),
    },
  },
  {
    type: 'e-wallet',
    name: 'GoPay',
    logo: {
      regular: require('../assets/images/providers/gopay.webp'),
      white: require('../assets/images/providers/gopay-white.webp'),
    },
  },
  {
    type: 'e-wallet',
    name: 'ShopeePay',
    logo: {
      regular: require('../assets/images/providers/shopeepay.webp'),
      white: require('../assets/images/providers/shopeepay-white.webp'),
    },
  },
  {
    type: 'e-wallet',
    name: 'Dana',
    logo: {
      regular: require('../assets/images/providers/dana.webp'),
      white: require('../assets/images/providers/dana-white.webp'),
    },
  },
];
