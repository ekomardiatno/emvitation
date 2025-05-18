import { JSX } from "react"
import ScreenLayout from "../components/core/ScreenLayout"
import { GUTTER_SPACE } from "../constants"
import { View } from "react-native"
import * as yup from 'yup'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import Input from "../components/core/Input"
import TextArea from "../components/core/TextArea"
import Typography from "../components/core/Typography"
import Button from "../components/core/Button"
import { useTheme } from "../components/core/AppProvider"

export const createInvitationSchema = yup.object({
  groom_name: yup.string().required(),
  groom_birth_order: yup.number().required(),
  groom_father_name: yup.string().required(),
  groom_mother_name: yup.string().required(),
  bride_name: yup.string().required(),
  bride_birth_order: yup.number().required(),
  bride_father_name: yup.string().required(),
  bride_mother_name: yup.string().required(),
  greeting: yup.string(),
  quote: yup.string()
}).required()

export default function CreateInvitation(): JSX.Element {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(createInvitationSchema)
  })
  const theme = useTheme()
  return (
    <ScreenLayout title="Create Invitation">
      <>
        <View style={{ padding: GUTTER_SPACE }}>
          <View style={{ borderBottomWidth: 1, borderBottomColor: theme.borderBasicColor2, marginBottom: GUTTER_SPACE }}>
            <Typography style={{ marginBottom: 10, fontWeight: '700' }}>Groom Information</Typography>
            <Input control={control} required={true} name="groom_name" label="Name" placeholder="Name" />
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <View style={{ flex: 1 }}>
                <Input control={control} required={true} keyboardType='numeric' name="groom_birth_order" label={`Birth Order`} placeholder="0" />
              </View>
              <View style={{ flex: 2 }}>
                <Input control={control} required={true} name="groom_father_name" label={`Father Name`} placeholder="Father Name" />
              </View>
              <View style={{ flex: 2 }}>
                <Input control={control} required={true} name="groom_mother_name" label={`Mother Name`} placeholder="Mother Name" />
              </View>
            </View>
          </View>
          <View style={{ borderBottomWidth: 1, borderBottomColor: theme.borderBasicColor2, marginBottom: GUTTER_SPACE }}>
            <Typography style={{ marginBottom: 10, fontWeight: '700' }}>Bride Information</Typography>
            <Input control={control} required={true} name="bride_name" label="Name" placeholder="Name" />
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <View style={{ flex: 1 }}>
                <Input control={control} required={true} keyboardType='numeric' name="bride_birth_order" label={`Birth Order`} placeholder="0" />
              </View>
              <View style={{ flex: 2 }}>
                <Input control={control} required={true} name="bride_father_name" label={`Father Name`} placeholder="Father Name" />
              </View>
              <View style={{ flex: 2 }}>
                <Input control={control} required={true} name="bride_mother_name" label={`Mother Name`} placeholder="Mother Name" />
              </View>
            </View>
          </View>
          <TextArea control={control} name="greeting" label="Greeting" placeholder="Greeting" />
          <TextArea control={control} name="quote" label="Quote" placeholder="Quote" />
          <Button>Create</Button>
        </View>
      </>
    </ScreenLayout>
  )
}