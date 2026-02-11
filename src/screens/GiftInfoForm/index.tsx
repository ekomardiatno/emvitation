import { RouteProp } from '@react-navigation/native';
import { AppStackParamList } from '../../types/navigation-type';
import ScreenLayout from '../../components/core/ScreenLayout';
import { CONTAINER_GUTTER, PROVIDERS, RADIUS, SPACING } from '../../constants';
import { Image, useWindowDimensions, View } from 'react-native';
import { useTheme } from '../../components/core/AppProvider';
import { PlatformPressable } from '@react-navigation/elements';
import Button from '../../components/core/Button';
import { useCallback, useEffect, useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useController, useForm } from 'react-hook-form';
import FieldErrorText from '../../components/core/FieldErrorText';
import capitalizeFirstText from '../../utils/capitalizeFirstText';
import Input from '../../components/core/Input';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import Confirmation from '../../components/core/Confirmation';
import {
  addGiftInfo,
  createGiftInfoPayloadType,
  updateGiftInfo,
  updateGiftInfoPayloadType,
} from '../../services/giftInfo';
import useAppNavigation from '../../hooks/useAppNavigation';
import useToast from '../../hooks/useToast';
import { ApiError } from '../../services/common';
import useAppDispatch from '../../hooks/useAppDispatch';
import { pushGiftInfo } from '../../redux/reducers/gift-info.reducer';
import useAppSelector from '../../hooks/useAppSelector';

type GiftInfoFormRouteProp = RouteProp<AppStackParamList, 'GiftInfoForm'>;

const createGiftInfoSchema = yup.object({
  providerName: yup.string().required('Nama provider harus dipilih'),
  accountHolder: yup.string().required('Nama pemilik akun harus diisi'),
  accountNumber: yup.string().required('Nomor rekening / akun harus diisi'),
});

export default function GiftInfoForm({route}: {route?: GiftInfoFormRouteProp}) {
  const theme = useTheme();
  const {width} = useWindowDimensions();
  const [providerType, setProviderType] = useState<'bank' | 'e-wallet'>('bank');
  const {control, handleSubmit, getValues, setValue, clearErrors} = useForm({
    resolver: yupResolver(createGiftInfoSchema),
  });
  const {
    formState: {
      errors: {providerName: providerNameError},
    },
  } = useController({
    control,
    name: 'providerName',
  });
  const invitationId = route?.params?.invitationId || '';
  const giftInfoId = route?.params?.giftInfoId || '';
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigation = useAppNavigation();
  const toast = useToast();
  const dispatch = useAppDispatch();
  const {giftInfos} = useAppSelector(state => state.giftInfo);

  useEffect(() => {
    if (giftInfoId && giftInfos.length > 0) {
      const giftInfo = giftInfos.find(g => g.id === giftInfoId);
      if (giftInfo) {
        setValue('providerName', giftInfo.provider);
        setValue('accountHolder', giftInfo.accountName);
        setValue('accountNumber', giftInfo.accountNumber);
        setProviderType(giftInfo.type);
      }
    } else {
      // reset form if no giftInfoId
      setValue('providerName', '');
      setValue('accountHolder', '');
      setValue('accountNumber', '');
      setProviderType('bank');
    }
  }, [giftInfoId, giftInfos, setValue]);

  const onSubmit = handleSubmit(() => {
    setIsSubmitting(true);
  });

  const fetchSubmitting = useCallback(
    async (signal?: AbortSignal) => {
      try {
        const values = getValues();
        const payload = {
          type: providerType,
          provider: values.providerName,
          accountName: values.accountHolder,
          accountNumber: values.accountNumber,
        };
        if (!giftInfoId) {
          (payload as createGiftInfoPayloadType).invitationId = invitationId;
        }
        const request = () => {
          if (giftInfoId) {
            return updateGiftInfo(
              giftInfoId,
              payload as updateGiftInfoPayloadType,
              signal,
            );
          } else {
            return addGiftInfo(payload as createGiftInfoPayloadType, signal);
          }
        };
        const res = await request();
        if (res.status >= 200 && res.status < 300) {
          // go back after success
          dispatch(pushGiftInfo(res.data));
          navigation.goBack();
          toast.show(
            'success',
            `Amplop digital berhasil ${
              giftInfoId ? 'diperbarui' : 'ditambahkan'
            }`,
          );
          setIsSubmitting(false);
        } else {
          throw new Error('Unable to submit gift info');
        }
      } catch (e) {
        if (
          (e instanceof Error && e.message !== 'canceled') ||
          (e as ApiError).message
        ) {
          toast.show(
            'error',
            (e as Error | ApiError)?.message || 'Unknown error',
          );
        }
        setIsSubmitting(false);
      }
    },
    [
      getValues,
      giftInfoId,
      invitationId,
      navigation,
      toast,
      dispatch,
      providerType,
    ],
  );

  useEffect(() => {
    const controller = new AbortController();
    if (isSubmitting) {
      fetchSubmitting(controller.signal);
    }
    return () => {
      controller.abort();
    };
  }, [isSubmitting, fetchSubmitting]);

  return (
    <ScreenLayout
      title={`${route?.params?.giftInfoId ? 'Edit' : 'Tambah'} Amplop Digital`}
      footer={
        <Confirmation
          mode="button"
          appearance="primary"
          isLoading={isSubmitting}
          cautionTitle="Periksa kembali data amplop digital"
          cautionText="Pastikan data yang Anda masukkan sudah benar sebelum melanjutkan."
          confirmText={`${
            route?.params?.giftInfoId ? 'Simpan Perubahan' : 'Tambah'
          }`}
          cancelText="Kembali"
          onConfirmed={onSubmit}>
          {route?.params?.giftInfoId ? 'Simpan Perubahan' : 'Tambah'}
        </Confirmation>
      }>
      <View
        style={{
          borderWidth: 1,
          borderColor: theme['border-default'],
          borderRadius: RADIUS.full,
          padding: SPACING.sm,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Button
          appearance={providerType === 'bank' ? 'primary' : 'transparent'}
          style={{flexGrow: 1}}
          onPress={() => {
            setValue('providerName', '');
            setProviderType('bank');
          }}>
          Bank
        </Button>
        <Button
          appearance={providerType === 'e-wallet' ? 'primary' : 'transparent'}
          style={{flexGrow: 1}}
          onPress={() => {
            setValue('providerName', '');
            setProviderType('e-wallet');
          }}>
          E-Wallet
        </Button>
      </View>
      {providerNameError &&
        typeof (providerNameError || {message: null}).message === 'string' && (
          <View
            style={{
              flexDirection: 'row',
              gap: SPACING.xs,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: SPACING.sm,
            }}>
            <MaterialIcons name="error" color={theme['error-text']} />
            <FieldErrorText>
              {capitalizeFirstText(
                (providerNameError || {message: null}).message || '',
              )}
            </FieldErrorText>
          </View>
        )}
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: SPACING.md,
          marginTop: SPACING.md,
        }}>
        {PROVIDERS.filter(p => p.type === providerType).map(provider => (
          <View
            key={provider.name}
            style={{
              borderWidth: 2,
              borderColor:
                provider.name === getValues('providerName')
                  ? theme['primary-bg']
                  : theme['border-muted'],
              borderRadius: RADIUS.lg,
              overflow: 'hidden',
              backgroundColor:
                provider.name === getValues('providerName')
                  ? theme['bg-surface']
                  : theme['secondary-disabled-bg'],
            }}>
            <PlatformPressable
              style={{
                alignItems: 'center',
                padding: SPACING.sm,
              }}
              pressColor={theme['secondary-bg']}
              onPress={() => {
                setValue('providerName', provider.name);
                // remove error when selecting provider
                if (providerNameError) {
                  clearErrors('providerName');
                }
              }}>
              <Image
                source={
                  provider.logo[theme.schema === 'dark' ? 'white' : 'regular']
                }
                style={{
                  width:
                    (width - CONTAINER_GUTTER * 4 - SPACING.sm * 2 * 3 - 4 * 3) / 3,
                  height:
                    (width - CONTAINER_GUTTER * 4 - SPACING.sm * 2 * 3 - 4 * 3) / 3,
                  resizeMode: 'contain',
                }}
              />
            </PlatformPressable>
          </View>
        ))}
      </View>
      <View style={{marginTop: SPACING.lg, gap: SPACING.md}}>
        <Input
          control={control}
          name="accountHolder"
          required
          label="Nama Pemilik Akun"
          placeholder="Contoh: Eko Mardiatno"
        />
        <Input
          control={control}
          name="accountNumber"
          required
          label="Nomor Rekening / Akun"
          keyboardType="numeric"
          placeholder="Contoh: 1234567890"
        />
      </View>
    </ScreenLayout>
  );
}
