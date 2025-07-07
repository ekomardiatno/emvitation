import { JSX } from "react"
import ScreenLayout from "../components/core/ScreenLayout"
import { BORDER_RADIUS, GUTTER_SPACE } from "../constants"
import { useWindowDimensions, View } from "react-native"
import { useTheme } from "../components/core/AppProvider"
import { RouteProp, useNavigation } from "@react-navigation/native"
import { PlatformPressable } from "@react-navigation/elements"
import { NavigationProp, RouteNavigationParamList } from "../types/navigation-props"
import Icon from "@react-native-vector-icons/material-icons"

type TemplateRouteProp = RouteProp<RouteNavigationParamList, 'Template'>

export default function Template({ route }: {
  route?: TemplateRouteProp
}): JSX.Element {
  const theme = useTheme()
  const { width } = useWindowDimensions()
  const navigation = useNavigation<NavigationProp>()

  return (
    <ScreenLayout title={`${route?.params?.action === 'select' ? 'Pilih ' : ''} Template`} longerTitle={`${route?.params?.action === 'select' ? 'Pilih ' : ''} Template`}>
      <View style={{ flexDirection: 'row', gap: 10, flexWrap: 'wrap' }}>
        <PlatformPressable onPress={() => {
          if (route?.params?.action === 'select') {
            const id = 1
            if (route?.params?.onSelected) {
              route.params.onSelected(id)
            }
            navigation.goBack()
          }
        }} style={{ height: ((width - GUTTER_SPACE * 2 - 10) / 2) / 3 * 4, width: (width - GUTTER_SPACE * 2 - 10) / 2, backgroundColor: theme.backgroundBasicColor1, alignItems: 'center', justifyContent: 'center', borderRadius: BORDER_RADIUS, overflow: 'hidden' }}>
          <Icon name="hide-image" color={theme.backgroundBasicColor3} size={(width - GUTTER_SPACE * 2 - 10) / 4} />
        </PlatformPressable>
      </View>
    </ScreenLayout>
  )
}