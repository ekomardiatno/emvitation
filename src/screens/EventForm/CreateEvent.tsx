import { JSX } from "react"
import ScreenLayout from "../../components/core/ScreenLayout"
import { View } from "react-native"
import { useTheme } from "../../components/core/AppProvider"
import { GUTTER_SPACE } from "../../constants"
import * as yup from 'yup'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import Typography from "../../components/core/Typography"
import Input from "../../components/core/Input"
import DatePicker from "../../components/core/DatePicker"
import Confirmation from "../../components/core/Confirmation"
import { useNavigation } from "@react-navigation/native"
import { NavigationProp } from "../../types/navigation-props"
import SelectPlace from "../../components/core/SelectPlace"

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
        <View style={{ backgroundColor: theme.backgroundBasicColor1, borderWidth: 1, borderColor: theme.borderBasicColor1, borderRadius: 8, padding: GUTTER_SPACE }}>
          <View style={{ paddingBottom: GUTTER_SPACE, marginBottom: GUTTER_SPACE, borderBottomColor: theme.borderBasicColor1, borderBottomWidth: 1 }}>
            <Typography style={{ fontWeight: '700' }}>Informasi Acara</Typography>
          </View>
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