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
          <Typography category='h1' style={{ textAlign: 'center', marginBottom: 10 }}>Wallet</Typography>
          <Typography category='h1' style={{ textAlign: 'center', fontWeight: '900' }}>Rp3,000,000</Typography>
          <View style={{ flexDirection: 'row', gap: 10, marginTop: GUTTER_SPACE }}>
            <Button style={{ flexGrow: 1, paddingVertical: 8, paddingHorizontal: 16, backgroundColor: theme.backgroundBasicColor2, borderColor: theme.backgroundBasicColor2 }} textStyle={{ color: theme.textBasicColor }}>Deposit</Button>
            <Button style={{ flexGrow: 1, paddingVertical: 8, paddingHorizontal: 16, backgroundColor: theme.backgroundBasicColor2, borderColor: theme.backgroundBasicColor2 }} textStyle={{ color: theme.textBasicColor }}>Withdraw</Button>
          </View>
          <View style={{ marginTop: GUTTER_SPACE, borderTopWidth: 1, borderTopColor: theme.borderBasicColor1, paddingTop: 10 }}>
            <Typography style={{ marginBottom: 10 }}>Transaction History</Typography>
            <View style={{ flexDirection: 'column', gap: 10 }}>
              <View style={{ padding: 10, backgroundColor: theme.backgroundBasicColor1, borderRadius: 4 }}>
                <Typography>Guest Quota</Typography>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 5, marginTop: 5 }}>
                  <Typography category='label' color={theme.textHintColor}>10 May 2023 5:11 PM</Typography>
                  <Typography category='label' color={theme.textBasicColor}>Rp100,000</Typography>
                </View>
              </View>
              <View style={{ padding: 10, backgroundColor: theme.backgroundBasicColor1, borderRadius: 4 }}>
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