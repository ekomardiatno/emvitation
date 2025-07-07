import { View, StatusBar, Platform, useWindowDimensions, ViewStyle, TextStyle, StyleProp } from "react-native"
import { useTheme } from "./AppProvider"
import { BORDER_RADIUS, GUTTER_SPACE } from "../../constants"
import Typography from "./Typography"
import Button, { ButtonAppearance } from "./Button"
import { JSX, useEffect, useState } from "react"
import EModal from "./EModal"

export default function Confirmation({ children, onCancel, onConfirmed, confirmText, cautionText, cancelText, cautionTitle, appearance, mode, visible, textStyle, buttonStyle }: {
  children?: string | JSX.Element
  onCancel?: () => void
  onConfirmed?: () => void
  cautionText?: string
  confirmText?: string
  cancelText?: string
  cautionTitle?: string
  appearance?: ButtonAppearance
  mode?: 'button' | 'alert',
  visible?: boolean
  buttonStyle?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
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
        <Button appearance={appearance} onPress={handleOpen} style={buttonStyle} textStyle={textStyle}>{children || 'Confirm'}</Button>
      }
      <EModal
        visible={isOpen}
        onClose={handleClose}
      >
        <View style={{ backgroundColor: theme.backgroundBasicColor1, padding: GUTTER_SPACE * 2, paddingBottom: GUTTER_SPACE, borderRadius: BORDER_RADIUS, width: width < height ? width - GUTTER_SPACE * 2 : height - GUTTER_SPACE * 2, marginBottom: (Platform.OS === 'ios' ? GUTTER_SPACE * 3 : StatusBar.currentHeight) }}>
          <Typography size={21} style={{ fontWeight: '700', textAlign: 'center' }} marginBottom={GUTTER_SPACE}>{cautionTitle || 'Anda yakin?'}</Typography>
          <Typography style={{ textAlign: 'center' }}>{cautionText || 'Tindakan ini tidak dapat dibatalkan.'}</Typography>
          <View style={{ paddingTop: GUTTER_SPACE * 2, gap: 5 }}>
            <Button appearance={appearance} onPress={handleConfirm}>{confirmText || 'Ya, saya yakin'}</Button>
            <Button appearance='transparent' onPress={handleClose}>{cancelText || 'Batalkan'}</Button>
          </View>
        </View>
      </EModal>
    </>
  )
}