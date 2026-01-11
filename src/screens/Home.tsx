/* eslint-disable react/self-closing-comp */
import { RADIUS, SPACING } from '../constants';
import { useWindowDimensions, View } from 'react-native';
import PressableCard from '../components/core/PressableCard';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../types/navigation-props';
import { useTheme } from '../components/core/AppProvider';
import Typography from '../components/core/Typography';
import Icon from '@react-native-vector-icons/material-icons';
import ScreenLayout from '../components/core/ScreenLayout';

export default function Home() {
  const navigation = useNavigation<NavigationProp>();
  const {width} = useWindowDimensions();
  const theme = useTheme();
  return (
    <ScreenLayout headerEnabled={false}>
      <View>
        <View
          style={{
            padding: SPACING.md,
            borderWidth: 1,
            borderColor: theme['border-default'],
            backgroundColor: theme['bg-surface'],
            borderRadius: RADIUS.lg,
            marginBottom: SPACING.md,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: SPACING.md,
            }}>
            <View>
              <Typography category="h4">Hai, Eko</Typography>
              <Typography category="small">Siap membuat undangan?</Typography>
            </View>
            <View style={{position: 'relative', paddingLeft: 22}}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  backgroundColor: theme['info-bg'],
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Typography
                  category="h2"
                  color={theme['info-text']}
                  style={{textTransform: 'uppercase'}}>
                  EM
                </Typography>
              </View>
            </View>
          </View>
        </View>
        <View style={{gap: 10, flexDirection: 'row'}}>
          <PressableCard
            title="Buat Undangan"
            shortDescription="Buat undangan baru"
            iconName="add"
            width={(width - SPACING.md * 2 - 10) / 2}
            onPress={() => navigation.navigate('CreateInvitation')}
            variant="info"
          />
          <PressableCard
            title="Undangan Saya"
            iconName="description"
            shortDescription="Lihat dan kelola undangan"
            width={(width - SPACING.md * 2 - 10) / 2}
            onPress={() => navigation.navigate('MyInvitation')}
            variant="success"
          />
        </View>
        <View
          style={{
            padding: 10,
            flexDirection: 'row',
            gap: SPACING.md,
            backgroundColor: theme['bg-surface'],
            borderWidth: 1,
            borderColor: theme['border-default'],
            marginTop: SPACING.md,
            borderRadius: RADIUS.lg,
          }}>
          <View
            style={{
              flexDirection: 'row',
              flexGrow: 1,
              alignItems: 'center',
              gap: 10,
            }}>
            <View
              style={{
                width: 30,
                height: 30,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: theme['error-bg'],
                borderRadius: 30,
              }}>
              <Icon
                name="insert-invitation"
                size={15}
                style={{color: theme['error-text']}}
              />
            </View>
            <View>
              <Typography category="xsmall" numberOfLines={1}>
                Undangan Aktif
              </Typography>
              <Typography category="small">1</Typography>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flexGrow: 1,
              alignItems: 'center',
              gap: 10,
            }}>
            <View
              style={{
                width: 30,
                height: 30,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: theme['warning-bg'],
                borderRadius: 30,
              }}>
              <Icon
                name="insert-invitation"
                size={15}
                style={{color: theme['warning-text']}}
              />
            </View>
            <View>
              <Typography category="xsmall" numberOfLines={1}>
                Tamu Terdaftar
              </Typography>
              <Typography category="small">120</Typography>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flexGrow: 1,
              alignItems: 'center',
              gap: 10,
            }}>
            <View
              style={{
                width: 30,
                height: 30,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: theme['info-bg'],
                borderRadius: 30,
              }}>
              <Icon
                name="insert-invitation"
                size={15}
                style={{color: theme['info-text']}}
              />
            </View>
            <View>
              <Typography category="xsmall" numberOfLines={1}>
                RSVP Masuk
              </Typography>
              <Typography category="small">25</Typography>
            </View>
          </View>
        </View>
      </View>
    </ScreenLayout>
  );
}
