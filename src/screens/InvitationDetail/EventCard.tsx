import { JSX } from "react"
import { TouchableOpacity, View } from "react-native"
import Typography from "../../components/core/Typography"
import Icon from "@react-native-vector-icons/material-icons"
import { useTheme } from "../../components/core/AppProvider"
import { GUTTER_SPACE } from "../../constants"

export default function EventCard({
  title,
  date,
  location,
  isMainEvent
}: {
  title: string,
  date: string,
  location: string,
  isMainEvent?: boolean
}): JSX.Element {
  const theme = useTheme()
  return (
    <View style={{ backgroundColor: theme.backgroundBasicColor2, padding: GUTTER_SPACE, borderRadius: 8, borderWidth: 1, borderColor: theme.borderBasicColor2 }}>
      <Typography category="h6" style={{ fontWeight: 'bold' }}>{title}</Typography>
      <Typography category="p2" color={theme.textSecondaryColor} style={{ marginTop: 5 }}>{date}</Typography>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 10 }}>
        <Icon name='place' size={16} color={theme.textMutedColor} />
        <Typography category="p2" color={theme.textMutedColor}>{location}</Typography>
      </View>
      <View style={{ flexDirection: 'row', gap: GUTTER_SPACE, justifyContent: 'space-between', alignItems: 'center', marginTop: GUTTER_SPACE }}>
        <TouchableOpacity style={{ padding: 8, paddingHorizontal: 10, paddingRight: 12, borderRadius: 8, backgroundColor: theme.backgroundAlternativeColor4, alignItems: 'center', flexDirection: 'row', gap: 8 }}>
          <Icon name='edit' size={13} color={theme.textAlternateColor} />
          <Typography color={theme.textAlternateColor} category='label'>Edit</Typography>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, justifyContent: 'flex-end' }}>
            <Typography category="p2" color={isMainEvent ? theme.colorPrimaryDefault : theme.textHintColor}>
              {isMainEvent ? 'Acara Utama' : ''}
            </Typography>
            {isMainEvent ? (
              <Icon name='star' size={20} color={theme.colorPrimaryDefault} />
            ) : (
              <Icon name='star-outline' size={20} color={theme.textHintColor} />
            )}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}