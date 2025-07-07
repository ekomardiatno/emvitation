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
          <Button style={{ paddingVertical: 5, paddingHorizontal: 8, paddingRight: 16, borderRadius: 8, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <>
              <Icon name='arrow-circle-down' color={COLORS.colorBasic000} size={20} />
              <Typography category='c1' color={COLORS.colorBasic000}>Tarik Saldo</Typography>
            </>
          </Button>
          <Button appearance="secondary" style={{ paddingVertical: 5, paddingHorizontal: 8, paddingRight: 16, borderRadius: 8, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <>
              <Icon name='arrow-circle-up' color={COLORS.colorBasic000} size={20} />
              <Typography category='c1' color={COLORS.colorBasic000}>Tambah Saldo</Typography>
            </>
          </Button>
        </View>
      </View>

      <Typography style={{ fontWeight: '700', paddingHorizontal: GUTTER_SPACE, marginBottom: 14 }}>Riwayat Transaksi</Typography>
      <ScrollView style={{ marginHorizontal: GUTTER_SPACE, marginBottom: GUTTER_SPACE, borderRadius: GUTTER_SPACE, overflow: 'hidden' }}>
        <View style={{ flexDirection: 'column', gap: 10 }}>
          <View style={{ paddingVertical: 15, paddingHorizontal: 15, borderRadius: GUTTER_SPACE, backgroundColor: theme.backgroundBasicColor1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 5 }}>
              <Typography>Guest Quota</Typography>
              <Typography style={{ fontWeight: '600' }}>Rp100,000</Typography>
            </View>
            <Typography category='s2' color={theme.textHintColor} style={{ marginTop: 4 }}>10 May 2023 05:11 PM</Typography>
          </View>
          <View style={{ paddingVertical: 15, paddingHorizontal: 15, borderRadius: GUTTER_SPACE, backgroundColor: theme.backgroundBasicColor1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 5 }}>
              <Typography>Tambah Saldo</Typography>
              <Typography style={{ fontWeight: '600' }}>Rp150,000</Typography>
            </View>
            <Typography category='s2' color={theme.textHintColor} style={{ marginTop: 4 }}>01 May 2023 12:34 PM</Typography>
          </View>
          <View style={{ paddingVertical: 15, paddingHorizontal: 15, borderRadius: GUTTER_SPACE, backgroundColor: theme.backgroundBasicColor1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 5 }}>
              <Typography>Guest Quota</Typography>
              <Typography style={{ fontWeight: '600' }}>Rp100,000</Typography>
            </View>
            <Typography category='s2' color={theme.textHintColor} style={{ marginTop: 4 }}>10 May 2023 05:11 PM</Typography>
          </View>
          <View style={{ paddingVertical: 15, paddingHorizontal: 15, borderRadius: GUTTER_SPACE, backgroundColor: theme.backgroundBasicColor1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 5 }}>
              <Typography>Tambah Saldo</Typography>
              <Typography style={{ fontWeight: '600' }}>Rp150,000</Typography>
            </View>
            <Typography category='s2' color={theme.textHintColor} style={{ marginTop: 4 }}>01 May 2023 12:34 PM</Typography>
          </View>
          <View style={{ paddingVertical: 15, paddingHorizontal: 15, borderRadius: GUTTER_SPACE, backgroundColor: theme.backgroundBasicColor1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 5 }}>
              <Typography>Guest Quota</Typography>
              <Typography style={{ fontWeight: '600' }}>Rp100,000</Typography>
            </View>
            <Typography category='s2' color={theme.textHintColor} style={{ marginTop: 4 }}>10 May 2023 05:11 PM</Typography>
          </View>
          <View style={{ paddingVertical: 15, paddingHorizontal: 15, borderRadius: GUTTER_SPACE, backgroundColor: theme.backgroundBasicColor1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 5 }}>
              <Typography>Tambah Saldo</Typography>
              <Typography style={{ fontWeight: '600' }}>Rp150,000</Typography>
            </View>
            <Typography category='s2' color={theme.textHintColor} style={{ marginTop: 4 }}>01 May 2023 12:34 PM</Typography>
          </View>
          <View style={{ paddingVertical: 15, paddingHorizontal: 15, borderRadius: GUTTER_SPACE, backgroundColor: theme.backgroundBasicColor1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 5 }}>
              <Typography>Guest Quota</Typography>
              <Typography style={{ fontWeight: '600' }}>Rp100,000</Typography>
            </View>
            <Typography category='s2' color={theme.textHintColor} style={{ marginTop: 4 }}>10 May 2023 05:11 PM</Typography>
          </View>
          <View style={{ paddingVertical: 15, paddingHorizontal: 15, borderRadius: GUTTER_SPACE, backgroundColor: theme.backgroundBasicColor1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 5 }}>
              <Typography>Tambah Saldo</Typography>
              <Typography style={{ fontWeight: '600' }}>Rp150,000</Typography>
            </View>
            <Typography category='s2' color={theme.textHintColor} style={{ marginTop: 4 }}>01 May 2023 12:34 PM</Typography>
          </View>
          <View style={{ paddingVertical: 15, paddingHorizontal: 15, borderRadius: GUTTER_SPACE, backgroundColor: theme.backgroundBasicColor1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 5 }}>
              <Typography>Guest Quota</Typography>
              <Typography style={{ fontWeight: '600' }}>Rp100,000</Typography>
            </View>
            <Typography category='s2' color={theme.textHintColor} style={{ marginTop: 4 }}>10 May 2023 05:11 PM</Typography>
          </View>
          <View style={{ paddingVertical: 15, paddingHorizontal: 15, borderRadius: GUTTER_SPACE, backgroundColor: theme.backgroundBasicColor1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 5 }}>
              <Typography>Tambah Saldo</Typography>
              <Typography style={{ fontWeight: '600' }}>Rp150,000</Typography>
            </View>
            <Typography category='s2' color={theme.textHintColor} style={{ marginTop: 4 }}>01 May 2023 12:34 PM</Typography>
          </View>
        </View>
      </ScrollView>
    </View >
  )
}