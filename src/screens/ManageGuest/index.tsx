import { Platform, useWindowDimensions, View } from "react-native"
import ScreenLayout from "../../components/core/ScreenLayout"
import { JSX, useState } from "react"
import { BORDER_RADIUS, BORDER_WIDTH, GUTTER_SPACE } from "../../constants"
import { useTheme } from "../../components/core/AppProvider"
import Typography from "../../components/core/Typography"
import Button from "../../components/core/Button"
import Icon from "@react-native-vector-icons/material-icons"
import EModal from "../../components/core/EModal"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import Input from "../../components/core/Input"
import * as yup from 'yup'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import Confirmation from "../../components/core/Confirmation"

export const addGuestSchema = yup.object({
  guest_name: yup.string().required('Nama tamu harus diisi'),
})

export default function ManageGuest(): JSX.Element {
  const theme = useTheme()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { width, height } = useWindowDimensions()
  const { top, bottom } = useSafeAreaInsets()
  const { control, handleSubmit, getValues, setValue } = useForm({
    resolver: yupResolver(addGuestSchema)
  })

  const onSubmit = (props: yup.InferType<typeof addGuestSchema>) => {
    console.log(props)
  }

  return (
    <ScreenLayout title="Kelola Tamu" longerTitle="Kelola Tamu" rightControl={
      <Button style={{ paddingHorizontal: 12 }} appearance="transparent" onPress={() => {
        setIsModalVisible(true)
      }}>
        <Icon name="add" size={24} color={theme.textBasicColor} />
      </Button>
    }>
      <>
        <View style={{ gap: 10 }}>
          <View style={{ padding: GUTTER_SPACE, paddingLeft: GUTTER_SPACE * 1.75, borderRadius: 16, backgroundColor: theme.backgroundBasicColor1, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <View style={{ flex: 1 }}>
              <Typography category="h6">John Doe</Typography>
            </View>
            <Button appearance="transparent">
              <Icon name='share' size={24} color={theme.textWarningColor} />
            </Button>
          </View>
          <View style={{ padding: GUTTER_SPACE, paddingLeft: GUTTER_SPACE * 1.75, borderRadius: 16, backgroundColor: theme.backgroundBasicColor1, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <View style={{ flex: 1 }}>
              <Typography category="h6">Johnathan Doe</Typography>
            </View>
            <Button appearance="transparent">
              <Icon name='share' size={24} color={theme.textWarningColor} />
            </Button>
          </View>
        </View>
        <EModal visible={isModalVisible} onClose={() => { setIsModalVisible(false) }}>
          <View style={{ backgroundColor: theme.backgroundBasicColor1, padding: GUTTER_SPACE, borderWidth: BORDER_WIDTH, borderRadius: BORDER_RADIUS, borderColor: theme.borderBasicColor1, width: width < height ? width - GUTTER_SPACE * 2 : height - GUTTER_SPACE * 2, marginBottom: (Platform.OS === 'ios' ? GUTTER_SPACE * 3 : top) }}>
            <Input control={control} name="guest_name" placeholder="Nama Tamu" label="Nama Tamu" required={true} />
            <View style={{ marginTop: 16 }}>
              <Confirmation
                mode='button'
                onConfirmed={() => {
                  handleSubmit(onSubmit)()
                }}
                appearance='primary'
                onCancel={() => {

                }}
              >Tambah Tamu</Confirmation>
            </View>
          </View>
        </EModal>
      </>
    </ScreenLayout>
  )
}