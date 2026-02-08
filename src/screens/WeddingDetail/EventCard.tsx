import { TouchableOpacity, View } from 'react-native';
import Typography from '../../components/core/Typography';
import Icon from '@react-native-vector-icons/material-icons';
import { useTheme } from '../../components/core/AppProvider';
import { RADIUS, SPACING } from '../../constants';
import Button from '../../components/core/Button';
import Confirmation from '../../components/core/Confirmation';

export default function EventCard({
  title,
  date,
  location,
  isMainEvent,
  onEdit,
  onChangeMainEvent,
  isDeleting,
  onDelete,
  disabledControls,
}: {
  title: string;
  date: string;
  location?: string | null;
  isMainEvent?: boolean;
  onEdit?: () => void;
  onChangeMainEvent?: () => void;
  isDeleting?: boolean;
  onDelete?: () => void;
  disabledControls?: boolean;
}) {
  const theme = useTheme();
  return (
    <View
      style={{
        backgroundColor: theme['bg-surface'],
        padding: SPACING.md,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme['border-default'],
      }}>
      <Typography category="large" style={{fontWeight: 500}}>
        {title}
      </Typography>
      <Typography
        category="small"
        color={theme['text-secondary']}
        style={{marginTop: SPACING.xs}}>
        {date}
      </Typography>
      {location && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
            marginTop: 10,
          }}>
          <Icon name="place" size={16} color={theme['text-secondary']} />
          <Typography category="small" color={theme['text-secondary']}>
            {location}
          </Typography>
        </View>
      )}
      <View
        style={{
          flexDirection: 'row',
          gap: SPACING.md,
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: SPACING.md,
        }}>
        <View
          style={{flexDirection: 'row', gap: SPACING.sm, alignItems: 'center'}}>
          {!disabledControls && (
            <>
              <Confirmation
                mode="button"
                onConfirmed={onDelete}
                appearance="basic"
                confirmationDialogAppearance="danger"
                cautionTitle="Hapus Data Acara"
                cautionText="Apakah Anda yakin ingin menghapus data acara ini? Tindakan ini tidak dapat dibatalkan."
                confirmText="Hapus"
                cancelText="Batal"
                isLoading={isDeleting}
                buttonStyle={{
                  paddingVertical: SPACING.xs,
                  borderColor: theme['error-text'],
                }}
                textStyle={{color: theme['error-text']}}>
                Hapus
              </Confirmation>
              <Button
                appearance="basic"
                onPress={onEdit}
                style={{paddingVertical: SPACING.xs}}>
                Edit
              </Button>
            </>
          )}
        </View>
        <TouchableOpacity
          disabled={disabledControls}
          onPress={onChangeMainEvent}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: SPACING.xs,
              justifyContent: 'flex-end',
              borderWidth: 1,
              borderColor: isMainEvent
                ? theme['info-bg']
                : theme['border-default'],
              borderRadius: RADIUS.full,
              padding: SPACING.xxs,
              opacity: isMainEvent ? 1 : 0.75,
            }}>
            {isMainEvent && (
              <Typography
                category="xsmall"
                color={
                  isMainEvent ? theme['info-text'] : theme['text-secondary']
                }
                fontWeight={400}
                style={{paddingHorizontal: SPACING.xs}}>
                Acara Utama
              </Typography>
            )}
            <View
              style={{
                width: 18,
                height: 18,
                borderRadius: RADIUS.full,
                overflow: 'hidden',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: isMainEvent
                  ? theme['info-bg']
                  : theme['secondary-bg'],
              }}>
              <Icon
                name="check"
                size={13}
                color={
                  isMainEvent ? theme['info-text'] : theme['secondary-text']
                }
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
