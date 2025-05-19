import { useController } from 'react-hook-form'
import { View, TextInput, Platform, KeyboardType, StyleProp, ViewStyle } from 'react-native'
import { BORDER_RADIUS, BORDER_WIDTH, TEXT_CONFIG } from '../../constants'
import { useTheme } from './AppProvider'
import Typography from './Typography'
import Icon from '@react-native-vector-icons/material-icons'
import capitalizeFirstText from '../../utils/capitalizeFirstText'
import numeral from 'numeral'
import { JSX, useEffect, useState } from 'react'
import { getFontFamily } from './Typography'
import ControlProps from './ControlProps'
import FieldLabel from './FieldLabel'

const Input = ({ label, placeholder, name, control, keyboardType, required, defaultValue = '', editable = true, containerStyle }: ControlProps & {
  keyboardType?: KeyboardType,
  containerStyle?: StyleProp<ViewStyle>
}): JSX.Element => {
  const theme = useTheme()
  const [value, setValue] = useState('')

  const { field, formState: { errors } } = useController({
    control,
    defaultValue,
    name
  })

  useEffect(() => {
    setValue(keyboardType === 'numeric' && defaultValue ? numeral(defaultValue).format('0,0') : defaultValue)
  }, [defaultValue])

  return (
    <View style={containerStyle}>
      {
        label &&
        <FieldLabel label={label} required={required} />
      }
      <View style={{ borderWidth: BORDER_WIDTH, borderRadius: BORDER_RADIUS, borderColor: errors[name] ? theme.borderDangerColor1 : !editable ? theme.backgroundBasicColor2 : theme.borderBasicColor3, backgroundColor: theme.backgroundBasicColor1, flexDirection: 'row' }}>
        <TextInput editable={editable} placeholderTextColor={theme.textHintColor} keyboardType={keyboardType} style={{ paddingHorizontal: 15, paddingVertical: Platform.OS === 'ios' ? 15 : 10, fontFamily: getFontFamily({}), color: !editable ? theme.textDisabledColor : theme.textBasicColor, flex: 1 }} placeholder={placeholder} value={value} onChangeText={value => {
          setValue(keyboardType === 'numeric' && value ? numeral(value).format('0,0') : value)
          if (keyboardType === 'numeric') value = value.replace(/\D/g, '')
          field.onChange(value || undefined)
        }} multiline={false} />
        {
          errors[name] &&
          <View style={{ alignSelf: 'center', paddingRight: 15 }}>
            <Icon name='error' size={TEXT_CONFIG.h6.fontSize} color={theme.colorDangerDefault} />
          </View>
        }
      </View>
      {
        (errors[name] && typeof errors[name].message === 'string') &&
        <Typography category='c1' style={{ marginTop: 5 }} color={theme.textDangerColor}>{capitalizeFirstText(errors[name].message)}</Typography>
      }
    </View>
  );
}

export default Input