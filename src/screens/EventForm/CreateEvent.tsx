import { yupResolver } from "@hookform/resolvers/yup"
import { useNavigation } from "@react-navigation/native"
import { JSX } from "react"
import { useForm } from "react-hook-form"
import { View } from "react-native"
import * as yup from 'yup'
import { useTheme } from "../../components/core/AppProvider"
import Confirmation from "../../components/core/Confirmation"
import DatePicker from "../../components/core/DatePicker"
import Input from "../../components/core/Input"
import ScreenLayout from "../../components/core/ScreenLayout"
import SelectPlace from "../../components/core/SelectPlace"
import { BORDER_RADIUS, GUTTER_SPACE } from "../../constants"
import { NavigationProp } from "../../types/navigation-props"

const createEventSchema = yup.object({
  event_name: yup.string().required("Nama acara harus diisi"),
  start_timestamp: yup.date().required("Waktu mulai acara harus diisi"),
  end_timestamp: yup.date(),
  location_address: yup.string(),
  location_lat_lng: yup.string()
})

export default function CreateEvent(): JSX.Element {
  const theme = useTheme()
  const navigation = useNavigation<NavigationProp>()
  const { control, handleSubmit, getValues, setValue } = useForm({
    resolver: yupResolver(createEventSchema)
  })

  const onSubmit = () => {
    navigation.goBack()
  }

  return (
    <ScreenLayout title="Buat Acara" onBackPress={(goBack) => {
      goBack()
    }}>
      <View style={{ gap: GUTTER_SPACE }}>
        <View style={{ backgroundColor: theme.backgroundBasicColor1, borderWidth: 1, borderColor: theme.borderBasicColor1, borderRadius: BORDER_RADIUS + GUTTER_SPACE, padding: GUTTER_SPACE }}>
          <View style={{ gap: GUTTER_SPACE }}>
            <Input name="event_name" required control={control} placeholder="Cth. Resepsi Pernikahan" label="Nama Acara" />
            <DatePicker name="start_timestamp" required control={control} label="Tanggal & Waktu Mulai" placeholder="Tue, 08 Jul 25 11:00:00" />
            <DatePicker name="end_timestamp" control={control} label="Tanggal & Waktu Mulai" placeholder="Tue, 08 Jul 25 16:00:00" />
            <Input name="location_address" control={control} placeholder="Cth. Jalan Nusa Indah, No. 1" label="Alamat Acara" />
            <SelectPlace label="Lokasi Acara" name="location_lat_lng" control={control} />
          </View>
        </View>
        <Confirmation
          mode='button'
          onConfirmed={() => {
            handleSubmit(onSubmit)()
          }}
        >Simpan</Confirmation>
      </View>
    </ScreenLayout>
  )
}