import { Platform, useWindowDimensions, View } from 'react-native';
import ScreenLayout from '../../components/core/ScreenLayout';
import { useState } from 'react';
import { RADIUS, SPACING } from '../../constants';
import { useTheme } from '../../components/core/AppProvider';
import Typography from '../../components/core/Typography';
import Button from '../../components/core/Button';
import Icon from '@react-native-vector-icons/material-icons';
import EModal from '../../components/core/EModal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Input from '../../components/core/Input';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Confirmation from '../../components/core/Confirmation';

export const addGuestSchema = yup.object({
  guest_name: yup.string().required('Nama tamu harus diisi'),
});

export default function ManageGuest() {
  const theme = useTheme();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {width, height} = useWindowDimensions();
  const {top} = useSafeAreaInsets();
  const {control, handleSubmit} = useForm({
    resolver: yupResolver(addGuestSchema),
  });

  const onSubmit = (props: yup.InferType<typeof addGuestSchema>) => {
    console.log(props);
  };

  return (
    <ScreenLayout
      title="Kelola Tamu"
      rightControl={
        <Button
          style={{paddingHorizontal: 12}}
          appearance="transparent"
          onPress={() => {
            setIsModalVisible(true);
          }}>
          <Icon name="add" size={24} color={theme['text-primary']} />
        </Button>
      }>
      <>
        <View style={{gap: 10}}>
          <View
            style={{
              padding: 8,
              paddingLeft: 8 * 2,
              borderRadius: 16,
              backgroundColor: theme['secondary-bg'],
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
            }}>
            <View style={{flex: 1}}>
              <Typography category="h4">John Doe</Typography>
            </View>
            <Button appearance="transparent">
              <Icon name="share" size={18} color={theme['secondary-text']} />
            </Button>
          </View>
          <View
            style={{
              padding: 8,
              paddingLeft: 8 * 2,
              borderRadius: 16,
              backgroundColor: theme['secondary-bg'],
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
            }}>
            <View style={{flex: 1}}>
              <Typography category="h4">Johnathan Doe</Typography>
            </View>
            <Button appearance="transparent">
              <Icon name="share" size={18} color={theme['secondary-text']} />
            </Button>
          </View>
        </View>
        <EModal
          visible={isModalVisible}
          onClose={() => {
            setIsModalVisible(false);
          }}>
          <View
            style={{
              backgroundColor: theme['bg-surface'],
              padding: SPACING.md,
              borderWidth: 1,
              borderRadius: RADIUS.lg,
              borderColor: theme['border-default'],
              width:
                width < height
                  ? width - SPACING.md * 2
                  : height - SPACING.md * 2,
              marginBottom: Platform.OS === 'ios' ? SPACING.md * 3 : top,
            }}>
            <Input
              control={control}
              name="guest_name"
              placeholder="Nama Tamu"
              label="Nama Tamu"
              required={true}
            />
            <View style={{marginTop: 16}}>
              <Confirmation
                mode="button"
                onConfirmed={() => {
                  handleSubmit(onSubmit)();
                }}
                appearance="primary"
                onCancel={() => {}}>
                Tambah Tamu
              </Confirmation>
            </View>
          </View>
        </EModal>
      </>
    </ScreenLayout>
  );
}
