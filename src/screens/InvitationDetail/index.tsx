import { TouchableOpacity, View } from 'react-native';
import ScreenLayout from '../../components/core/ScreenLayout';
import { useTheme } from '../../components/core/AppProvider';
import Typography from '../../components/core/Typography';
import Icon from '@react-native-vector-icons/material-icons';
import EventCard from './EventCard';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../../types/navigation-props';
import { SPACING } from '../../constants';

export default function InvitationDetail() {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp>();
  return (
    <ScreenLayout title="Detail Undangan">
      <View style={{gap: SPACING.md}}>
        <View
          style={{
            padding: SPACING.md,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: theme['border-default'],
            backgroundColor: theme['bg-surface'],
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 6,
              marginBottom: SPACING.md,
            }}>
            <Typography style={{fontWeight: 'bold'}}>
              Detail Pasangan
            </Typography>
            <TouchableOpacity
              style={{
                padding: 4,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon name="edit" size={20} color={theme['secondary-text']} />
            </TouchableOpacity>
          </View>
          <View style={{gap: SPACING.md}}>
            <View
              style={{
                padding: 10,
                borderRadius: 8,
                flexDirection: 'row',
                gap: 8,
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
                borderWidth: 1,
                borderColor: theme.divider,
              }}>
              <View
                style={{
                  position: 'absolute',
                  right: 10,
                  top: 10,
                }}>
                <Icon name="male" size={50} color={theme['info-bg']} />
              </View>
              <View>
                <Typography>John Doe</Typography>
                <Typography
                  category="small"
                  color={theme['text-secondary']}
                  style={{marginTop: 2}}>
                  Putra dari James Doe & Joanne Doe
                </Typography>
                <Typography category="small" style={{marginTop: 6}}>
                  Rengat
                </Typography>
              </View>
            </View>
            <View
              style={{
                padding: 10,
                borderRadius: 8,
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 8,
                alignItems: 'center',
                borderWidth: 1,
                borderColor: theme.divider,
              }}>
              <View>
                <Typography>Jane Doe</Typography>
                <Typography
                  category="small"
                  color={theme['text-secondary']}
                  style={{marginTop: 2}}>
                  Putri dari Jack Doe & Jinny Doe
                </Typography>
                <Typography category="small" style={{marginTop: 6}}>
                  Rengat
                </Typography>
              </View>
              <Icon name="female" size={50} color={theme['error-bg']} />
            </View>
          </View>
        </View>
        <View
          style={{
            padding: SPACING.md,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: theme['border-default'],
            backgroundColor: theme['bg-surface'],
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 8,
              marginBottom: SPACING.md,
            }}>
            <Typography style={{fontWeight: 'bold'}}>Daftar Acara</Typography>
            <TouchableOpacity
              style={{
                padding: 4,
                borderRadius: 8,
                backgroundColor: theme['primary-bg'],
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                navigation.navigate('CreateEvent');
              }}>
              <Icon name="add" size={20} color={theme['primary-text']} />
            </TouchableOpacity>
          </View>
          <View style={{gap: SPACING.md}}>
            <EventCard
              title="Akad Nikah"
              date="Sabtu, 06 Januari 2025 10:00 AM - 11:00 PM"
              location="Jl. Raya No. 123, Jakarta"
            />
            <EventCard
              title="Resepsi Pernikahan"
              date="Sabtu, 07 Januari 2025 10:00 AM - 17:00 PM"
              location="Jl. Raya No. 123, Jakarta"
              isMainEvent
            />
          </View>
        </View>
      </View>
    </ScreenLayout>
  );
}
