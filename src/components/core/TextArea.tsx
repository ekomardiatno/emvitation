import { useController } from 'react-hook-form'
import {
  View,
  TextInput,
  Platform
} from 'react-native'
import { BORDER_RADIUS, BORDER_WIDTH, TEXT_CONFIG } from '../../constants'
import capitalizeFirstText from '../../utils/capitalizeFirstText'
import { useTheme } from './AppProvider'
import Typography from './Typography'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { getFontFamily } from './Typography'
import { JSX } from 'react'
import ControlProps from './ControlProps'

const TextArea = ({ label, placeholder, name, control, required, defaultValue, editable = true }: ControlProps): JSX.Element => {
  const theme = useTheme()

  const { field, formState: { errors } } = useController({
    control,
    defaultValue,
    name
  })

  return (
    <View style={{ marginBottom: 15 }}>
      {
        label &&
        <Typography category='label' style={{ marginBottom: 6 }}>{label}{required && <Typography category='label' color={theme.textDangerColor}> *</Typography>}</Typography>
      }
      <View style={{ borderWidth: BORDER_WIDTH, borderRadius: BORDER_RADIUS, borderColor: errors[name] ? theme.borderDangerColor1 : !editable ? theme.backgroundBasicColor2 : theme.borderBasicColor3, backgroundColor: theme.backgroundBasicColor1, flexDirection: 'row' }}>
        <TextInput editable={editable} multiline placeholderTextColor={theme.textHintColor} style={{ height: 93, textAlignVertical: 'top', paddingHorizontal: 15, paddingVertical: Platform.OS === 'ios' ? 15 : 10, fontFamily: getFontFamily({}), color: !editable ? theme.textDisabledColor : theme.textBasicColor, lineHeight: 16, flex: 1 }} placeholder={placeholder} value={field.value} onChangeText={field.onChange} />
        {
          errors[name] &&
          <View style={{ alignSelf: 'flex-start', paddingRight: 15, paddingTop: 10 }}>
            <Icon name='error' size={TEXT_CONFIG.h6.fontSize} color={theme.colorDangerDefault} />
          </View>
        }
      </View>
      {
        (errors[name] && typeof errors[name].message === 'string') ?
          <Typography category='c1' style={{ marginTop: 5 }} color={theme.textDangerColor}>{capitalizeFirstText(errors[name].message || '')}</Typography>
          : null
      }
    </View>
  )
}

export default TextArea