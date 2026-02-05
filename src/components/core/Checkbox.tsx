import { Pressable, View } from 'react-native';
import { RADIUS, SPACING } from '../../constants';
import { useTheme } from './AppProvider';
import { Control, useController } from 'react-hook-form';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import FieldErrorText from './FieldErrorText';
import capitalizeFirstText from '../../utils/capitalizeFirstText';
import FieldLabel from './FieldLabel';

export default function Checkbox({
  label,
  name,
  control,
  defaultValue,
  required,
  editable = true,
}: {
  label: string;
  name: string;
  control: Control<any, any, any>;
  defaultValue?: boolean;
  required?: boolean;
  editable?: boolean;
}) {
  const theme = useTheme();
  const {
    field,
    formState: {
      errors: {[name]: fieldError},
    },
  } = useController({
    control,
    name,
    defaultValue,
  });

  const onChange = () => {
    if(editable === false) {
      return
    }
    field.onChange(!field.value);
  }

  return (
    <View>
      <View
        style={{flexDirection: 'row', alignItems: 'center', gap: SPACING.sm}}>
        <Pressable
          onPress={onChange}>
          <View
            style={{
              width: SPACING.lg,
              height: SPACING.lg,
              borderWidth: 1,
              borderColor:
                field.value === true
                  ? theme['primary-bg']
                  : theme['input-border'],
              elevation: field.value === true ? 1 : 0,
              borderRadius: RADIUS.sm,
              opacity: editable === false ? 0.5 : 1,
              backgroundColor:
                field.value === true ? theme['primary-bg'] : theme['bg-surface'],
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {field.value === true && (
              <MaterialIcons color={theme['primary-text']} name="check" />
            )}
          </View>
        </Pressable>
        <Pressable
          onPress={onChange}>
          <FieldLabel
            required={required}
            label={label}
            style={{marginBottom: 0}}
          />
        </Pressable>
      </View>
      {fieldError && typeof fieldError.message === 'string' && (
        <FieldErrorText>
          {capitalizeFirstText(fieldError.message)}
        </FieldErrorText>
      )}
    </View>
  );
}
