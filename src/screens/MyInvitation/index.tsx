import { JSX } from "react"
import ScreenLayout from "../../components/core/ScreenLayout"
import { TouchableHighlight, View } from "react-native"
import { GUTTER_SPACE } from "../../constants"
import { useTheme } from "../../components/core/AppProvider"
import Typography from "../../components/core/Typography"
import Icon from "@react-native-vector-icons/material-icons"
import { useNavigation } from "@react-navigation/native"
import { NavigationProp } from "../../types/navigation-props"

export function InvitationCard(): JSX.Element {
  const theme = useTheme()
  const navigation = useNavigation<NavigationProp>()
  return (
    <TouchableHighlight underlayColor={theme.backgroundBasicColor4} onPress={() => {
      navigation.navigate('Invitation Detail', { invitationId: 1 })
    }} style={{ borderRadius: 8, overflow: 'hidden' }}>
      <View style={{ padding: GUTTER_SPACE, borderWidth: 1, borderColor: theme.borderBasicColor3, borderRadius: 8, backgroundColor: theme.backgroundBasicColor2 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ borderColor: theme.colorPrimaryDefault, borderWidth: 2, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 }}>
            <Typography color={theme.colorPrimaryDefault} category="label">Template Gratis</Typography>
          </View>
        </View>
        <View style={{ flex: 1, marginTop: 10 }}>
          <Typography style={{ fontSize: 18, fontWeight: 'bold' }}>John Doe <Icon name='close' color={theme.textHintColor} /> Jane Doe</Typography>
          <Typography color={theme.textHintColor} category='p2' style={{ marginTop: 5 }}>06/01/2025 05:11 PM</Typography>
        </View>
      </View>
    </TouchableHighlight>
  )
}

export default function MyInvitation(): JSX.Element {
  const theme = useTheme()
  return (
    <ScreenLayout title="Undangan Saya">
      <View style={{ padding: GUTTER_SPACE, gap: GUTTER_SPACE }}>
        <InvitationCard />
      </View>
    </ScreenLayout>
  )
}