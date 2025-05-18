import { View, StatusBar, Platform } from "react-native"
import { useTheme } from "./AppProvider"
import { BORDER_RADIUS, BORDER_WIDTH, GUTTER_SPACE } from "../../constants"
import Typography from "./Typography"
import Button, { ButtonAppearance } from "./Button"
import { JSX } from "react"
import EModal from "./EModal"
import { useSafeAreaFrame } from "react-native-safe-area-context"

export default function Confirmation({ onCancel, onConfirmed, confirmText, cautionText, cancelText, cautionTitle, appearance, visible }: {
  onCancel: () => void
  onConfirmed: () => void
  cautionText?: string
  confirmText?: string
  cancelText?: string
  cautionTitle?: string
  visible: boolean
  appearance?: ButtonAppearance
}): JSX.Element {
  const theme = useTheme()
  const { width, height } = useSafeAreaFrame()

  return (
    <EModal
      visible={visible}
      onClose={onCancel}
    >
      <View style={{ alignItems: 'center' }}>
        <View style={{ backgroundColor: theme.backgroundBasicColor1, padding: GUTTER_SPACE * 2, paddingBottom: GUTTER_SPACE, borderWidth: BORDER_WIDTH, borderRadius: BORDER_RADIUS, borderColor: theme.borderBasicColor3, width: width < height ? width - GUTTER_SPACE * 2 : height - GUTTER_SPACE * 2, marginBottom: (Platform.OS === 'ios' ? GUTTER_SPACE * 3 : StatusBar.currentHeight) }}>
          <Typography size={21} style={{ fontWeight: '700', textAlign: 'center' }} marginBottom={GUTTER_SPACE}>{cautionTitle || 'Are you sure?'}</Typography>
          <Typography style={{ textAlign: 'center' }}>{cautionText || 'Are you sure to proceed this?'}</Typography>
          <View style={{ paddingTop: GUTTER_SPACE * 2, gap: 5 }}>
            <Button appearance={appearance} onPress={onConfirmed}>{confirmText || 'Ok'}</Button>
            <Button appearance='transparent' onPress={onCancel}>{cancelText || 'Cancel'}</Button>
          </View>
        </View>
      </View>
    </EModal>
  )
}