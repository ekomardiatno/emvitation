import { JSX, useEffect } from "react"
import Typography from "../components/core/Typography"
import { COLORS, GUTTER_SPACE } from "../constants"
import Button from "../components/core/Button"
import { Appearance, ScrollView, StatusBar, useWindowDimensions, View } from "react-native"
import { useTheme } from "../components/core/AppProvider"
import Icon from "@react-native-vector-icons/material-icons"
import StaticCircleWave from "../components/StaticCircleWave"

export default function Wallet(): JSX.Element {
  const theme = useTheme()
  const { width } = useWindowDimensions()
  useEffect(() => {
    StatusBar.setTranslucent(true)
    let timeout: any = null
    Appearance.addChangeListener(() => {
      timeout = setTimeout(() => {
        StatusBar.setTranslucent(true)
      }, 800)
    })
    return () => {
      if(timeout) clearTimeout(timeout)
      StatusBar.setTranslucent(false)
    }
  }, [])
  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingVertical: GUTTER_SPACE * 4, paddingTop: GUTTER_SPACE * 4 + (StatusBar.currentHeight || 0), backgroundColor: theme.backgroundBasicColor1 }}>
        <StaticCircleWave color={theme.textPrimaryColor} top={-150} left={-150} />
        <StaticCircleWave color={theme.textWarningColor} size={200} bottom={-100} right={-120} />
        <Typography style={{ textAlign: 'center', fontSize: 13, color: theme.textHintColor, fontWeight: '300' }}>Current Balance</Typography>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', marginTop: -3 }}>
          <Typography style={{ fontWeight: '600', marginTop: 8, marginRight: 5, fontSize: 16, color: theme.textHintColor }}>Rp</Typography>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
            <Typography style={{ marginBottom: 5, fontSize: 38, lineHeight: 46, fontWeight: '700', color: theme.textBasicColor }}>3,000,000</Typography>
            <Button style={{ paddingVertical: 0, paddingHorizontal: 0, width: 30, height: 30, borderRadius: 30, alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', borderColor: 'transparent' }}><Icon name='visibility' size={18} color={theme.textBasicColor} /></Button>
          </View>
        </View>
      </View>
      <View style={{ flexDirection: 'row', paddingHorizontal: GUTTER_SPACE, gap: 10, marginVertical: GUTTER_SPACE * 1.5, marginTop: 0 }}>
        <Button style={{ paddingVertical: 8, paddingHorizontal: 8, borderRadius: 50, backgroundColor: theme.colorPrimaryTransparentDefault, borderColor: theme.backgroundBasicColor3, flexDirection: 'row', alignItems: 'center', gap: 12, width: (width - GUTTER_SPACE * 2 - 10) / 2 }}>
          <>
            <View style={{ width: 32, height: 32, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.colorPrimary100, borderRadius: 32 }}>
              <Icon name='arrow-circle-up' color={COLORS.colorPrimary500} size={20} />
            </View>
            <Typography>Top Up</Typography>
          </>
        </Button>
        <Button style={{ paddingVertical: 8, paddingHorizontal: 8, borderRadius: 50, backgroundColor: theme.colorDangerTransparentDefault, borderColor: theme.backgroundBasicColor3, flexDirection: 'row', alignItems: 'center', gap: 12, width: (width - GUTTER_SPACE * 2 - 10) / 2 }}>
          <>
            <View style={{ width: 32, height: 32, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.colorDanger100, borderRadius: 32 }}>
              <Icon name='arrow-circle-down' color={COLORS.colorDanger500} size={20} />
            </View>
            <Typography>Withdraw</Typography>
          </>
        </Button>
      </View>
      <Typography style={{ fontWeight: '700', paddingHorizontal: GUTTER_SPACE, paddingBottom: GUTTER_SPACE, borderBottomColor: theme.borderBasicColor2, borderBottomWidth: 1 }}>Transaction History</Typography>
      <ScrollView style={{ paddingHorizontal: GUTTER_SPACE }}>
        <View style={{ flexDirection: 'column', gap: 1, backgroundColor: theme.backgroundBasicColor2 }}>
          <View style={{ paddingVertical: GUTTER_SPACE, backgroundColor: theme.backgroundBasicColor1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 5, marginBottom: 3 }}>
              <Typography category='s1'>Guest Quota</Typography>
              <Typography style={{ fontWeight: '600' }}>Rp100,000</Typography>
            </View>
            <Typography category='s2' color={theme.textHintColor}>10 May 2023 05:11 PM</Typography>
          </View>
          <View style={{ paddingVertical: GUTTER_SPACE, backgroundColor: theme.backgroundBasicColor1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 5, marginBottom: 3 }}>
              <Typography category='s1'>Top Up</Typography>
              <Typography style={{ fontWeight: '600' }}>Rp150,000</Typography>
            </View>
            <Typography category='s2' color={theme.textHintColor}>01 May 2023 12:34 PM</Typography>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}