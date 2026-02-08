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
import {
  AppStackNavigationProp,
  AppStackParamList,
} from '../../types/navigation-type';
import Icon from '@react-native-vector-icons/material-icons';
import ImageCropPicker, { ImageOrVideo } from 'react-native-image-crop-picker';
import useAppNavigation from '../../hooks/useAppNavigation';
import { RouteProp } from '@react-navigation/native';
import {
  createWedding,
  createWeddingPayloadType,
  updateWedding,
  updateWeddingPayloadType,
} from '../../services/wedding';
import errorHandler from '../../helpers/errorHandler';
import useToast from '../../hooks/useToast';
import { APP_API_URL } from '../../config';
import useAppDispatch from '../../hooks/useAppDispatch';
import { patchWedding, pushWedding } from '../../redux/reducers/wedding.reducer';
import Card from '../../components/core/Card';

export const weddingFormSchema = yup.object({
  wedding_template_id: yup.string().required('Template undangan harus dipilih'),
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
  female_nickname: yup.string().optional(),
  female_father_name: yup.string(),
  female_mother_name: yup.string(),
  female_hometown: yup.string().optional(),
  male_name: yup.string().required('Nama pria harus diisi'),
  male_nickname: yup.string().optional(),
  male_father_name: yup.string(),
  male_mother_name: yup.string(),
  male_hometown: yup.string().optional(),
});

type WeddingFormRouteProp = RouteProp<AppStackParamList, 'WeddingForm'>;

export default function WeddingForm({route}: {route?: WeddingFormRouteProp}) {
  const {control, handleSubmit, getValues, setValue} = useForm({
    resolver: yupResolver(weddingFormSchema),
  });
  const theme = useTheme();
  const navigation = useAppNavigation<AppStackNavigationProp>();
  const [isAlertOpened, setIsAlertOpened] = useState<boolean>(false);
  const [femalePhoto, setFemalePhoto] = useState<ImageOrVideo | null>(null);
  const [malePhoto, setMalePhoto] = useState<ImageOrVideo | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const toast = useToast();
  const wedding = route?.params?.wedding;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (wedding) {
      setValue('female_father_name', wedding.brideFatherName ?? '');
      setValue('female_hometown', wedding.brideHometown ?? '');
      setValue('female_mother_name', wedding.brideMotherName ?? '');
      setValue('female_name', wedding.brideName ?? '');
      setValue('female_nickname', wedding.brideNickname ?? '');
      setValue('male_father_name', wedding.groomFatherName ?? '');
      setValue('male_hometown', wedding.groomHometown ?? '');
      setValue('male_mother_name', wedding.groomMotherName ?? '');
      setValue('male_name', wedding.groomName ?? '');
      setValue('male_nickname', wedding.groomNickname ?? '');
      setValue('wedding_template_id', wedding.templateId);
    }
  }, [wedding, setValue, getValues]);

  useEffect(() => {
    if (route?.params?.selectedTemplate) {
      setValue('wedding_template_id', route.params.selectedTemplate);
    }
  }, [route?.params?.selectedTemplate, setValue]);

  const onBackPress = useCallback(
    (fnc?: () => void) => {
      if (isSubmitting) {
        return true;
      }
      const currentValues = getValues();
      let hasDifferent = false;
      const empty: any[] = [undefined, null, ''];
      for (let key of Object.keys(currentValues) as (keyof yup.InferType<
        typeof weddingFormSchema
      >)[]) {
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
    [getValues, isSubmitting],
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
    setIsSubmitting(true);
  });

  const fetchSubmitting = useCallback(
    async (signal?: AbortSignal) => {
      const values = getValues();
      const payload: createWeddingPayloadType | updateWeddingPayloadType = {
        brideName: values.female_name,
        groomName: values.male_name,
        templateId: values.wedding_template_id,
        brideFatherName: values.female_father_name || '',
        brideHometown: values.female_hometown || '',
        brideMotherName: values.female_mother_name || '',
        brideNickname: values.female_nickname || '',
        bridePhoto: values.female_photo,
        groomFatherName: values.male_father_name || '',
        groomHometown: values.male_hometown || '',
        groomMotherName: values.male_mother_name,
        groomNickname: values.male_nickname || '',
        groomPhoto: values.male_photo,
      };
      try {
        const request = () =>
          wedding
            ? updateWedding(wedding.id, payload, signal)
            : createWedding(payload as createWeddingPayloadType, signal);
        const res = await request();
        if (res.status >= 200 && res.status < 300 && res.data) {
          setIsSubmitting(false);
          navigation.goBack();
          if (wedding) {
            dispatch(patchWedding(res.data));
          } else {
            dispatch(pushWedding(res.data));
          }
          toast.show(
            'success',
            `Berhasil ${wedding ? 'mengedit' : 'membuat'} undangan.`,
          );
        } else {
          throw new Error(`Unable to ${wedding ? 'update' : 'create'} wedding`);
        }
      } catch (e) {
        errorHandler(e, (errMsg: string) => {
          toast.show('error', errMsg);
        });
        setIsSubmitting(false);
      }
    },
    [getValues, wedding, navigation, toast, dispatch],
  );

  useEffect(() => {
    const controller = new AbortController();
    if (isSubmitting) {
      fetchSubmitting(controller.signal);
    } else {
      controller.abort();
    }
  }, [isSubmitting, fetchSubmitting]);

  return (
    <ScreenLayout
      title={`${wedding ? 'Edit' : 'Buat'} Undangan`}
      onBackPress={onBackPress}
      footer={
        <Confirmation
          mode="button"
          onConfirmed={onSubmit}
          appearance="primary"
          cautionTitle={`${wedding ? 'Mengedit' : 'Membuat'} undangan`}
          cautionText="Apakah kamu sudah yakin semua data sudah benar?"
          onCancel={() => {}}
          isLoading={isSubmitting}>
          {`${wedding ? 'Edit' : 'Buat'} Undangan`}
        </Confirmation>
      }>
      <>
        <SelectTemplate
          control={control as Control<yup.InferType<typeof weddingFormSchema>>}
        />
        <View style={{marginTop: SPACING.md, gap: SPACING.lg}}>
          <Card
            title={
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
                  <Icon name="female" size={18} color={theme['error-text']} />
                </View>
                <Typography style={{fontWeight: '600'}}>
                  Detail Perempuan
                </Typography>
              </View>
            }>
            <View style={{gap: SPACING.md}}>
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
                  }}
                  disabled={isSubmitting}>
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
                      size={TYPOGRAPHY.textStyle.h1.lineHeight}
                    />
                    {(femalePhoto || wedding?.bridePhotoPath) && (
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
                        source={{
                          uri:
                            femalePhoto?.path ||
                            APP_API_URL +
                              '/file?filePath=' +
                              wedding?.bridePhotoPath,
                        }}
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
                editable={!isSubmitting}
              />
              <Input
                control={control}
                name="female_nickname"
                label="Nama Panggilan"
                placeholder="Nama Panggilan"
                editable={!isSubmitting}
              />
              <Input
                control={control}
                name="female_father_name"
                label={'Nama Ayah'}
                placeholder="Nama ayah"
                editable={!isSubmitting}
              />
              <Input
                control={control}
                name="female_mother_name"
                label={'Nama Ibu'}
                placeholder="Nama ibu"
                editable={!isSubmitting}
              />
              <Input
                control={control}
                name="female_hometown"
                label="Kota Asal"
                placeholder="Contoh: Pekanbaru"
                editable={!isSubmitting}
              />
            </View>
          </Card>
          <Card
            title={
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
                  <Icon name="male" size={18} color={theme['info-text']} />
                </View>
                <Typography style={{fontWeight: '600'}}>Detail Pria</Typography>
              </View>
            }>
            <View
              style={{
                gap: SPACING.md,
              }}>
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
                  }}
                  disabled={isSubmitting}>
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
                      size={TYPOGRAPHY.textStyle.h1.lineHeight}
                    />
                    {(malePhoto || wedding?.groomPhotoPath) && (
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
                        source={{
                          uri:
                            malePhoto?.path ||
                            APP_API_URL +
                              '/file?filePath=' +
                              wedding?.groomPhotoPath,
                        }}
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
                editable={!isSubmitting}
              />
              <Input
                control={control}
                name="male_nickname"
                label="Nama Panggilan"
                placeholder="Nama Panggilan"
                editable={!isSubmitting}
              />
              <Input
                control={control}
                name="male_father_name"
                label={'Nama Ayah'}
                placeholder="Nama ayah"
                editable={!isSubmitting}
              />
              <Input
                control={control}
                name="male_mother_name"
                label={'Nama Ibu'}
                placeholder="Nama ibu"
                editable={!isSubmitting}
              />
              <Input
                control={control}
                name="male_hometown"
                label="Kota Asal"
                placeholder="Contoh: Pekanbaru"
                editable={!isSubmitting}
              />
            </View>
          </Card>
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
          cautionTitle={`Batal ${wedding ? 'mengedit' : 'membuat'} undangan?`}
          cautionText="Semua data yang sudah diisi akan hilang"
          confirmText="Ya, batalkan"
          cancelText={`Lanjut ${wedding ? 'mengedit' : 'membuat'} undangan`}
          appearance="warning"
        />
      </>
    </ScreenLayout>
  );
}
