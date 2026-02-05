import { PlatformPressable } from '@react-navigation/elements';
import {
  Image,
  StyleProp,
  StyleSheet,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../../components/core/AppProvider';
import Icon from '@react-native-vector-icons/material-icons';
import Typography from '../../components/core/Typography';
import { RADIUS, SPACING, TYPOGRAPHY } from '../../constants';
import { Control, useController } from 'react-hook-form';
import { InferType } from 'yup';
import { weddingFormSchema } from '.';
import capitalizeFirstText from '../../utils/capitalizeFirstText';
import useAppNavigation from '../../hooks/useAppNavigation';
import { AppStackNavigationProp } from '../../types/navigation-type';
import useAppSelector from '../../hooks/useAppSelector';
import { APP_API_URL } from '../../config';

export default function SelectTemplate({
  control,
  containerStyle,
}: {
  control: Control<InferType<typeof weddingFormSchema>>;
  containerStyle?: StyleProp<ViewStyle>;
}) {
  const theme = useTheme();
  const navigation = useAppNavigation<AppStackNavigationProp>();
  const {height} = useWindowDimensions();
  const {
    field,
    formState: {errors},
  } = useController({
    control,
    name: 'wedding_template_id',
  });
  const flatContainerStyle = StyleSheet.flatten(containerStyle);
  const {templates} = useAppSelector(state => state.template);

  const template = () => {
    if (templates.length < 1) {
      return null;
    }
    const value = field.value;
    if (!value) {
      return null;
    }
    return templates.find(t => t.id === value);
  };

  return (
    <View style={{padding: SPACING.md, ...flatContainerStyle}}>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <View
          style={{
            borderRadius: RADIUS.lg,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: errors.wedding_template_id
              ? theme['error-text']
              : theme['border-default'],
          }}>
          <PlatformPressable
            onPress={() => {
              navigation.navigate('Template', {
                action: 'select',
                selectedTemplate: field.value,
                from: 'WeddingForm',
              });
            }}
            style={{
              height: height / 3,
              width: (height / 3 / 4) * 3,
              backgroundColor: theme['bg-surface'],
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {field.value && template() ? (
              <Image
                source={{
                  uri:
                    APP_API_URL +
                    '/file?filePath=' +
                    template()?.previewImagePath,
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'relative',
                  zIndex: 1,
                }}
                resizeMode="cover"
              />
            ) : field.value && !template() ? (
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
      {errors.wedding_template_id &&
        typeof errors.wedding_template_id.message === 'string' && (
          <Typography
            category="small"
            style={{marginTop: 5, textAlign: 'center'}}
            color={theme['error-text']}>
            {capitalizeFirstText(errors.wedding_template_id.message)}
          </Typography>
        )}
    </View>
  );
}
