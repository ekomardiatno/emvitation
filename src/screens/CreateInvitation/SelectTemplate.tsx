import { PlatformPressable } from "@react-navigation/elements"
import { JSX } from "react"
import { StyleProp, StyleSheet, useWindowDimensions, View, ViewStyle } from "react-native"
import { useTheme } from "../../components/core/AppProvider"
import { useNavigation } from "@react-navigation/native"
import Icon from "@react-native-vector-icons/material-icons"
import Typography from "../../components/core/Typography"
import { BORDER_RADIUS, GUTTER_SPACE } from "../../constants"
import { NavigationProp } from "../../types/navigation-props"
import { Control, useController } from "react-hook-form"
import { InferType } from "yup"
import { createInvitationSchema } from "."
import capitalizeFirstText from "../../utils/capitalizeFirstText"

export default function SelectTemplate({ control, containerStyle }: {
  control: Control<InferType<typeof createInvitationSchema>>
  containerStyle?: StyleProp<ViewStyle>
}): JSX.Element {
  const theme = useTheme()
  const navigation = useNavigation<NavigationProp>()
  const { height } = useWindowDimensions()
  const { field, formState: { errors } } = useController({
    control,
    name: 'invitation_template_id'
  })
  const flatContainerStyle = StyleSheet.flatten(containerStyle)

  return (
    <View style={{ padding: GUTTER_SPACE, ...flatContainerStyle }}>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <View style={{ borderRadius: BORDER_RADIUS, overflow: 'hidden', borderWidth: 1, borderColor: errors['invitation_template_id'] ? theme.borderDangerColor1 : theme.borderBasicColor1 }}>
          <PlatformPressable onPress={() => {
            navigation.navigate('Template', {
              action: 'select',
              onSelected: (templateId) => {
                field.onChange(templateId)
                console.log(templateId)
              }
            })
          }} style={{ height: height / 3, width: (height / 3) / 4 * 3, backgroundColor: theme.backgroundBasicColor1, alignItems: 'center', justifyContent: 'center' }}>
            {
              field.value
                ? (
                  <Icon name='hide-image' color={theme.backgroundBasicColor2} size={(height / 3) / 4} />
                )
                : <>
                  <Icon name='add-circle' color={theme.textHintColor} size={30} />
                  <Typography color={theme.textHintColor} style={{ marginTop: 5 }}>Pilih Template</Typography>
                </>
            }
          </PlatformPressable>
        </View>
      </View>
      {
        (errors['invitation_template_id'] && typeof errors['invitation_template_id'].message === 'string') &&
        <Typography category='c1' style={{ marginTop: 5, textAlign: 'center' }} color={theme.textDangerColor}>{capitalizeFirstText(errors['invitation_template_id'].message)}</Typography>
      }
    </View>
  )
}