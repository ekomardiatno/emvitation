import { JSX } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import Typography from "../components/core/Typography"
import { GUTTER_SPACE } from "../constants"
import Button from "../components/core/Button"
import { View } from "react-native"
import { useTheme } from "../components/core/AppProvider"
import ScreenLayout from "../components/core/ScreenLayout"

export default function Wallet(): JSX.Element {
  const theme = useTheme()
  return (
    <ScreenLayout headerEnabled={false}>
      <SafeAreaView>
        <View style={{ paddingHorizontal: GUTTER_SPACE, paddingTop: GUTTER_SPACE }}>
          <Typography category='h1' style={{ textAlign: 'center', paddingVertical: GUTTER_SPACE * 2 }}>Wallet</Typography>
          <Typography category='h1' style={{ textAlign: 'center', fontWeight: '900', paddingBottom: GUTTER_SPACE }}>Rp3,000,000</Typography>
          <View style={{ flexDirection: 'row', gap: 10, marginTop: GUTTER_SPACE }}>
            <Button style={{ flexGrow: 1, paddingVertical: 10, paddingHorizontal: 16, backgroundColor: theme.backgroundBasicColor2, borderColor: theme.backgroundBasicColor2 }} textStyle={{ color: theme.textBasicColor }}>Deposit</Button>
            <Button style={{ flexGrow: 1, paddingVertical: 10, paddingHorizontal: 16, backgroundColor: theme.backgroundBasicColor2, borderColor: theme.backgroundBasicColor2 }} textStyle={{ color: theme.textBasicColor }}>Withdraw</Button>
          </View>
          <View style={{ marginTop: GUTTER_SPACE * 2, borderTopWidth: 1, borderTopColor: theme.borderBasicColor2, paddingTop: GUTTER_SPACE }}>
            <Typography style={{ marginBottom: GUTTER_SPACE }}>Transaction History</Typography>
            <View style={{ flexDirection: 'column', gap: 10 }}>
              <View style={{ padding: GUTTER_SPACE, backgroundColor: theme.backgroundBasicColor2, borderRadius: 4 }}>
                <Typography>Guest Quota</Typography>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 5, marginTop: 5 }}>
                  <Typography category='label' color={theme.textHintColor}>10 May 2023 5:11 PM</Typography>
                  <Typography category='label' color={theme.textBasicColor}>Rp100,000</Typography>
                </View>
              </View>
              <View style={{ padding: GUTTER_SPACE, backgroundColor: theme.backgroundBasicColor2, borderRadius: 4 }}>
                <Typography>Guest Quota</Typography>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 5, marginTop: 5 }}>
                  <Typography category='label' color={theme.textHintColor}>10 Apr 2023 1:20 PM</Typography>
                  <Typography category='label' color={theme.textBasicColor}>Rp100,000</Typography>
                </View>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ScreenLayout>
  )
}