import Icon from "@react-native-vector-icons/material-icons"
import { JSX } from "react"
import { GestureResponderEvent, useWindowDimensions, View } from "react-native"
import Typography from "./Typography"
import { BORDER_RADIUS, GUTTER_SPACE } from "../../constants"
import { useTheme } from "./AppProvider"
import { MasterialIconsType } from "../../types/material-icons"
import { PlatformPressable } from "@react-navigation/elements"

export default function PressableCard({ title, iconName, shotDescription, onPress }: {
  title: string
  iconName: MasterialIconsType
  shotDescription?: string
  onPress?: ((e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | GestureResponderEvent) => void)
}): JSX.Element {
  const theme = useTheme()
  const { width } = useWindowDimensions()
  return (
    <PlatformPressable style={{ backgroundColor: theme.backgroundBasicColor2, borderRadius: BORDER_RADIUS, padding: GUTTER_SPACE, flexBasis: (width - GUTTER_SPACE * 2 - 10) / 2, justifyContent: 'space-between', gap: 5 }} onPress={onPress}>
      <View>
        <Icon name={iconName} color={theme.textBasicColor} size={38} style={{ marginBottom: 10 }} />
        <Typography numberOfLines={2}>{title}</Typography>
      </View>
      {
        shotDescription &&
        <View>
          <Typography category='p2' color={theme.textHintColor} numberOfLines={2}>{shotDescription}</Typography>
        </View>
      }
    </PlatformPressable>
  )
}