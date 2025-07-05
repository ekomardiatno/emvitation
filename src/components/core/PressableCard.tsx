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
    <View style={{ justifyContent: 'space-between', gap: 5, padding: GUTTER_SPACE * 2, paddingHorizontal: GUTTER_SPACE, backgroundColor: theme.backgroundBasicColor0, borderRadius: BORDER_RADIUS, width: '100%', overflow: 'hidden' }}>
      <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', height: (width - GUTTER_SPACE * 2) * .5 }}>
        <View style={{ width: 100, height: 100, borderRadius: 100, backgroundColor: theme.backgroundBasicColor1, alignItems: 'center', justifyContent: 'center', marginBottom: GUTTER_SPACE }}>
          <Icon name={iconName} color={theme.textBasicColor} size={50} />
        </View>
        <Typography numberOfLines={2}>{title}</Typography>
      </View>
      {shotDescription && (
        <View>
          <Typography category='p2' color={theme.textHintColor} numberOfLines={2}>{shotDescription}</Typography>
        </View>
      )}
      <PlatformPressable pressColor={theme.backgroundBasicColor1} style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }} onPress={onPress}>
        <View></View>
      </PlatformPressable>
    </View>
  )
}