import { TouchableOpacity, View } from 'react-native';
import Typography from '../../components/core/Typography';
import Icon from '@react-native-vector-icons/material-icons';
import { useTheme } from '../../components/core/AppProvider';
import { SPACING } from '../../constants';

export default function EventCard({
  title,
  date,
  location,
  isMainEvent,
}: {
  title: string;
  date: string;
  location: string;
  isMainEvent?: boolean;
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
      <View
        style={{
          flexDirection: 'row',
          gap: SPACING.md,
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: SPACING.md,
        }}>
        <TouchableOpacity
          style={{
            padding: 8,
            paddingHorizontal: 10,
            paddingRight: 12,
            borderRadius: 8,
            backgroundColor: theme['secondary-bg'],
            alignItems: 'center',
            flexDirection: 'row',
            gap: 8,
          }}>
          <Icon name="edit" size={13} color={theme['secondary-text']} />
          <Typography color={theme['secondary-text']} category="small">
            Edit
          </Typography>
        </TouchableOpacity>
        <TouchableOpacity>
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
