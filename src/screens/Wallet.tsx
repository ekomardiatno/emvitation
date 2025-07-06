import { JSX, useEffect } from "react"
import Typography from "../components/core/Typography"
import { COLORS, GUTTER_SPACE } from "../constants"
import Button from "../components/core/Button"
import { Appearance, ScrollView, StatusBar, TouchableOpacity, useWindowDimensions, View } from "react-native"
import { useTheme } from "../components/core/AppProvider"
import Icon from "@react-native-vector-icons/material-icons"

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
      if (timeout) clearTimeout(timeout)
      StatusBar.setTranslucent(false)
    }
  }, [])
  return (
    <View style={{ flex: 1 }}>
      <View style={{ margin: GUTTER_SPACE, marginVertical: GUTTER_SPACE * 2 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 8 }}>
          <Typography style={{ color: theme.textHintColor }}>Total Saldo</Typography>
          <TouchableOpacity>
            <View style={{ padding: 3, borderRadius: 3, backgroundColor: theme.colorBasicTransparentDefault, alignItems: 'center', justifyContent: 'center' }}>
              <Icon name='visibility' size={13} color={theme.textBasicColor} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: -3 }}>
          <Typography style={{ marginTop: 2, marginRight: 5, fontSize: 22, lineHeight: 28, color: theme.textHintColor }}>Rp</Typography>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Typography style={{ marginBottom: 8, fontSize: 38, lineHeight: 42, fontWeight: '700', color: theme.textBasicColor }}>3,000,000</Typography>
          </View>
        </View>
        <View style={{ flexDirection: 'row', gap: 8, marginTop: 10 }}>
          <Button style={{ paddingVertical: 5, paddingHorizontal: 8, paddingRight: 16, borderRadius: 8, backgroundColor: theme.colorDangerDefault, borderColor: theme.colorDangerDefault, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <>
              <Icon name='arrow-circle-down' color={COLORS.colorBasic000} size={20} />
              <Typography category='c1' color={COLORS.colorBasic000}>Tarik Saldo</Typography>
            </>
          </Button>
          <Button style={{ paddingVertical: 5, paddingHorizontal: 8, paddingRight: 16, borderRadius: 8, backgroundColor: theme.colorPrimaryDefault, borderColor: theme.colorPrimaryDefault, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <>
              <Icon name='arrow-circle-up' color={COLORS.colorBasic000} size={20} />
              <Typography category='c1' color={COLORS.colorBasic000}>Tambah Saldo</Typography>
            </>
          </Button>
        </View>
      </View>

      <Typography style={{ fontWeight: '700', paddingHorizontal: GUTTER_SPACE, paddingBottom: GUTTER_SPACE, borderBottomColor: theme.borderBasicColor2, borderBottomWidth: 1 }}>Riwayat Transaksi</Typography>
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
              <Typography category='s1'>Tambah Saldo</Typography>
              <Typography style={{ fontWeight: '600' }}>Rp150,000</Typography>
            </View>
            <Typography category='s2' color={theme.textHintColor}>01 May 2023 12:34 PM</Typography>
          </View>
        </View>
      </ScrollView>
    </View >
  )
}