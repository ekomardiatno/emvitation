import { JSX } from "react"
import { GUTTER_SPACE } from "../constants"
import { ScrollView, View } from "react-native"
import { useTheme } from "../components/core/AppProvider"
import PressableCard from "../components/core/PressableCard"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import { NavigationProp } from "../types/navigation-props"

export default function Home(): JSX.Element {
  const theme = useTheme()
  const navigation = useNavigation<NavigationProp>()
  return (
    <View style={{ flex: 1 }}>
      <>
        <SafeAreaView>
          <ScrollView>
            <View style={{ paddingHorizontal: GUTTER_SPACE }}>
              <View style={{ gap: 10 }}>
                <PressableCard title="Buat Undangan" iconName="add" onPress={() => navigation.navigate('Buat Undangan')} />
                <PressableCard title="Undangan Saya" iconName="description" />
                {/* <PressableCard title="Upcoming Event" iconName="event" shotDescription="May 25th - Emma & David" />
                <PressableCard title="Recent Activity" iconName="history" shotDescription="May 21st - Purchased Guest Quota" /> */}
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    </View>
  )
}