import { JSX } from "react"
import Typography from "../components/core/Typography"
import { GUTTER_SPACE } from "../constants"
import { ScrollView, useWindowDimensions, View } from "react-native"
import { useTheme } from "../components/core/AppProvider"
import PressableCard from "../components/core/PressableCard"
import StaticCircleWave from "../components/StaticCircleWave"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import { NavigationProp } from "../types/navigation-props"

export default function Home(): JSX.Element {
  const theme = useTheme()
  const { width } = useWindowDimensions()
  const navigation = useNavigation<NavigationProp>()
  return (
    <View style={{ flex: 1 }}>
      <>
        <StaticCircleWave color={theme.textPrimaryColor} size={400} bottom={-220} right={-200} />
        <StaticCircleWave color={theme.textWarningColor} size={200} top={15} left={-50} />
        <SafeAreaView>
          <View style={{ marginVertical: GUTTER_SPACE, paddingHorizontal: GUTTER_SPACE }}>
            <Typography category='h2'>Hi, Jane!</Typography>
          </View>
          <ScrollView>
            <View style={{ paddingHorizontal: GUTTER_SPACE }}>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
                <PressableCard title="Create New Invitation" iconName="add" onPress={() => navigation.navigate('Profile')} />
                <PressableCard title="My Invitations" iconName="description" />
                <PressableCard title="Upcoming Event" iconName="event" shotDescription="May 25th - Emma & David" />
                <PressableCard title="Recent Activity" iconName="history" shotDescription="May 21st - Purchased Guest Quota" />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    </View>
  )
}