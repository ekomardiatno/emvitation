import { TouchableOpacity, View } from "react-native"
import ScreenLayout from "../../components/core/ScreenLayout"
import { COLORS, GUTTER_SPACE } from "../../constants"
import { useTheme } from "../../components/core/AppProvider"
import { JSX } from "react"
import Typography from "../../components/core/Typography"
import Icon from "@react-native-vector-icons/material-icons"
import EventCard from "./EventCard"

export default function InvitationDetail(): JSX.Element {
  const theme = useTheme()
  return (
    <ScreenLayout title="Detail Undangan">
      <View style={{ gap: GUTTER_SPACE, padding: GUTTER_SPACE }}>
        <View style={{ padding: GUTTER_SPACE, borderRadius: 8, borderWidth: 1, borderColor: theme.borderBasicColor2 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8, paddingBottom: GUTTER_SPACE, borderBottomWidth: 1, borderBottomColor: theme.borderBasicColor2, marginBottom: GUTTER_SPACE }}>
            <Typography style={{ fontWeight: 'bold' }}>Detail Pasangan</Typography>
            <TouchableOpacity style={{ padding: 4, borderRadius: 8, backgroundColor: theme.backgroundBasicColor1, alignItems: 'center', justifyContent: 'center' }}>
              <Icon name='edit' size={20} color={theme.textBasicColor} />
            </TouchableOpacity>
          </View>
          <View style={{ gap: GUTTER_SPACE }}>
            <View style={{ padding: GUTTER_SPACE, borderRadius: 8, backgroundColor: theme.backgroundBasicColor1, flexDirection: 'row', gap: 8, alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
              <View style={{ position: 'absolute', right: GUTTER_SPACE, top: GUTTER_SPACE, opacity: 0.15 }}>
                <Icon name='male' size={45} color={theme.textBasicColor}/>
              </View>
              <View>
                <Typography category="h6">John Doe</Typography>
                <Typography category="p2" style={{ marginTop: 5 }}>Putra dari James Doe & Joanne Doe</Typography>
                <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <Icon name="location-city" size={16} color={theme.textHintColor} />
                  <Typography category='s2' color={theme.textHintColor}>Rengat</Typography>
                </View>
              </View>
            </View>
            <View style={{ padding: GUTTER_SPACE, borderRadius: 8, backgroundColor: theme.backgroundBasicColor1, flexDirection: 'row', gap: 8, alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
              <View style={{ position: 'absolute', right: GUTTER_SPACE, top: GUTTER_SPACE, opacity: 0.15 }}>
                <Icon name='female' size={45} color={theme.textBasicColor}/>
              </View>
              <View>
                <Typography category="h6">Jane Doe</Typography>
                <Typography category="p2" style={{ marginTop: 5 }}>Putri dari Jack Doe & Jinny Doe</Typography>
                <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <Icon name="location-city" size={16} color={theme.textHintColor} />
                  <Typography category='s2' color={theme.textHintColor}>Rengat</Typography>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={{ padding: GUTTER_SPACE, borderRadius: 8, borderWidth: 1, borderColor: theme.borderBasicColor2 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8, paddingBottom: GUTTER_SPACE, borderBottomWidth: 1, borderBottomColor: theme.borderBasicColor2, marginBottom: GUTTER_SPACE }}>
            <Typography style={{ fontWeight: 'bold' }}>Daftar Acara</Typography>
            <TouchableOpacity style={{ padding: 4, borderRadius: 8, backgroundColor: theme.colorPrimaryDefault, alignItems: 'center', justifyContent: 'center' }}>
              <Icon name='add' size={20} color={COLORS.colorSlate100} />
            </TouchableOpacity>
          </View>
          <View style={{ gap: GUTTER_SPACE }}>
            <EventCard title="Akad Nikah" date="Sabtu, 06 Januari 2025 10:00 AM - 11:00 PM" location="Jl. Raya No. 123, Jakarta" />
            <EventCard title="Resepsi Pernikahan" date="Sabtu, 07 Januari 2025 10:00 AM - 17:00 PM" location="Jl. Raya No. 123, Jakarta" isMainEvent />
          </View>
        </View>
      </View>
    </ScreenLayout>
  )
}