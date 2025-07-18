
import { FontWeight } from "../components/core/Typography"

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

const BASE_COLORS = {
  colorSlate50: "#f8fafc",
  colorSlate100: "#f1f5f9",
  colorSlate200: "#e2e8f0",
  colorSlate300: "#cbd5e1",
  colorSlate400: "#94a3b8",
  colorSlate500: "#64748b",
  colorSlate600: "#475569",
  colorSlate700: "#334155",
  colorSlate800: "#1e293b",
  colorSlate900: "#0f172a",
  colorSlate950: "#020617",
  colorGray50: "#f9fafb",
  colorGray100: "#f3f4f6",
  colorGray200: "#e5e7eb",
  colorGray300: "#d1d5db",
  colorGray400: "#9ca3af",
  colorGray500: "#6b7280",
  colorGray600: "#4b5563",
  colorGray700: "#374151",
  colorGray800: "#1f2937",
  colorGray900: "#111827",
  colorGray950: "#030712",
  colorZinc50: "#fafafa",
  colorZinc100: "#f4f4f5",
  colorZinc200: "#e4e4e7",
  colorZinc300: "#d4d4d8",
  colorZinc400: "#a1a1aa",
  colorZinc500: "#71717a",
  colorZinc600: "#52525b",
  colorZinc700: "#3f3f46",
  colorZinc800: "#27272a",
  colorZinc900: "#18181b",
  colorZinc950: "#09090b",
  colorNeutral50: "#fafafa",
  colorNeutral100: "#f5f5f5",
  colorNeutral200: "#e5e5e5",
  colorNeutral300: "#d4d4d4",
  colorNeutral400: "#a3a3a3",
  colorNeutral500: "#737373",
  colorNeutral600: "#525252",
  colorNeutral700: "#404040",
  colorNeutral800: "#262626",
  colorNeutral900: "#171717",
  colorNeutral950: "#0a0a0a",
  colorStone50: "#fafaf9",
  colorStone100: "#f5f5f4",
  colorStone200: "#e7e5e4",
  colorStone300: "#d6d3d1",
  colorStone400: "#a8a29e",
  colorStone500: "#78716c",
  colorStone600: "#57534e",
  colorStone700: "#44403c",
  colorStone800: "#292524",
  colorStone900: "#1c1917",
  colorStone950: "#0c0a09",
  colorRed50: "#fef2f2",
  colorRed100: "#fee2e2",
  colorRed200: "#fecaca",
  colorRed300: "#fca5a5",
  colorRed400: "#f87171",
  colorRed500: "#ef4444",
  colorRed600: "#dc2626",
  colorRed700: "#b91c1c",
  colorRed800: "#991b1b",
  colorRed900: "#7f1d1d",
  colorRed950: "#450a0a",
  colorOrange50: "#fff7ed",
  colorOrange100: "#ffedd5",
  colorOrange200: "#fed7aa",
  colorOrange300: "#fdba74",
  colorOrange400: "#fb923c",
  colorOrange500: "#f97316",
  colorOrange600: "#ea580c",
  colorOrange700: "#c2410c",
  colorOrange800: "#9a3412",
  colorOrange900: "#7c2d12",
  colorOrange950: "#431407",
  colorAmber50: "#fffbeb",
  colorAmber100: "#fef3c7",
  colorAmber200: "#fde68a",
  colorAmber300: "#fcd34d",
  colorAmber400: "#fbbf24",
  colorAmber500: "#f59e0b",
  colorAmber600: "#d97706",
  colorAmber700: "#b45309",
  colorAmber800: "#92400e",
  colorAmber900: "#78350f",
  colorAmber950: "#451a03",
  colorYellow50: "#fefce8",
  colorYellow100: "#fef9c3",
  colorYellow200: "#fef08a",
  colorYellow300: "#fde047",
  colorYellow400: "#facc15",
  colorYellow500: "#eab308",
  colorYellow600: "#ca8a04",
  colorYellow700: "#a16207",
  colorYellow800: "#854d0e",
  colorYellow900: "#713f12",
  colorYellow950: "#422006",
  colorLime50: "#f7fee7",
  colorLime100: "#ecfccb",
  colorLime200: "#d9f99d",
  colorLime300: "#bef264",
  colorLime400: "#a3e635",
  colorLime500: "#84cc16",
  colorLime600: "#65a30d",
  colorLime700: "#4d7c0f",
  colorLime800: "#3f6212",
  colorLime900: "#365314",
  colorLime950: "#1a2e05",
  colorGreen50: "#f0fdf4",
  colorGreen100: "#dcfce7",
  colorGreen200: "#bbf7d0",
  colorGreen300: "#86efac",
  colorGreen400: "#4ade80",
  colorGreen500: "#22c55e",
  colorGreen600: "#16a34a",
  colorGreen700: "#15803d",
  colorGreen800: "#166534",
  colorGreen900: "#14532d",
  colorGreen950: "#052e16",
  colorEmerald50: "#ecfdf5",
  colorEmerald100: "#d1fae5",
  colorEmerald200: "#a7f3d0",
  colorEmerald300: "#6ee7b7",
  colorEmerald400: "#34d399",
  colorEmerald500: "#10b981",
  colorEmerald600: "#059669",
  colorEmerald700: "#047857",
  colorEmerald800: "#065f46",
  colorEmerald900: "#064e3b",
  colorEmerald950: "#022c22",
  colorTeal50: "#f0fdfa",
  colorTeal100: "#ccfbf1",
  colorTeal200: "#99f6e4",
  colorTeal300: "#5eead4",
  colorTeal400: "#2dd4bf",
  colorTeal500: "#14b8a6",
  colorTeal600: "#0d9488",
  colorTeal700: "#0f766e",
  colorTeal800: "#115e59",
  colorTeal900: "#134e4a",
  colorTeal950: "#042f2e",
  colorCyan50: "#ecfeff",
  colorCyan100: "#cffafe",
  colorCyan200: "#a5f3fc",
  colorCyan300: "#67e8f9",
  colorCyan400: "#22d3ee",
  colorCyan500: "#06b6d4",
  colorCyan600: "#0891b2",
  colorCyan700: "#0e7490",
  colorCyan800: "#155e75",
  colorCyan900: "#164e63",
  colorCyan950: "#083344",
  colorSky50: "#f0f9ff",
  colorSky100: "#e0f2fe",
  colorSky200: "#bae6fd",
  colorSky300: "#7dd3fc",
  colorSky400: "#38bdf8",
  colorSky500: "#0ea5e9",
  colorSky600: "#0284c7",
  colorSky700: "#0369a1",
  colorSky800: "#075985",
  colorSky900: "#0c4a6e",
  colorSky950: "#082f49",
  colorBlue50: "#eff6ff",
  colorBlue100: "#dbeafe",
  colorBlue200: "#bfdbfe",
  colorBlue300: "#93c5fd",
  colorBlue400: "#60a5fa",
  colorBlue500: "#3b82f6",
  colorBlue600: "#2563eb",
  colorBlue700: "#1d4ed8",
  colorBlue800: "#1e40af",
  colorBlue900: "#1e3a8a",
  colorBlue950: "#172554",
  colorIndigo50: "#eef2ff",
  colorIndigo100: "#e0e7ff",
  colorIndigo200: "#c7d2fe",
  colorIndigo300: "#a5b4fc",
  colorIndigo400: "#818cf8",
  colorIndigo500: "#6366f1",
  colorIndigo600: "#4f46e5",
  colorIndigo700: "#4338ca",
  colorIndigo800: "#3730a3",
  colorIndigo900: "#312e81",
  colorIndigo950: "#1e1b4b",
  colorViolet50: "#f5f3ff",
  colorViolet100: "#ede9fe",
  colorViolet200: "#ddd6fe",
  colorViolet300: "#c4b5fd",
  colorViolet400: "#a78bfa",
  colorViolet500: "#8b5cf6",
  colorViolet600: "#7c3aed",
  colorViolet700: "#6d28d9",
  colorViolet800: "#5b21b6",
  colorViolet900: "#4c1d95",
  colorViolet950: "#2e1065",
  colorPurple50: "#faf5ff",
  colorPurple100: "#f3e8ff",
  colorPurple200: "#e9d5ff",
  colorPurple300: "#d8b4fe",
  colorPurple400: "#c084fc",
  colorPurple500: "#a855f7",
  colorPurple600: "#9333ea",
  colorPurple700: "#7e22ce",
  colorPurple800: "#6b21a8",
  colorPurple900: "#581c87",
  colorPurple950: "#3b0764",
  colorFuchsia50: "#fdf4ff",
  colorFuchsia100: "#fae8ff",
  colorFuchsia200: "#f5d0fe",
  colorFuchsia300: "#f0abfc",
  colorFuchsia400: "#e879f9",
  colorFuchsia500: "#d946ef",
  colorFuchsia600: "#c026d3",
  colorFuchsia700: "#a21caf",
  colorFuchsia800: "#86198f",
  colorFuchsia900: "#701a75",
  colorFuchsia950: "#4a044e",
  colorPink50: "#fdf2f8",
  colorPink100: "#fce7f3",
  colorPink200: "#fbcfe8",
  colorPink300: "#f9a8d4",
  colorPink400: "#f472b6",
  colorPink500: "#ec4899",
  colorPink600: "#db2777",
  colorPink700: "#be185d",
  colorPink800: "#9d174d",
  colorPink900: "#831843",
  colorPink950: "#500724",
  colorRose50: "#fff1f2",
  colorRose100: "#ffe4e6",
  colorRose200: "#fecdd3",
  colorRose300: "#fda4af",
  colorRose400: "#fb7185",
  colorRose500: "#f43f5e",
  colorRose600: "#e11d48",
  colorRose700: "#be123c",
  colorRose800: "#9f1239",
  colorRose900: "#881337",
  colorRose950: "#4c0519",
}

export const COLORS = {
  ...BASE_COLORS,
  ...{
    colorPrimary100: BASE_COLORS.colorRose100,
    colorPrimary200: BASE_COLORS.colorRose200,
    colorPrimary300: BASE_COLORS.colorRose300,
    colorPrimary400: BASE_COLORS.colorRose400,
    colorPrimary500: BASE_COLORS.colorRose500,
    colorPrimary600: BASE_COLORS.colorRose600,
    colorPrimary700: BASE_COLORS.colorRose700,
    colorPrimary800: BASE_COLORS.colorRose800,
    colorPrimary900: BASE_COLORS.colorRose900,
  },

  colorPrimaryTransparent100: "rgba(190, 18, 60, 0.08)",
  colorPrimaryTransparent200: "rgba(190, 18, 60, 0.16)",
  colorPrimaryTransparent300: "rgba(190, 18, 60, 0.24)",
  colorPrimaryTransparent400: "rgba(190, 18, 60, 0.32)",
  colorPrimaryTransparent500: "rgba(190, 18, 60, 0.40)",
  colorPrimaryTransparent600: "rgba(190, 18, 60, 0.48)",
  colorPrimaryTransparent700: "rgba(190, 18, 60, 0.56)",
  colorPrimaryTransparent800: "rgba(190, 18, 60, 0.64)",
  colorPrimaryTransparent900: "rgba(190, 18, 60, 0.72)",

  ...{
    colorSuccess100: BASE_COLORS.colorGreen100,
    colorSuccess200: BASE_COLORS.colorGreen200,
    colorSuccess300: BASE_COLORS.colorGreen300,
    colorSuccess400: BASE_COLORS.colorGreen400,
    colorSuccess500: BASE_COLORS.colorGreen500,
    colorSuccess600: BASE_COLORS.colorGreen600,
    colorSuccess700: BASE_COLORS.colorGreen700,
    colorSuccess800: BASE_COLORS.colorGreen800,
    colorSuccess900: BASE_COLORS.colorGreen900,
  },

  colorSuccessTransparent100: "rgba(21, 128, 61, 0.08)",
  colorSuccessTransparent200: "rgba(21, 128, 61, 0.16)",
  colorSuccessTransparent300: "rgba(21, 128, 61, 0.24)",
  colorSuccessTransparent400: "rgba(21, 128, 61, 0.32)",
  colorSuccessTransparent500: "rgba(21, 128, 61, 0.40)",
  colorSuccessTransparent600: "rgba(21, 128, 61, 0.48)",
  colorSuccessTransparent700: "rgba(21, 128, 61, 0.56)",
  colorSuccessTransparent800: "rgba(21, 128, 61, 0.64)",
  colorSuccessTransparent900: "rgba(21, 128, 61, 0.72)",

  ...{
    colorInfo100: BASE_COLORS.colorSky100,
    colorInfo200: BASE_COLORS.colorSky200,
    colorInfo300: BASE_COLORS.colorSky300,
    colorInfo400: BASE_COLORS.colorSky400,
    colorInfo500: BASE_COLORS.colorSky500,
    colorInfo600: BASE_COLORS.colorSky600,
    colorInfo700: BASE_COLORS.colorSky700,
    colorInfo800: BASE_COLORS.colorSky800,
    colorInfo900: BASE_COLORS.colorSky900,
  },

  colorInfoTransparent100: "rgba(3, 105, 161, 0.08)",
  colorInfoTransparent200: "rgba(3, 105, 161, 0.16)",
  colorInfoTransparent300: "rgba(3, 105, 161, 0.24)",
  colorInfoTransparent400: "rgba(3, 105, 161, 0.32)",
  colorInfoTransparent500: "rgba(3, 105, 161, 0.40)",
  colorInfoTransparent600: "rgba(3, 105, 161, 0.48)",
  colorInfoTransparent700: "rgba(3, 105, 161, 0.56)",
  colorInfoTransparent800: "rgba(3, 105, 161, 0.64)",
  colorInfoTransparent900: "rgba(3, 105, 161, 0.72)",

  ...{
    colorWarning100: BASE_COLORS.colorAmber100,
    colorWarning200: BASE_COLORS.colorAmber200,
    colorWarning300: BASE_COLORS.colorAmber300,
    colorWarning400: BASE_COLORS.colorAmber400,
    colorWarning500: BASE_COLORS.colorAmber500,
    colorWarning600: BASE_COLORS.colorAmber600,
    colorWarning700: BASE_COLORS.colorAmber700,
    colorWarning800: BASE_COLORS.colorAmber800,
    colorWarning900: BASE_COLORS.colorAmber900,
  },

  colorWarningTransparent100: "rgba(180, 83, 9, 0.08)",
  colorWarningTransparent200: "rgba(180, 83, 9, 0.16)",
  colorWarningTransparent300: "rgba(180, 83, 9, 0.24)",
  colorWarningTransparent400: "rgba(180, 83, 9, 0.32)",
  colorWarningTransparent500: "rgba(180, 83, 9, 0.40)",
  colorWarningTransparent600: "rgba(180, 83, 9, 0.48)",
  colorWarningTransparent700: "rgba(180, 83, 9, 0.56)",
  colorWarningTransparent800: "rgba(180, 83, 9, 0.64)",
  colorWarningTransparent900: "rgba(180, 83, 9, 0.72)",

  ...{
    colorDanger100: BASE_COLORS.colorRed100,
    colorDanger200: BASE_COLORS.colorRed200,
    colorDanger300: BASE_COLORS.colorRed300,
    colorDanger400: BASE_COLORS.colorRed400,
    colorDanger500: BASE_COLORS.colorRed500,
    colorDanger600: BASE_COLORS.colorRed600,
    colorDanger700: BASE_COLORS.colorRed700,
    colorDanger800: BASE_COLORS.colorRed800,
    colorDanger900: BASE_COLORS.colorRed900,
  },

  colorDangerTransparent100: "rgba(185, 28, 28, 0.08)",
  colorDangerTransparent200: "rgba(185, 28, 28, 0.16)",
  colorDangerTransparent300: "rgba(185, 28, 28, 0.24)",
  colorDangerTransparent400: "rgba(185, 28, 28, 0.32)",
  colorDangerTransparent500: "rgba(185, 28, 28, 0.40)",
  colorDangerTransparent600: "rgba(185, 28, 28, 0.48)",
  colorDangerTransparent700: "rgba(185, 28, 28, 0.56)",
  colorDangerTransparent800: "rgba(185, 28, 28, 0.64)",
  colorDangerTransparent900: "rgba(185, 28, 28, 0.72)",

  colorBasic000: BASE_COLORS.colorGray50,
  colorBasic100: BASE_COLORS.colorGray100,
  colorBasic200: BASE_COLORS.colorGray200,
  colorBasic300: BASE_COLORS.colorGray300,
  colorBasic400: BASE_COLORS.colorGray400,
  colorBasic500: BASE_COLORS.colorGray500,
  colorBasic600: BASE_COLORS.colorGray600,
  colorBasic700: BASE_COLORS.colorGray700,
  colorBasic800: BASE_COLORS.colorGray800,
  colorBasic900: BASE_COLORS.colorGray900,
  colorBasic1000: BASE_COLORS.colorGray950,

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

  backgroundBasicColor0: COLORS.colorBasic100,
  backgroundBasicColor1: COLORS.colorBasic000,
  backgroundBasicColor2: COLORS.colorBasic100,
  backgroundBasicColor3: COLORS.colorBasic200,
  backgroundBasicColor4: COLORS.colorBasic300,

  backgroundAlternativeColor1: COLORS.colorBasic1000,
  backgroundAlternativeColor2: COLORS.colorBasic900,
  backgroundAlternativeColor3: COLORS.colorBasic800,
  backgroundAlternativeColor4: COLORS.colorBasic700,
  backgroundAlternativeColor5: COLORS.colorBasic600,

  borderBasicColor0: COLORS.colorBasic300,
  borderBasicColor1: COLORS.colorBasic200,
  borderBasicColor2: COLORS.colorBasic300,
  borderBasicColor3: COLORS.colorBasic400,
  borderBasicColor4: COLORS.colorBasic500,
  borderBasicColor5: COLORS.colorBasic600,

  borderAlternativeColor1: COLORS.colorBasic900,
  borderAlternativeColor2: COLORS.colorBasic1000,
  borderAlternativeColor3: COLORS.colorBasic900,
  borderAlternativeColor4: COLORS.colorBasic800,
  borderAlternativeColor5: COLORS.colorBasic700,

  backgroundPrimaryColor1: COLORS.colorPrimary100,
  backgroundPrimaryColor2: COLORS.colorPrimary200,
  backgroundPrimaryColor3: COLORS.colorPrimary300,
  backgroundPrimaryColor4: COLORS.colorPrimary400,
  backgroundPrimaryColor5: COLORS.colorPrimary500,
  backgroundPrimaryColor6: COLORS.colorPrimary600,
  backgroundPrimaryColor7: COLORS.colorPrimary700,

  backgroundSecondaryColor1: COLORS.colorSky100,
  backgroundSecondaryColor2: COLORS.colorSky200,
  backgroundSecondaryColor3: COLORS.colorSky300,
  backgroundSecondaryColor4: COLORS.colorSky400,
  backgroundSecondaryColor5: COLORS.colorSky500,
  backgroundSecondaryColor6: COLORS.colorSky600,
  backgroundSecondaryColor7: COLORS.colorSky700,

  backgroundSuccessColor1: COLORS.colorSuccess100,
  backgroundSuccessColor2: COLORS.colorSuccess200,
  backgroundSuccessColor3: COLORS.colorSuccess300,
  backgroundSuccessColor4: COLORS.colorSuccess400,
  backgroundSuccessColor5: COLORS.colorSuccess500,
  backgroundSuccessColor6: COLORS.colorSuccess600,
  backgroundSuccessColor7: COLORS.colorSuccess700,

  backgroundInfoColor1: COLORS.colorInfo100,
  backgroundInfoColor2: COLORS.colorInfo200,
  backgroundInfoColor3: COLORS.colorInfo300,
  backgroundInfoColor4: COLORS.colorInfo400,
  backgroundInfoColor5: COLORS.colorInfo500,
  backgroundInfoColor6: COLORS.colorInfo600,
  backgroundInfoColor7: COLORS.colorInfo700,

  backgroundWarningColor1: COLORS.colorWarning100,
  backgroundWarningColor2: COLORS.colorWarning200,
  backgroundWarningColor3: COLORS.colorWarning300,
  backgroundWarningColor4: COLORS.colorWarning400,
  backgroundWarningColor5: COLORS.colorWarning500,
  backgroundWarningColor6: COLORS.colorWarning600,
  backgroundWarningColor7: COLORS.colorWarning700,

  backgroundDangerColor1: COLORS.colorDanger100,
  backgroundDangerColor2: COLORS.colorDanger200,
  backgroundDangerColor3: COLORS.colorDanger300,
  backgroundDangerColor4: COLORS.colorDanger400,
  backgroundDangerColor5: COLORS.colorDanger500,
  backgroundDangerColor6: COLORS.colorDanger600,
  backgroundDangerColor7: COLORS.colorDanger700,

  borderPrimaryColor1: COLORS.colorPrimary200,
  borderPrimaryColor2: COLORS.colorPrimary300,
  borderPrimaryColor3: COLORS.colorPrimary400,
  borderPrimaryColor4: COLORS.colorPrimary500,
  borderPrimaryColor5: COLORS.colorPrimary600,
  borderPrimaryColor6: COLORS.colorPrimary700,
  borderPrimaryColor7: COLORS.colorPrimary800,
  borderPrimaryColor8: COLORS.colorPrimary900,

  borderSecondaryColor1: COLORS.colorSky200,
  borderSecondaryColor2: COLORS.colorSky300,
  borderSecondaryColor3: COLORS.colorSky400,
  borderSecondaryColor4: COLORS.colorSky500,
  borderSecondaryColor5: COLORS.colorSky600,
  borderSecondaryColor6: COLORS.colorSky700,
  borderSecondaryColor7: COLORS.colorSky800,
  borderSecondaryColor8: COLORS.colorSky900,

  borderSuccessColor1: COLORS.colorSuccess200,
  borderSuccessColor2: COLORS.colorSuccess300,
  borderSuccessColor3: COLORS.colorSuccess400,
  borderSuccessColor4: COLORS.colorSuccess500,
  borderSuccessColor5: COLORS.colorSuccess600,
  borderSuccessColor6: COLORS.colorSuccess700,
  borderSuccessColor7: COLORS.colorSuccess800,
  borderSuccessColor8: COLORS.colorSuccess900,

  borderInfoColor1: COLORS.colorInfo200,
  borderInfoColor2: COLORS.colorInfo300,
  borderInfoColor3: COLORS.colorInfo400,
  borderInfoColor4: COLORS.colorInfo500,
  borderInfoColor5: COLORS.colorInfo600,
  borderInfoColor6: COLORS.colorInfo700,
  borderInfoColor7: COLORS.colorInfo800,
  borderInfoColor8: COLORS.colorInfo900,

  borderWarningColor1: COLORS.colorWarning200,
  borderWarningColor2: COLORS.colorWarning300,
  borderWarningColor3: COLORS.colorWarning400,
  borderWarningColor4: COLORS.colorWarning500,
  borderWarningColor5: COLORS.colorWarning600,
  borderWarningColor6: COLORS.colorWarning700,
  borderWarningColor7: COLORS.colorWarning800,
  borderWarningColor8: COLORS.colorWarning900,

  borderDangerColor1: COLORS.colorDanger200,
  borderDangerColor2: COLORS.colorDanger300,
  borderDangerColor3: COLORS.colorDanger400,
  borderDangerColor4: COLORS.colorDanger500,
  borderDangerColor5: COLORS.colorDanger600,
  borderDangerColor6: COLORS.colorDanger700,
  borderDangerColor7: COLORS.colorDanger800,
  borderDangerColor8: COLORS.colorDanger900,

  textBasicColor: COLORS.colorBasic900,
  textAlternateColor: COLORS.colorBasic100,
  textControlColor: COLORS.colorBasic100,
  textDisabledColor: COLORS.colorBasic300,
  textHintColor: COLORS.colorBasic400,
  textSecondaryColor: COLORS.colorBasic600,
  textMutedColor: COLORS.colorBasic500,

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
  backgroundModalBackdropColor: 'rgba(0,0,0,.25)',
  googleMapStyle: [
    {
      "featureType": "landscape.natural",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "visibility": "on"
        },
        {
          "color": "#e0efef"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "visibility": "on"
        },
        {
          "hue": "#1900ff"
        },
        {
          "color": "#c0e8e8"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "lightness": 100
        },
        {
          "visibility": "simplified"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
        {
          "visibility": "on"
        },
        {
          "lightness": 700
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "all",
      "stylers": [
        {
          "color": "#7dcdcd"
        }
      ]
    }
  ]
}

export const DARK_THEME = {
  backgroundBasicColor0: COLORS.colorBasic1000,
  backgroundBasicColor1: COLORS.colorBasic900,
  backgroundBasicColor2: COLORS.colorBasic800,
  backgroundBasicColor3: COLORS.colorBasic700,
  backgroundBasicColor4: COLORS.colorBasic600,

  backgroundAlternativeColor1: COLORS.colorBasic100,
  backgroundAlternativeColor2: COLORS.colorBasic200,
  backgroundAlternativeColor3: COLORS.colorBasic300,
  backgroundAlternativeColor4: COLORS.colorBasic400,
  backgroundAlternativeColor5: COLORS.colorBasic500,

  borderBasicColor0: COLORS.colorBasic900,
  borderBasicColor1: COLORS.colorBasic800,
  borderBasicColor2: COLORS.colorBasic700,
  borderBasicColor3: COLORS.colorBasic600,
  borderBasicColor4: COLORS.colorBasic500,
  borderBasicColor5: COLORS.colorBasic400,

  borderAlternativeColor1: COLORS.colorBasic100,
  borderAlternativeColor2: COLORS.colorBasic200,
  borderAlternativeColor3: COLORS.colorBasic300,
  borderAlternativeColor4: COLORS.colorBasic400,
  borderAlternativeColor5: COLORS.colorBasic500,

  textBasicColor: COLORS.colorBasic100,
  textAlternateColor: COLORS.colorBasic900,
  textDisabledColor: COLORS.colorBasic700,
  textHintColor: COLORS.colorBasic600,
  textSecondaryColor: COLORS.colorBasic400,
  textMutedColor: COLORS.colorBasic500,

  backgroundPrimaryColor1: COLORS.colorPrimary900,
  backgroundPrimaryColor2: COLORS.colorPrimary800,
  backgroundPrimaryColor3: COLORS.colorPrimary700,
  backgroundPrimaryColor4: COLORS.colorPrimary600,
  backgroundPrimaryColor5: COLORS.colorPrimary500,
  backgroundPrimaryColor6: COLORS.colorPrimary400,
  backgroundPrimaryColor7: COLORS.colorPrimary300,

  backgroundSecondaryColor1: COLORS.colorSky900,
  backgroundSecondaryColor2: COLORS.colorSky800,
  backgroundSecondaryColor3: COLORS.colorSky700,
  backgroundSecondaryColor4: COLORS.colorSky600,
  backgroundSecondaryColor5: COLORS.colorSky500,
  backgroundSecondaryColor6: COLORS.colorSky400,
  backgroundSecondaryColor7: COLORS.colorSky300,

  backgroundSuccessColor1: COLORS.colorSuccess900,
  backgroundSuccessColor2: COLORS.colorSuccess800,
  backgroundSuccessColor3: COLORS.colorSuccess700,
  backgroundSuccessColor4: COLORS.colorSuccess600,
  backgroundSuccessColor5: COLORS.colorSuccess500,
  backgroundSuccessColor6: COLORS.colorSuccess400,
  backgroundSuccessColor7: COLORS.colorSuccess300,

  backgroundInfoColor1: COLORS.colorInfo900,
  backgroundInfoColor2: COLORS.colorInfo800,
  backgroundInfoColor3: COLORS.colorInfo700,
  backgroundInfoColor4: COLORS.colorInfo600,
  backgroundInfoColor5: COLORS.colorInfo500,
  backgroundInfoColor6: COLORS.colorInfo400,
  backgroundInfoColor7: COLORS.colorInfo300,

  backgroundWarningColor1: COLORS.colorWarning900,
  backgroundWarningColor2: COLORS.colorWarning800,
  backgroundWarningColor3: COLORS.colorWarning700,
  backgroundWarningColor4: COLORS.colorWarning600,
  backgroundWarningColor5: COLORS.colorWarning500,
  backgroundWarningColor6: COLORS.colorWarning400,
  backgroundWarningColor7: COLORS.colorWarning300,

  backgroundDangerColor1: COLORS.colorDanger900,
  backgroundDangerColor2: COLORS.colorDanger800,
  backgroundDangerColor3: COLORS.colorDanger700,
  backgroundDangerColor4: COLORS.colorDanger600,
  backgroundDangerColor5: COLORS.colorDanger500,
  backgroundDangerColor6: COLORS.colorDanger400,
  backgroundDangerColor7: COLORS.colorDanger300,

  borderPrimaryColor1: COLORS.colorPrimary800,
  borderPrimaryColor2: COLORS.colorPrimary700,
  borderPrimaryColor3: COLORS.colorPrimary600,
  borderPrimaryColor4: COLORS.colorPrimary500,
  borderPrimaryColor5: COLORS.colorPrimary400,
  borderPrimaryColor6: COLORS.colorPrimary300,
  borderPrimaryColor7: COLORS.colorPrimary200,
  borderPrimaryColor8: COLORS.colorPrimary100,

  borderSecondaryColor1: COLORS.colorSky800,
  borderSecondaryColor2: COLORS.colorSky700,
  borderSecondaryColor3: COLORS.colorSky600,
  borderSecondaryColor4: COLORS.colorSky500,
  borderSecondaryColor5: COLORS.colorSky400,
  borderSecondaryColor6: COLORS.colorSky300,
  borderSecondaryColor7: COLORS.colorSky200,
  borderSecondaryColor8: COLORS.colorSky100,

  borderSuccessColor1: COLORS.colorSuccess800,
  borderSuccessColor2: COLORS.colorSuccess700,
  borderSuccessColor3: COLORS.colorSuccess600,
  borderSuccessColor4: COLORS.colorSuccess500,
  borderSuccessColor5: COLORS.colorSuccess400,
  borderSuccessColor6: COLORS.colorSuccess300,
  borderSuccessColor7: COLORS.colorSuccess200,
  borderSuccessColor8: COLORS.colorSuccess100,

  borderInfoColor1: COLORS.colorInfo800,
  borderInfoColor2: COLORS.colorInfo700,
  borderInfoColor3: COLORS.colorInfo600,
  borderInfoColor4: COLORS.colorInfo500,
  borderInfoColor5: COLORS.colorInfo400,
  borderInfoColor6: COLORS.colorInfo300,
  borderInfoColor7: COLORS.colorInfo200,
  borderInfoColor8: COLORS.colorInfo100,

  borderWarningColor1: COLORS.colorWarning800,
  borderWarningColor2: COLORS.colorWarning700,
  borderWarningColor3: COLORS.colorWarning600,
  borderWarningColor4: COLORS.colorWarning500,
  borderWarningColor5: COLORS.colorWarning400,
  borderWarningColor6: COLORS.colorWarning300,
  borderWarningColor7: COLORS.colorWarning200,
  borderWarningColor8: COLORS.colorWarning100,

  borderDangerColor1: COLORS.colorDanger800,
  borderDangerColor2: COLORS.colorDanger700,
  borderDangerColor3: COLORS.colorDanger600,
  borderDangerColor4: COLORS.colorDanger500,
  borderDangerColor5: COLORS.colorDanger400,
  borderDangerColor6: COLORS.colorDanger300,
  borderDangerColor7: COLORS.colorDanger200,
  borderDangerColor8: COLORS.colorDanger100,

  outlineColor: COLORS.colorBasic700,
  backgroundModalBackdropColor: 'rgba(255,255,255, .05)',
  googleMapStyle: [
    {
      "featureType": "all",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#ffffff"
        }
      ]
    },
    {
      "featureType": "all",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#000000"
        },
        {
          "lightness": 13
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#000000"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#144b53"
        },
        {
          "lightness": 14
        },
        {
          "weight": 1.4
        }
      ]
    },
    {
      "featureType": "landscape",
      "elementType": "all",
      "stylers": [
        {
          "color": "#08304b"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#0c4152"
        },
        {
          "lightness": 5
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#000000"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#0b434f"
        },
        {
          "lightness": 25
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#000000"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#0b3d51"
        },
        {
          "lightness": 16
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#000000"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "all",
      "stylers": [
        {
          "color": "#146474"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "all",
      "stylers": [
        {
          "color": "#021019"
        }
      ]
    }
  ]
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