import { PlatformPressable } from '@react-navigation/elements';
import {
  StyleProp,
  StyleSheet,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../../components/core/AppProvider';
import { useNavigation } from '@react-navigation/native';
import Icon from '@react-native-vector-icons/material-icons';
import Typography from '../../components/core/Typography';
import { RADIUS, SPACING, TYPOGRAPHY } from '../../constants';
import { NavigationProp } from '../../types/navigation-props';
import { Control, useController } from 'react-hook-form';
import { InferType } from 'yup';
import { createInvitationSchema } from './CreateInvitation';
import capitalizeFirstText from '../../utils/capitalizeFirstText';

export default function SelectTemplate({
  control,
  containerStyle,
}: {
  control: Control<InferType<typeof createInvitationSchema>>;
  containerStyle?: StyleProp<ViewStyle>;
}) {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const {height} = useWindowDimensions();
  const {
    field,
    formState: {errors},
  } = useController({
    control,
    name: 'invitation_template_id',
  });
  const flatContainerStyle = StyleSheet.flatten(containerStyle);

  return (
    <View style={{padding: SPACING.md, ...flatContainerStyle}}>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <View
          style={{
            borderRadius: RADIUS.lg,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: errors.invitation_template_id
              ? theme['error-text']
              : theme['border-default'],
          }}>
          <PlatformPressable
            onPress={() => {
              navigation.navigate('Template', {
                action: 'select',
                onSelected: templateId => {
                  field.onChange(templateId);
                  console.log(templateId);
                },
              });
            }}
            style={{
              height: height / 3,
              width: (height / 3 / 4) * 3,
              backgroundColor: theme['bg-surface'],
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {field.value ? (
              <Icon
                name="hide-image"
                color={theme['text-disabled']}
                size={height / 3 / 4}
              />
            ) : (
              <>
                <Icon
                  name="add-circle"
                  color={theme['input-text']}
                  size={TYPOGRAPHY.textStyle.h1.lineHeight}
                />
                <Typography
                  category="regular"
                  color={theme['input-text']}
                  style={{marginTop: SPACING.sm}}>
                  Pilih Template
                </Typography>
              </>
            )}
          </PlatformPressable>
        </View>
      </View>
      {errors.invitation_template_id &&
        typeof errors.invitation_template_id.message === 'string' && (
          <Typography
            category="small"
            style={{marginTop: 5, textAlign: 'center'}}
            color={theme['error-text']}>
            {capitalizeFirstText(errors.invitation_template_id.message)}
          </Typography>
        )}
    </View>
  );
}
