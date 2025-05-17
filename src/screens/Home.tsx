import { JSX } from "react"
import Typography from "../components/core/Typography"
import ScreenLayout from "../components/core/ScreenLayout"
import { GUTTER_SPACE } from "../constants"
import { useWindowDimensions, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useTheme } from "../components/core/AppProvider"
import PressableCard from "../components/core/PressableCard"

export default function Home(): JSX.Element {
  const theme = useTheme()
  const { width } = useWindowDimensions()
  return (
    <ScreenLayout headerEnabled={false}>
      <SafeAreaView>
        <View style={{ paddingHorizontal: GUTTER_SPACE }}>
          <View style={{ marginVertical: GUTTER_SPACE }}>
            <Typography category='h2'>Hi, Jane!</Typography>
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
            <PressableCard title="Create New Invitation" iconName="add" />
            <PressableCard title="My Invitations" iconName="description" />
            <PressableCard title="Upcoming Event" iconName="event" shotDescription="May 25th - Emma & David" />
            <PressableCard title="Recent Activity" iconName="history" shotDescription="May 21st - Purchased Guest Quota" />
          </View>
        </View>
      </SafeAreaView>
    </ScreenLayout>
  )
}