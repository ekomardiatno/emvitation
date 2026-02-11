import { View } from 'react-native';
import ScreenLayout from '../../components/core/ScreenLayout';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { RADIUS, SPACING } from '../../constants';
import { useTheme } from '../../components/core/AppProvider';
import Button from '../../components/core/Button';
import Icon from '@react-native-vector-icons/material-icons';
import EModal from '../../components/core/EModal';
import Input from '../../components/core/Input';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Confirmation from '../../components/core/Confirmation';
import useAppSelector from '../../hooks/useAppSelector';
import { RouteProp } from '@react-navigation/native';
import { AppStackParamList } from '../../types/navigation-type';
import GuestCard from './GuestCard';
import { createGuest, updateGuest } from '../../services/guest';
import useAppDispatch from '../../hooks/useAppDispatch';
import {
  loadingGuests,
  patchGuest,
  pushGuest,
} from '../../redux/reducers/guest.reducer';
import errorHandler from '../../helpers/errorHandler';
import useToast from '../../hooks/useToast';
import { EmptyState } from '../../components/EmptyState';
import Typography from '../../components/core/Typography';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import KeyboardHeightView from '../../components/core/KeyboardHeightView';
import LoadingState from '../../components/LoadingState';
import { ErrorState } from '../../components/ErrorState';

export const addGuestSchema = yup.object({
  guest_name: yup.string().required('Nama tamu harus diisi'),
});
type ManageGuestRouteProp = RouteProp<AppStackParamList, 'ManageGuest'>;

export default function ManageGuest({route}: {route?: ManageGuestRouteProp}) {
  const theme = useTheme();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {control, handleSubmit, getValues, setValue} = useForm({
    resolver: yupResolver(addGuestSchema),
  });
  const invitationId = route?.params.invitationId;
  const {guests, isLoading, error} = useAppSelector(state => state.guest);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useAppDispatch();
  const toast = useToast();
  const [selectedGuestId, setSelectedGuestId] = useState<string | null>(null);
  const {weddings} = useAppSelector(state => state.wedding);
  const insets = useSafeAreaInsets();

  const invitationGuests = useMemo(() => {
    return guests.filter(g => g.invitationId === invitationId);
  }, [guests, invitationId]);

  const wedding = weddings.find(w => w.invitationId === invitationId);

  const onSubmit = handleSubmit(() => {
    setIsSubmitting(true);
  });

  const fetchSubmitting = useCallback(
    async (signal?: AbortSignal) => {
      if (!invitationId) {
        setIsSubmitting(false);
        return;
      }
      const values = getValues();
      try {
        const request = () =>
          selectedGuestId
            ? updateGuest(
                selectedGuestId,
                {
                  name: values.guest_name,
                },
                signal,
              )
            : createGuest(
                {
                  invitationId,
                  name: values.guest_name,
                },
                signal,
              );
        const res = await request();
        if (res.status >= 200 && res.status && res.data) {
          if (selectedGuestId) {
            dispatch(patchGuest(res.data));
            setSelectedGuestId(state => (state !== null ? null : state));
          } else {
            dispatch(pushGuest(res.data));
          }
          toast.show(
            'success',
            `Berhasil ${selectedGuestId ? 'mengedit' : 'menambah'} tamu`,
          );
          setIsModalVisible(false);
          setIsSubmitting(false);
        } else {
          throw new Error('Unable to create guest');
        }
      } catch (e) {
        errorHandler(e, (errMsg: string) => {
          toast.show('error', errMsg);
        });
        setIsSubmitting(false);
        setIsModalVisible(false);
      }
    },
    [dispatch, getValues, invitationId, toast, selectedGuestId],
  );

  useEffect(() => {
    const controller = new AbortController();
    if (isSubmitting) {
      fetchSubmitting(controller.signal);
    } else {
      controller.abort();
    }
  }, [isSubmitting, fetchSubmitting]);

  useEffect(() => {
    if (isLoading) {
      dispatch(loadingGuests());
    }
  }, [isLoading, dispatch]);

  return (
    <ScreenLayout
      title="Kelola Tamu"
      rightControl={
        <>
          {wedding?.status !== 'published' && (
            <Button
              style={{paddingHorizontal: 12}}
              appearance="transparent"
              onPress={() => {
                setIsModalVisible(true);
                setSelectedGuestId(null);
                setValue('guest_name', '');
              }}>
              <Icon name="add" size={24} color={theme['text-primary']} />
            </Button>
          )}
        </>
      }>
      {isLoading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState
          title="Oops!!"
          message={error}
          onRetry={() => dispatch(loadingGuests())}
          retryLabel="Muat Ulang"
        />
      ) : (
        <>
          {invitationGuests.length < 1 ? (
            <EmptyState
              title="Belum ada tamu"
              message="Daftar tambah masih kosong, Tambahkan tamu pertama."
            />
          ) : (
            <View style={{gap: SPACING.sm}}>
              {invitationGuests.map(g => {
                return (
                  <GuestCard
                    key={g.id}
                    guest={g}
                    invitationId={invitationId}
                    onEdit={() => {
                      setSelectedGuestId(g.id);
                      setIsModalVisible(true);
                      setValue('guest_name', g.name);
                    }}
                    disableEdit={wedding?.status === 'published'}
                  />
                );
              })}
            </View>
          )}
          <EModal
            visible={isModalVisible}
            onClose={() => {
              setIsModalVisible(false);
            }}>
            <View
              style={{
                backgroundColor: theme['bg-surface'],
                padding: SPACING.lg,
                borderTopLeftRadius: RADIUS.md,
                borderTopRightRadius: RADIUS.md,
                paddingBottom: insets.bottom,
              }}>
              <View style={{marginBottom: SPACING.lg}}>
                <Typography category="h4">
                  {selectedGuestId ? 'Edit' : 'Tambah'} Tamu
                </Typography>
                <Typography category="xsmall" fontWeight={300}>
                  {selectedGuestId
                    ? 'Ubah nama tamu yang sudah terdaftar.'
                    : 'Silakan masukkan nama yang ingin ditambahkan'}
                </Typography>
              </View>
              <Input
                control={control}
                name="guest_name"
                placeholder="Nama Tamu"
                label="Nama Tamu"
                required={true}
              />
              <View
                style={{
                  marginTop: SPACING.xl,
                  gap: SPACING.sm,
                }}>
                <Confirmation
                  buttonStyle={{flexGrow: 1}}
                  mode="button"
                  onConfirmed={onSubmit}
                  appearance="primary"
                  onCancel={() => {}}>
                  {`${selectedGuestId ? 'Edit' : 'Tambah'}`}
                </Confirmation>

                <Button
                  appearance="transparent"
                  style={{flexGrow: 1}}
                  onPress={() => setIsModalVisible(false)}>
                  Batal
                </Button>
              </View>

              <KeyboardHeightView />
            </View>
          </EModal>
        </>
      )}
    </ScreenLayout>
  );
}
