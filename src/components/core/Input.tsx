import { useController } from 'react-hook-form';
import {
  View,
  TextInput,
  KeyboardType,
  StyleProp,
  ViewStyle,
  TextStyle,
  StyleSheet,
  Pressable,
} from 'react-native';
import { RADIUS, SPACING, TYPOGRAPHY } from '../../constants';
import { useTheme } from './AppProvider';
import Icon from '@react-native-vector-icons/material-icons';
import capitalizeFirstText from '../../utils/capitalizeFirstText';
import numeral from 'numeral';
import { useState } from 'react';
import { getFontFamily } from './Typography';
import ControlProps from './ControlProps';
import FieldLabel from './FieldLabel';
import { MaterialIconsType } from '../../types/material-icons';
import FieldErrorText from './FieldErrorText';

const Input = ({
  label,
  placeholder,
  name,
  control,
  keyboardType,
  required,
  defaultValue = '',
  editable = true,
  containerStyle,
  inputWrapperStyle,
  onChangeText,
  inputStyle,
  placeholderTextColor,
  secureTextEntry,
  iconName,
}: ControlProps & {
  keyboardType?: KeyboardType;
  containerStyle?: StyleProp<ViewStyle>;
  inputWrapperStyle?: StyleProp<ViewStyle>;
  onChangeText?: (str: string) => void;
  inputStyle?: StyleProp<TextStyle>;
  placeholderTextColor?: string;
  secureTextEntry?: boolean;
  iconName?: MaterialIconsType;
}) => {
  const theme = useTheme();
  const [showInsecuredValue, setShowInsecuredValue] = useState(false);

  const {
    field,
    formState: {errors},
  } = useController({
    control,
    defaultValue,
    name,
  });

  return (
    <View style={containerStyle}>
      {label && <FieldLabel label={label} required={required} />}
      <View
        style={{
          borderWidth: 1,
          borderRadius: RADIUS.sm,
          borderColor: errors[name]
            ? theme['error-text']
            : !editable
            ? theme['border-muted']
            : theme['border-default'],
          backgroundColor: theme['input-bg'],
          flexDirection: 'row',
          ...(inputWrapperStyle ? StyleSheet.flatten(inputWrapperStyle) : {}),
        }}>
        {iconName && (
          <View
            style={{
              paddingLeft: SPACING.sm,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon
              color={theme['input-placeholder']}
              name={iconName}
              size={18}
            />
          </View>
        )}
        <TextInput
          editable={editable}
          placeholderTextColor={
            placeholderTextColor ?? theme['input-placeholder']
          }
          cursorColor={theme['primary-disabled-bg']}
          selectionColor={theme['primary-disabled-bg']}
          selectionHandleColor={theme['primary-bg']}
          secureTextEntry={secureTextEntry ? !showInsecuredValue : false}
          keyboardType={keyboardType}
          style={{
            paddingHorizontal: SPACING.sm,
            paddingRight: secureTextEntry ? 0 : SPACING.sm,
            paddingVertical: SPACING.sm,
            fontFamily: getFontFamily({fontWeight: 400}),
            color: !editable ? theme['text-disabled'] : theme['input-text'],
            flex: 1,
            ...(inputStyle ? StyleSheet.flatten(inputStyle) : {}),
          }}
          placeholder={placeholder}
          value={field.value || defaultValue}
          onChangeText={val => {
            if (editable === false) {
              return;
            }
            field.onChange(
              keyboardType === 'numeric' && val
                ? numeral(val).format('0,0')
                : val,
            );
            if (keyboardType === 'numeric') {
              val = val.replace(/\D/g, '');
            }
            field.onChange(val ?? undefined);
            if (onChangeText) {
              onChangeText(val);
            }
          }}
          multiline={false}
        />
        {errors[name] && (
          <View
            style={{
              alignSelf: 'center',
              paddingLeft: secureTextEntry ? SPACING.sm : 0,
              paddingRight: secureTextEntry ? 0 : SPACING.sm,
            }}>
            <Icon
              name="error"
              size={TYPOGRAPHY.textStyle.small.fontSize}
              color={theme['error-text']}
            />
          </View>
        )}
        {secureTextEntry && (
          <Pressable
            style={{
              paddingRight: SPACING.sm,
              paddingLeft: errors[name] ? 5 : SPACING.sm,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              setShowInsecuredValue(!showInsecuredValue);
            }}
            focusable={false}>
            <Icon
              size={16}
              color={
                !showInsecuredValue
                  ? theme['text-disabled']
                  : theme['input-placeholder']
              }
              name={showInsecuredValue ? 'visibility' : 'visibility-off'}
            />
          </Pressable>
        )}
      </View>
      {errors[name] && typeof errors[name].message === 'string' && (
        <FieldErrorText>
          {capitalizeFirstText(errors[name].message)}
        </FieldErrorText>
      )}
    </View>
  );
};

export default Input;
