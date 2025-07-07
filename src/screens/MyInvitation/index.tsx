import { JSX } from "react"
import ScreenLayout from "../../components/core/ScreenLayout"
import { TouchableHighlight, View } from "react-native"
import { COLORS, GUTTER_SPACE } from "../../constants"
import { useTheme } from "../../components/core/AppProvider"
import Typography from "../../components/core/Typography"
import Icon from "@react-native-vector-icons/material-icons"
import { useNavigation } from "@react-navigation/native"
import { NavigationProp } from "../../types/navigation-props"
import Button from "../../components/core/Button"
import Confirmation from "../../components/core/Confirmation"

export function InvitationCard(): JSX.Element {
  const theme = useTheme()
  const navigation = useNavigation<NavigationProp>()

  return (
    <>
      <TouchableHighlight underlayColor={theme.backgroundBasicColor4} onPress={() => {
        navigation.navigate('Invitation Detail', { invitationId: 1 })
      }} style={{ borderRadius: 8, overflow: 'hidden' }}>
        <View style={{ padding: GUTTER_SPACE, borderWidth: 1, borderColor: theme.borderBasicColor2, borderRadius: 8, backgroundColor: theme.backgroundBasicColor1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ borderColor: theme.colorPrimaryDefault, borderWidth: 2, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 }}>
              <Typography color={theme.colorPrimaryDefault} category="label">Template Gratis</Typography>
            </View>
          </View>
          <View style={{ flex: 1, marginTop: 18 }}>
            <Typography category="h6" style={{ fontWeight: '400' }}>John Doe & Jane Doe</Typography>
            <Typography color={theme.textHintColor} category='p2' style={{ marginTop: 4 }}>06/01/2025 05:11 PM</Typography>
          </View>
          <View style={{ flexDirection: 'row', gap: 16, marginTop: 24, flexWrap: 'wrap' }}>
            <Button appearance='basic' textStyle={{ fontSize: 13 }} style={{ paddingHorizontal: 12, paddingVertical: 6 }} onPress={() => {
              navigation.navigate('Manage Guest', { invitationId: 1 })
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="people" color={theme.textBasicColor} />
                <Typography style={{ marginLeft: 4, fontSize: 13 }} color={theme.textBasicColor}>Kelola Tamu</Typography>
              </View>
            </Button>
            <Confirmation mode="button" appearance="primary" buttonStyle={{ paddingHorizontal: 12, paddingVertical: 6 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="send" color={COLORS.colorBasic000} />
                <Typography style={{ marginLeft: 4, fontSize: 13 }} color={COLORS.colorBasic000}>Terbitkan</Typography>
              </View>
            </Confirmation>
          </View>
        </View>
      </TouchableHighlight>
    </>
  )
}

export default function MyInvitation(): JSX.Element {
  const theme = useTheme()
  return (
    <ScreenLayout title="Undangan Saya">
      <View style={{ gap: GUTTER_SPACE }}>
        <InvitationCard />
        <InvitationCard />
        <InvitationCard />
        <InvitationCard />
        <InvitationCard />
      </View>
    </ScreenLayout>
  )
}