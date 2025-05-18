import { JSX } from "react"
import Typography from "./Typography"
import { useTheme } from "./AppProvider"
import { ToastAndroid, TouchableOpacity } from "react-native"
export default function FieldLabel({ required, label }: {
  required?: boolean
  label: string
}): JSX.Element {
  const theme = useTheme()
  return (
    <TouchableOpacity activeOpacity={1} onPress={() => {
      ToastAndroid.show(`${label}${required ? ' *' : ''}`, 1000)
    }}>
      <Typography category='label' style={{ marginBottom: 6 }} numberOfLines={1}>{label}{required && <Typography category='label' color={theme.textDangerColor}> *</Typography>}</Typography>
    </TouchableOpacity>
  )
}