import { useController } from 'react-hook-form';
import { View, TextInput, StyleProp, ViewStyle } from 'react-native';
import { RADIUS, SPACING, TYPOGRAPHY } from '../../constants';
import capitalizeFirstText from '../../utils/capitalizeFirstText';
import { useTheme } from './AppProvider';
import Icon from '@react-native-vector-icons/material-icons';
import { getFontFamily } from './Typography';
import ControlProps from './ControlProps';
import FieldLabel from './FieldLabel';
import FieldErrorText from './FieldErrorText';

const TextArea = ({
  label,
  placeholder,
  name,
  control,
  required,
  defaultValue,
  editable = true,
  containerStyle,
}: ControlProps & {
  containerStyle?: StyleProp<ViewStyle>;
}) => {
  const theme = useTheme();

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
            : theme['input-border'],
          backgroundColor: theme['input-bg'],
          flexDirection: 'row',
        }}>
        <TextInput
          editable={editable}
          multiline
          placeholderTextColor={theme['input-placeholder']}
          style={{
            height: 93,
            textAlignVertical: 'top',
            paddingHorizontal: SPACING.sm,
            paddingVertical: SPACING.sm,
            fontFamily: getFontFamily({}),
            color: !editable ? theme['text-disabled'] : theme['input-text'],
            lineHeight: 16,
            flex: 1,
          }}
          placeholder={placeholder}
          value={field.value}
          onChangeText={field.onChange}
        />
        {errors[name] && (
          <View
            style={{alignSelf: 'flex-start', paddingRight: 15, paddingTop: 10}}>
            <Icon
              name="error"
              size={TYPOGRAPHY.textStyle.small.fontSize}
              color={theme['error-text']}
            />
          </View>
        )}
      </View>
      {errors[name] && typeof errors[name].message === 'string' ? (
        <FieldErrorText>
          {capitalizeFirstText(errors[name].message)}
        </FieldErrorText>
      ) : null}
    </View>
  );
};

export default TextArea;
