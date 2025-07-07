import { JSX } from "react"
import { GUTTER_SPACE } from "../constants"
import { ScrollView, View } from "react-native"
import { useTheme } from "../components/core/AppProvider"
import PressableCard from "../components/core/PressableCard"
import { useNavigation } from "@react-navigation/native"
import { NavigationProp } from "../types/navigation-props"

export default function Home(): JSX.Element {
  const theme = useTheme()
  const navigation = useNavigation<NavigationProp>()
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ padding: GUTTER_SPACE }}>
          <View style={{ gap: 10 }}>
            <PressableCard title="Buat Undangan" iconName="add" onPress={() => navigation.navigate('Create Invitation')} />
            <PressableCard title="Undangan Saya" iconName="description" onPress={() => navigation.navigate('My Invitation')} />
            {/* <PressableCard title="Upcoming Event" iconName="event" shotDescription="May 25th - Emma & David" />
            <PressableCard title="Recent Activity" iconName="history" shotDescription="May 21st - Purchased Guest Quota" /> */}
          </View>
        </View>
      </ScrollView>
    </View>
  )
}