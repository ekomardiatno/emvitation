import { useCallback, useEffect, useState } from 'react';
import ScreenLayout from '../../components/core/ScreenLayout';
import { RADIUS, SPACING, TYPOGRAPHY } from '../../constants';
import { BackHandler, Image, Pressable, View } from 'react-native';
import * as yup from 'yup';
import { Control, useForm } from 'react-hook-form';
import Input from '../../components/core/Input';
import Typography from '../../components/core/Typography';
import { useTheme } from '../../components/core/AppProvider';
import Confirmation from '../../components/core/Confirmation';
import SelectTemplate from './SelectTemplate';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../../types/navigation-props';
import Icon from '@react-native-vector-icons/material-icons';
import ImageCropPicker, { ImageOrVideo } from 'react-native-image-crop-picker';

export const createInvitationSchema = yup.object({
  invitation_template_id: yup
    .number()
    .required('Template undangan harus dipilih'),
  female_photo: yup.object({
    filename: yup.string(),
    uri: yup.string(),
    type: yup.string(),
  }),
  male_photo: yup.object({
    filename: yup.string(),
    uri: yup.string(),
    type: yup.string(),
  }),
  female_name: yup.string().required('Nama wanita harus diisi'),
  female_birth_order: yup.number().required('Anak ke- wanita harus diisi'),
  female_father_name: yup.string().required('Nama ayah wanita harus diisi'),
  female_mother_name: yup.string().required('Nama ibu wanita harus diisi'),
  female_ig: yup.string().optional(),
  female_hometown: yup.string().optional(),
  male_name: yup.string().required('Nama pria harus diisi'),
  male_birth_order: yup.number().required('Anak ke- pria harus diisi'),
  male_father_name: yup.string().required('Nama ayah pria harus diisi'),
  male_mother_name: yup.string().required('Nama ibu pria harus diisi'),
  male_ig: yup.string().optional(),
  male_hometown: yup.string().optional(),
});

export default function CreateInvitation() {
  const {control, handleSubmit, getValues, setValue} = useForm({
    resolver: yupResolver(createInvitationSchema),
  });
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const [isAlertOpened, setIsAlertOpened] = useState<boolean>(false);
  const [femalePhoto, setFemalePhoto] = useState<ImageOrVideo | null>(null);
  const [malePhoto, setMalePhoto] = useState<ImageOrVideo | null>(null);

  useEffect(() => {
    setValue('female_birth_order', 1);
    setValue('male_birth_order', 1);
  }, [setValue]);

  const onBackPress = useCallback(
    (fnc?: () => void) => {
      const currentValues = getValues();
      let hasDifferent = false;
      const empty: any[] = [undefined, null, ''];
      for (let key of Object.keys(currentValues) as (keyof yup.InferType<
        typeof createInvitationSchema
      >)[]) {
        if (key === 'male_birth_order' || key === 'female_birth_order') {
          empty.push(1);
        }
        if (!empty.includes(currentValues[key])) {
          hasDifferent = true;
          break;
        } else {
          if (empty.includes(1)) {
            empty.pop();
          }
          continue;
        }
      }
      if (hasDifferent) {
        setIsAlertOpened(true);
        return true;
      }
      if (fnc) {
        fnc();
      }
    },
    [getValues],
  );

  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress,
    );
    return () => {
      subscription.remove();
    };
  }, [onBackPress]);

  const onSubmit = handleSubmit(() => {
    console.log(getValues());
  });

  return (
    <ScreenLayout
      title="Buat Undangan"
      onBackPress={onBackPress}
      footer={
        <Confirmation
          mode="button"
          onConfirmed={onSubmit}
          appearance="primary"
          onCancel={() => {}}>
          Buat Undangan
        </Confirmation>
      }>
      <>
        <SelectTemplate
          control={
            control as Control<yup.InferType<typeof createInvitationSchema>>
          }
        />
        <View style={{marginTop: SPACING.md}}>
          <View
            style={{
              borderWidth: 1,
              borderColor: theme['border-default'],
              borderRadius: RADIUS.lg,
              padding: SPACING.md,
              gap: SPACING.md,
              marginBottom: SPACING.md,
              backgroundColor: theme['bg-surface'],
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: SPACING.sm,
              }}>
              <View
                style={{
                  backgroundColor: theme['info-bg'],
                  borderRadius: RADIUS.full,
                }}>
                <Icon name="female" size={18} color={theme['info-text']} />
              </View>
              <Typography style={{fontWeight: '600'}}>Detail Wanita</Typography>
            </View>

            <View style={{alignItems: 'center', marginBottom: SPACING.lg}}>
              <Pressable
                onPress={() => {
                  ImageCropPicker.openPicker({
                    width: 500,
                    height: 500,
                    cropping: true,
                  }).then(image => {
                    setValue('female_photo', {
                      uri: image.path,
                      type: image.mime,
                      filename: image.filename,
                    });
                    setFemalePhoto(image);
                  });
                }}>
                <View
                  style={{
                    height: 180,
                    width: 180,
                    backgroundColor: theme['bg-muted'],
                    borderRadius: RADIUS.full,
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    borderWidth: SPACING.xs,
                    borderColor: theme['border-default'],
                    elevation: femalePhoto ? 5 : 0,
                  }}>
                  <Icon
                    name="image"
                    color={theme['text-disabled']}
                    size={TYPOGRAPHY.textStyle.large.lineHeight}
                  />
                  {femalePhoto && (
                    <Image
                      width={180}
                      height={180}
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        width: 180,
                        height: 180,
                      }}
                      source={{uri: femalePhoto?.path}}
                    />
                  )}
                </View>
              </Pressable>
            </View>
            <Input
              control={control}
              required={true}
              name="female_name"
              label="Nama"
              placeholder="Nama Lengkap"
            />
            <Input
              control={control}
              keyboardType="numeric"
              name="female_birth_order"
              label={'Anak ke-'}
              placeholder="Anak ke berapa"
            />
            <Input
              control={control}
              required={true}
              name="female_father_name"
              label={'Nama Ayah'}
              placeholder="Nama ayah"
            />
            <Input
              control={control}
              required={true}
              name="female_mother_name"
              label={'Nama Ibu'}
              placeholder="Nama ibu"
            />
            <Input
              control={control}
              required={false}
              name="female_ig"
              label="Akun Instagram"
              placeholder="@username"
            />
            <Input
              control={control}
              required={false}
              name="female_hometown"
              label="Kota Asal"
              placeholder="Contoh: Pekanbaru"
            />
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: theme['border-default'],
              borderRadius: RADIUS.lg,
              padding: SPACING.md,
              gap: SPACING.md,
              backgroundColor: theme['bg-surface'],
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: SPACING.sm,
              }}>
              <View
                style={{
                  backgroundColor: theme['error-bg'],
                  borderRadius: RADIUS.full,
                }}>
                <Icon name="male" size={18} color={theme['error-text']} />
              </View>
              <Typography style={{fontWeight: '600'}}>Detail Pria</Typography>
            </View>

            <View style={{alignItems: 'center', marginBottom: SPACING.lg}}>
              <Pressable
                onPress={() => {
                  ImageCropPicker.openPicker({
                    width: 500,
                    height: 500,
                    cropping: true,
                  }).then(image => {
                    setValue('male_photo', {
                      uri: image.path,
                      type: image.mime,
                      filename: image.filename,
                    });
                    setMalePhoto(image);
                  });
                }}>
                <View
                  style={{
                    height: 180,
                    width: 180,
                    backgroundColor: theme['bg-muted'],
                    borderRadius: RADIUS.full,
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    borderWidth: SPACING.xs,
                    borderColor: theme['border-default'],
                    elevation: malePhoto ? 5 : 0,
                  }}>
                  <Icon
                    name="image"
                    color={theme['text-disabled']}
                    size={TYPOGRAPHY.textStyle.large.lineHeight}
                  />
                  {malePhoto && (
                    <Image
                      width={180}
                      height={180}
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        width: 180,
                        height: 180,
                      }}
                      source={{uri: malePhoto?.path}}
                    />
                  )}
                </View>
              </Pressable>
            </View>
            <Input
              control={control}
              required={true}
              name="male_name"
              label="Nama"
              placeholder="Nama Lengkap"
            />
            <Input
              control={control}
              keyboardType="numeric"
              name="male_birth_order"
              label={'Anak ke-'}
              placeholder="Anak ke berapa"
            />
            <Input
              control={control}
              required={true}
              name="male_father_name"
              label={'Nama Ayah'}
              placeholder="Nama ayah"
            />
            <Input
              control={control}
              required={true}
              name="male_mother_name"
              label={'Nama Ibu'}
              placeholder="Nama ibu"
            />
            <Input
              control={control}
              required={false}
              name="male_ig"
              label="Akun Instagram"
              placeholder="@username"
            />
            <Input
              control={control}
              required={false}
              name="male_hometown"
              label="Kota Asal"
              placeholder="Contoh: Pekanbaru"
            />
          </View>
        </View>
        <Confirmation
          visible={isAlertOpened}
          onConfirmed={() => {
            setIsAlertOpened(false);
            navigation.goBack();
          }}
          onCancel={() => {
            setIsAlertOpened(false);
          }}
          cautionTitle="Batal membuat undangan?"
          cautionText="Semua data yang sudah diisi akan hilang"
          confirmText="Ya, batalkan"
          cancelText="Lanjutkan membuat undangan"
          appearance="warning"
        />
      </>
    </ScreenLayout>
  );
}
