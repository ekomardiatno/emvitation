import { JSX, useEffect, useState } from "react"
import ScreenLayout from "../../components/core/ScreenLayout"
import { GUTTER_SPACE } from "../../constants"
import { BackHandler, View } from "react-native"
import * as yup from 'yup'
import { Control, useForm } from "react-hook-form"
import Input from "../../components/core/Input"
import Typography from "../../components/core/Typography"
import { useTheme } from "../../components/core/AppProvider"
import Confirmation from "../../components/core/Confirmation"
import SelectTemplate from "./SelectTemplate"
import { yupResolver } from "@hookform/resolvers/yup"
import { useNavigation } from "@react-navigation/native"
import { NavigationProp } from "../../types/navigation-props"
import Icon from "@react-native-vector-icons/material-icons"

export const createInvitationSchema = yup.object({
  invitation_template_id: yup.number().required('Template undangan harus dipilih'),
  female_name: yup.string().required('Nama wanita harus diisi'),
  female_birth_order: yup.number().required('Anak ke- wanita harus diisi'),
  female_father_name: yup.string().required('Nama ayah wanita harus diisi'),
  female_mother_name: yup.string().required('Nama ibu wanita harus diisi'),
  female_ig: yup.string().optional(),
  female_hometown: yup.string().optional(),
  male_name: yup.string().required('Nama pria harus diisi'),
  male_birth_order: yup.number().required('Anak ke- pria harus diisi'),
  male_father_name: yup.string().required('Nama ayah pria harus diisi'),
  male_mother_name: yup.string().required('Nama ibu pria harus diisi'),
  male_ig: yup.string().optional(),
  male_hometown: yup.string().optional(),
})

export default function CreateInvitation(): JSX.Element {
  const { control, handleSubmit, getValues, setValue } = useForm({
    resolver: yupResolver(createInvitationSchema)
  })
  const theme = useTheme()
  const navigation = useNavigation<NavigationProp>()
  const [isAlertOpened, setIsAlertOpened] = useState<boolean>(false)

  useEffect(() => {
    setValue('female_birth_order', 1)
    setValue('male_birth_order', 1)
  }, [])

  const onBackPress = (fnc?: () => void) => {
    const currentValues = getValues()
    let hasDifferent = false
    const empty: any[] = [undefined, null, ""]
    for (let key of Object.keys(currentValues) as (keyof yup.InferType<typeof createInvitationSchema>)[]) {
      if (key === 'male_birth_order' || key === 'female_birth_order') {
        empty.push(1)
      }
      if (!empty.includes(currentValues[key])) {
        hasDifferent = true
        break
      } else {
        if (empty.includes(1)) {
          empty.pop()
        }
        continue
      }
    }
    if (hasDifferent) {
      setIsAlertOpened(true)
      return true
    }
    if (fnc) fnc()
  }

  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress)
    return () => {
      subscription.remove()
    }
  }, [])

  const onSubmit = (props: yup.InferType<typeof createInvitationSchema>) => {
    console.log(props)
  }

  return (
    <ScreenLayout title="Buat Undangan" onBackPress={onBackPress}>
      <>
        <SelectTemplate control={control as Control<yup.InferType<typeof createInvitationSchema>>} />
        <View style={{ marginTop: GUTTER_SPACE }}>
          <View style={{ borderWidth: 1, borderColor: theme.borderBasicColor1, borderRadius: 8, padding: GUTTER_SPACE, gap: GUTTER_SPACE, marginBottom: GUTTER_SPACE, backgroundColor: theme.backgroundBasicColor1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8, paddingBottom: GUTTER_SPACE, borderBottomColor: theme.borderBasicColor1, borderBottomWidth: 1 }}>
              <Typography style={{ fontWeight: '700' }}>Detail Wanita</Typography>
              <Icon name='female' size={20} color={theme.textBasicColor} />
            </View>
            <Input control={control} required={true} name="female_name" label="Nama" placeholder="Nama" />
            <Input control={control} keyboardType='numeric' name="female_birth_order" label={`Anak ke-`} placeholder="Anak ke-" />
            <Input control={control} required={true} name="female_father_name" label={`Nama Ayah`} placeholder="Nama Ayah" />
            <Input control={control} required={true} name="female_mother_name" label={`Nama Ibu`} placeholder="Nama Ibu" />
            <Input control={control} required={false} name="female_ig" label="Akun Instagram" placeholder="@username" />
            <Input control={control} required={false} name="female_hometown" label="Kota Asal" placeholder="Kota Asal" />
          </View>
          <View style={{ borderWidth: 1, borderColor: theme.borderBasicColor1, borderRadius: 8, padding: GUTTER_SPACE, gap: GUTTER_SPACE, marginBottom: GUTTER_SPACE, backgroundColor: theme.backgroundBasicColor1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8, paddingBottom: GUTTER_SPACE, borderBottomColor: theme.borderBasicColor1, borderBottomWidth: 1 }}>
              <Typography style={{ fontWeight: '700' }}>Detail Pria</Typography>
              <Icon name='male' size={20} color={theme.textBasicColor} />
            </View>
            <Input control={control} required={true} name="male_name" label="Nama" placeholder="Nama" />
            <Input control={control} keyboardType='numeric' name="male_birth_order" label={`Anak ke-`} placeholder="Anak ke-" />
            <Input control={control} required={true} name="male_father_name" label={`Nama Ayah`} placeholder="Nama Ayah" />
            <Input control={control} required={true} name="male_mother_name" label={`Nama Ibu`} placeholder="Nama Ibu" />
            <Input control={control} required={false} name="male_ig" label="Akun Instagram" placeholder="@username" />
            <Input control={control} required={false} name="male_hometown" label="Kota Asal" placeholder="Kota Asal" />
          </View>
          <Confirmation
            mode='button'
            onConfirmed={() => {
              handleSubmit(onSubmit)()
            }}
            appearance='primary'
            onCancel={() => {

            }}
          >Buat Undangan</Confirmation>
        </View>
        <Confirmation
          visible={isAlertOpened}
          onConfirmed={() => {
            setIsAlertOpened(false)
            navigation.goBack()
          }}
          onCancel={() => {
            setIsAlertOpened(false)
          }}
          cautionTitle="Anda yakin?"
          cautionText="Jika anda keluar, semua data yang telah diisi akan hilang."
          appearance="warning"
        />
      </>
    </ScreenLayout>
  )
}