import { View, StatusBar, Platform, useWindowDimensions } from "react-native"
import { useTheme } from "./AppProvider"
import { BORDER_RADIUS, BORDER_WIDTH, GUTTER_SPACE } from "../../constants"
import Typography from "./Typography"
import Button, { ButtonAppearance } from "./Button"
import { JSX, useEffect, useState } from "react"
import EModal from "./EModal"

export default function Confirmation({ children, onCancel, onConfirmed, confirmText, cautionText, cancelText, cautionTitle, appearance, mode, visible }: {
  children?: string | JSX.Element
  onCancel?: () => void
  onConfirmed: () => void
  cautionText?: string
  confirmText?: string
  cancelText?: string
  cautionTitle?: string
  appearance?: ButtonAppearance
  mode?: 'button' | 'alert',
  visible?: boolean
}): JSX.Element {
  const theme = useTheme()
  const { width, height } = useWindowDimensions()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (visible !== undefined) {
      setIsOpen(visible)
    }
  }, [visible])

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
    if (onCancel) onCancel()
  }

  const handleConfirm = () => {
    setIsOpen(false)
    if (onConfirmed) onConfirmed()
  }

  return (
    <>
      {
        (mode === 'button') &&
        <Button appearance={appearance} onPress={handleOpen}>{children || 'Confirm'}</Button>
      }
      <EModal
        visible={isOpen}
        onClose={handleClose}
      >
        <View style={{ alignItems: 'center' }}>
          <View style={{ backgroundColor: theme.backgroundBasicColor1, padding: GUTTER_SPACE * 2, paddingBottom: GUTTER_SPACE, borderWidth: BORDER_WIDTH, borderRadius: BORDER_RADIUS, borderColor: theme.borderBasicColor3, width: width < height ? width - GUTTER_SPACE * 2 : height - GUTTER_SPACE * 2, marginBottom: (Platform.OS === 'ios' ? GUTTER_SPACE * 3 : StatusBar.currentHeight) }}>
            <Typography size={21} style={{ fontWeight: '700', textAlign: 'center' }} marginBottom={GUTTER_SPACE}>{cautionTitle || 'Are you sure?'}</Typography>
            <Typography style={{ textAlign: 'center' }}>{cautionText || 'Are you sure to proceed this?'}</Typography>
            <View style={{ paddingTop: GUTTER_SPACE * 2, gap: 5 }}>
              <Button appearance={appearance} onPress={handleConfirm}>{confirmText || 'OK'}</Button>
              <Button appearance='transparent' onPress={handleClose}>{cancelText || 'Cancel'}</Button>
            </View>
          </View>
        </View>
      </EModal>
    </>
  )
}