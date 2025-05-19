import { JSX, useEffect, useState } from "react"
import ScreenLayout from "../../components/core/ScreenLayout"
import { GUTTER_SPACE } from "../../constants"
import { BackHandler, View } from "react-native"
import * as yup from 'yup'
import { Control, useForm } from "react-hook-form"
import Input from "../../components/core/Input"
import TextArea from "../../components/core/TextArea"
import Typography from "../../components/core/Typography"
import { useTheme } from "../../components/core/AppProvider"
import Confirmation from "../../components/core/Confirmation"
import SelectTemplate from "./SelectTemplate"
import { yupResolver } from "@hookform/resolvers/yup"
import { useNavigation } from "@react-navigation/native"
import { NavigationProp } from "../../types/navigation-props"

export const createInvitationSchema = yup.object({
  invitation_template_id: yup.number().optional(),
  groom_name: yup.string().required(),
  groom_birth_order: yup.number().required(),
  groom_father_name: yup.string().required(),
  groom_mother_name: yup.string().required(),
  groom_ig: yup.string().optional(),
  groom_hometown: yup.string().optional(),
  bride_name: yup.string().required(),
  bride_birth_order: yup.number().required(),
  bride_father_name: yup.string().required(),
  bride_mother_name: yup.string().required(),
  bride_ig: yup.string().optional(),
  bride_hometown: yup.string().optional(),
  quote: yup.string().optional()
})

export default function CreateInvitation(): JSX.Element {
  const { control, handleSubmit, getValues, setValue } = useForm({
    resolver: yupResolver(createInvitationSchema)
  })
  const theme = useTheme()
  const navigation = useNavigation<NavigationProp>()
  const [isAlertOpened, setIsAlertOpened] = useState<boolean>(false)

  useEffect(() => {
    setValue('groom_birth_order', 1)
    setValue('bride_birth_order', 1)
  }, [])

  const onBackPress = (fnc?: () => void) => {
    const currentValues = getValues()
    let hasDifferent = false
    const empty: any[] = [undefined, null, ""]
    for (let key of Object.keys(currentValues) as (keyof yup.InferType<typeof createInvitationSchema>)[]) {
      if (key === 'bride_birth_order' || key === 'groom_birth_order') {
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
    <ScreenLayout title="Create Invitation" onBackPress={onBackPress}>
      <>
        <SelectTemplate control={control as Control<yup.InferType<typeof createInvitationSchema>>} />
        <View style={{ padding: GUTTER_SPACE }}>
          <View style={{ borderBottomWidth: 1, borderBottomColor: theme.borderBasicColor2, paddingBottom: GUTTER_SPACE, gap: GUTTER_SPACE, marginBottom: GUTTER_SPACE }}>
            <Typography style={{ marginBottom: 10, fontWeight: '700' }}>Groom Information</Typography>
            <Input control={control} required={true} name="groom_name" label="Name" placeholder="Name" />
            <Input control={control} required={true} keyboardType='numeric' name="groom_birth_order" label={`Birth Order`} placeholder="Birth Order" defaultValue="1" />
            <Input control={control} required={true} name="groom_father_name" label={`Father Name`} placeholder="Father Name" />
            <Input control={control} required={true} name="groom_mother_name" label={`Mother Name`} placeholder="Mother Name" />
            <Input control={control} required={false} name="groom_ig" label="Instagram Account" placeholder="@username" />
            <Input control={control} required={false} name="groom_hometown" label="Hometown" placeholder="Hometown" />
          </View>
          <View style={{ borderBottomWidth: 1, borderBottomColor: theme.borderBasicColor2, paddingBottom: GUTTER_SPACE, gap: GUTTER_SPACE, marginBottom: GUTTER_SPACE }}>
            <Typography style={{ marginBottom: 10, fontWeight: '700' }}>Bride Information</Typography>
            <Input control={control} required={true} name="bride_name" label="Name" placeholder="Name" />
            <Input control={control} required={true} keyboardType='numeric' name="bride_birth_order" label={`Birth Order`} placeholder="Birth Order" defaultValue="1" />
            <Input control={control} required={true} name="bride_father_name" label={`Father Name`} placeholder="Father Name" />
            <Input control={control} required={true} name="bride_mother_name" label={`Mother Name`} placeholder="Mother Name" />
            <Input control={control} required={false} name="bride_ig" label="Instagram Account" placeholder="@username" />
            <Input control={control} required={false} name="bride_hometown" label="Hometown" placeholder="Hometown" />
          </View>
          <TextArea control={control} name="quote" label="Quote" placeholder="Quote" containerStyle={{ marginBottom: GUTTER_SPACE }} />
          <Confirmation
            mode='button'
            onConfirmed={() => {
              handleSubmit(onSubmit)()
            }}
            appearance='primary'
            onCancel={() => {

            }}
          >Create</Confirmation>
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
          cautionTitle="Do you want to proceed?"
          cautionText="Unsaved changes will be lost."
          appearance="warning"
        />
      </>
    </ScreenLayout>
  )
}