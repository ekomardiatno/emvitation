import { yupResolver } from '@hookform/resolvers/yup';
import { useController, useForm } from 'react-hook-form';
import { View } from 'react-native';
import * as yup from 'yup';
import Confirmation from '../../components/core/Confirmation';
import DatePicker from '../../components/core/DatePicker';
import Input from '../../components/core/Input';
import ScreenLayout from '../../components/core/ScreenLayout';
import SelectPlace from '../../components/core/SelectPlace';
import {
  AppStackNavigationProp,
  AppStackParamList,
} from '../../types/navigation-type';
import { SPACING } from '../../constants';
import useAppNavigation from '../../hooks/useAppNavigation';
import FieldLabel from '../../components/core/FieldLabel';
import FieldErrorText from '../../components/core/FieldErrorText';
import capitalizeFirstText from '../../utils/capitalizeFirstText';
import { RouteProp } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import useToast from '../../hooks/useToast';
import {
  createEvent,
  createEventPayloadType,
  updateEvent,
} from '../../services/event';
import Checkbox from '../../components/core/Checkbox';
import useAppDispatch from '../../hooks/useAppDispatch';
import { patchEvent, pushEvent } from '../../redux/reducers/event.reducer';
import errorHandler from '../../helpers/errorHandler';
import moment from 'moment';
import useAppSelector from '../../hooks/useAppSelector';

const createEventSchema = yup.object({
  event_name: yup.string().required('Nama acara harus diisi'),
  date: yup
    .string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)')
    .required('Tanggal acara harus diisi'),
  start_time: yup
    .string()
    .matches(/^\d{2}:\d{2}:\d{2}$/, 'Invalid time format (HH:mm:ss)')
    .required('Jam mulai acara harus diisi'),
  end_time: yup
    .string()
    .matches(/^\d{2}:\d{2}:\d{2}$/, 'Invalid time format (HH:mm:ss)')
    .required('Jam selesai acara harus diisi'),
  location_address: yup.string(),
  location_lat_lng: yup.string(),
  is_main_event: yup.boolean(),
});
type EventFormRouteProp = RouteProp<AppStackParamList, 'EventForm'>;

export default function EventForm({route}: {route?: EventFormRouteProp}) {
  const navigation = useAppNavigation<AppStackNavigationProp>();
  const {control, handleSubmit, getValues, setValue} = useForm({
    resolver: yupResolver(createEventSchema),
  });
  const {
    formState: {
      errors: {start_time: startTimeErrors},
    },
  } = useController({
    control,
    name: 'start_time',
    defaultValue: '10:00:00',
  });
  const {
    formState: {
      errors: {end_time: endTimeTimeErrors},
    },
  } = useController({
    control,
    name: 'end_time',
    defaultValue: '17:00:00',
  });
  const toast = useToast();
  const invitationId = route?.params?.invitationId;
  const event = route?.params?.event;
  const {events} = useAppSelector(state => state.event);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (event) {
      setValue('event_name', event.title);
      setValue('date', moment(event.date).format('YYYY-MM-DD'));
      setValue('start_time', event.startTime);
      setValue('end_time', event.endTime);
      setValue('is_main_event', event.isMainEvent);
      setValue('location_address', event.address || '');
      setValue('location_lat_lng', event.location || '');
    }
  }, [event, setValue]);

  const fetchSubmitting = useCallback(
    async (signal?: AbortSignal) => {
      if (!invitationId) {
        setIsSubmitting(false);
        return;
      }
      const values = getValues();
      const data: createEventPayloadType = {
        date: values.date,
        startTime: values.start_time,
        endTime: values.end_time,
        title: values.event_name,
        invitationId: invitationId,
        address: values.location_address || null,
        location: values.location_lat_lng || null,
        isMainEvent: values.is_main_event,
      };
      try {
        const request = () =>
          event
            ? updateEvent(event.id, data, signal)
            : createEvent(data, signal);

        const res = await request();
        if (res.status >= 200 && res.status < 300 && res.data) {
          if (values.is_main_event === true) {
            const otherWeddingEvents = events.filter(
              e => e.invitationId === invitationId,
            );
            for (const otherEvent of otherWeddingEvents) {
              dispatch(patchEvent({...otherEvent, isMainEvent: false}));
            }
          }
          if (event) {
            dispatch(patchEvent(res.data));
          } else {
            dispatch(pushEvent(res.data));
          }
          toast.show(
            'success',
            `Berhasil ${event ? 'mengedit' : 'membuat'} acara`,
          );
          setIsSubmitting(false);
          navigation.goBack();
        } else {
          throw new Error(`Unable to ${event ? 'update' : 'create'} event`);
        }
      } catch (e) {
        errorHandler(e, (errMsg: string) => {
          toast.show('error', errMsg);
        });
        setIsSubmitting(false);
      }
    },
    [invitationId, getValues, event, toast, navigation, events, dispatch],
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
    if (!invitationId) {
      toast.show('error', 'invitationId required');
      navigation.goBack();
    }
  }, [invitationId, navigation, toast]);

  const onSubmit = handleSubmit(() => {
    setIsSubmitting(true);
  });

  return (
    <ScreenLayout
      title={`${event ? 'Edit' : 'Tambah'} Acara`}
      onBackPress={goBack => {
        if (isSubmitting) {
          return;
        }
        goBack();
      }}
      footer={
        <View style={{gap: SPACING.sm}}>
          <Checkbox
            control={control}
            label="Atur sebagai acara utama"
            name="is_main_event"
            defaultValue={false}
            editable={!isSubmitting}
          />
          <Confirmation
            isLoading={isSubmitting}
            mode="button"
            appearance="primary"
            onConfirmed={onSubmit}>
            Simpan
          </Confirmation>
        </View>
      }>
      <View style={{gap: SPACING.md}}>
        <View>
          <View style={{gap: SPACING.md}}>
            <Input
              name="event_name"
              required
              control={control}
              placeholder="Contoh: Resepsi Pernikahan"
              label="Nama Acara"
              editable={!isSubmitting}
            />
            <DatePicker
              name="date"
              required
              control={control}
              label="Tanggal Acara"
              dateOnly
              placeholder="Tue, 08 Jul 25"
              editable={!isSubmitting}
            />
            <View>
              <FieldLabel label="Jam Acara" required />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: SPACING.md,
                }}>
                <View style={{flexGrow: 1}}>
                  <DatePicker
                    name="start_time"
                    required
                    control={control}
                    timeOnly
                    placeholder="10:00:00"
                    defaultValue="10:00:00"
                    hideErrorText
                    editable={!isSubmitting}
                  />
                </View>
                <View style={{flexGrow: 1}}>
                  <DatePicker
                    name="end_time"
                    required
                    control={control}
                    timeOnly
                    placeholder="17:00:00"
                    defaultValue="17:00:00"
                    hideErrorText
                    editable={!isSubmitting}
                  />
                </View>
              </View>
              {(startTimeErrors || endTimeTimeErrors) &&
                typeof (startTimeErrors || endTimeTimeErrors || {message: null})
                  .message === 'string' && (
                  <FieldErrorText>
                    {capitalizeFirstText(
                      (startTimeErrors || endTimeTimeErrors || {message: null})
                        .message || '',
                    )}
                  </FieldErrorText>
                )}
            </View>
            <Input
              name="location_address"
              control={control}
              placeholder="Contoh: Jalan Nusa Indah, No. 1"
              label="Alamat Acara"
              editable={!isSubmitting}
            />
            <SelectPlace
              label="Lokasi Acara"
              name="location_lat_lng"
              control={control}
              editable={!isSubmitting}
            />
          </View>
        </View>
      </View>
    </ScreenLayout>
  );
}
