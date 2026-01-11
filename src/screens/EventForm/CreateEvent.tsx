import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import * as yup from 'yup';
import Confirmation from '../../components/core/Confirmation';
import DatePicker from '../../components/core/DatePicker';
import Input from '../../components/core/Input';
import ScreenLayout from '../../components/core/ScreenLayout';
import SelectPlace from '../../components/core/SelectPlace';
import { NavigationProp } from '../../types/navigation-props';
import { SPACING } from '../../constants';

const createEventSchema = yup.object({
  event_name: yup.string().required('Nama acara harus diisi'),
  start_timestamp: yup.date().required('Waktu mulai acara harus diisi'),
  end_timestamp: yup.date(),
  location_address: yup.string(),
  location_lat_lng: yup.string(),
});

export default function CreateEvent() {
  const navigation = useNavigation<NavigationProp>();
  const {control, handleSubmit} = useForm({
    resolver: yupResolver(createEventSchema),
  });

  const onSubmit = () => {
    navigation.goBack();
  };

  return (
    <ScreenLayout
      title="Buat Acara"
      onBackPress={goBack => {
        goBack();
      }}
      footer={
        <Confirmation
          mode="button"
          onConfirmed={() => {
            handleSubmit(onSubmit)();
          }}>
          Simpan
        </Confirmation>
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
            />
            <DatePicker
              name="start_timestamp"
              required
              control={control}
              label="Tanggal & Waktu Mulai"
              placeholder="Tue, 08 Jul 25 11:00:00"
            />
            <DatePicker
              name="end_timestamp"
              control={control}
              label="Tanggal & Waktu Mulai"
              placeholder="Tue, 08 Jul 25 16:00:00"
            />
            <Input
              name="location_address"
              control={control}
              placeholder="Contoh: Jalan Nusa Indah, No. 1"
              label="Alamat Acara"
            />
            <SelectPlace
              label="Lokasi Acara"
              name="location_lat_lng"
              control={control}
            />
          </View>
        </View>
      </View>
    </ScreenLayout>
  );
}
