import { TouchableOpacity, View } from 'react-native';
import Typography from '../../components/core/Typography';
import Icon from '@react-native-vector-icons/material-icons';
import { useTheme } from '../../components/core/AppProvider';
import { SPACING } from '../../constants';
import Button from '../../components/core/Button';

export default function EventCard({
  title,
  date,
  location,
  isMainEvent,
  onEdit,
  onChangeMainEvent,
}: {
  title: string;
  date: string;
  location?: string | null;
  isMainEvent?: boolean;
  onEdit?: () => void;
  onChangeMainEvent?: () => void;
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
      <Typography category="h4" style={{fontWeight: 'bold'}}>
        {title}
      </Typography>
      <Typography
        category="small"
        color={theme['text-secondary']}
        style={{marginTop: 5}}>
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
        <Button
          appearance="basic"
          onPress={onEdit}
          style={{paddingVertical: SPACING.xs}}>
          Edit
        </Button>
        <TouchableOpacity onPress={onChangeMainEvent}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4,
              justifyContent: 'flex-end',
            }}>
            <Typography
              category="small"
              color={
                isMainEvent ? theme['primary-bg'] : theme['text-secondary']
              }>
              {isMainEvent ? 'Acara Utama' : ''}
            </Typography>
            {isMainEvent ? (
              <Icon name="star" size={20} color={theme['primary-bg']} />
            ) : (
              <Icon
                name="star-outline"
                size={20}
                color={theme['text-disabled']}
              />
            )}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
