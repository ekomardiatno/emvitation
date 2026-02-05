/* eslint-disable react/self-closing-comp */
import { SPACING } from '../../constants';
import {
  ActivityIndicator,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import PressableCard from '../../components/core/PressableCard';
import { AppStackNavigationProp } from '../../types/navigation-type';
import { useTheme } from '../../components/core/AppProvider';
import Typography from '../../components/core/Typography';
import ScreenLayout from '../../components/core/ScreenLayout';
import useAppNavigation from '../../hooks/useAppNavigation';
import useAppSelector from '../../hooks/useAppSelector';
import getInitials from '../../utils/getInitials';
import Card from '../../components/core/Card';
import { EmptyState } from '../../components/EmptyState';
import { useEffect, useMemo } from 'react';
import useAppDispatch from '../../hooks/useAppDispatch';
import { loadingWeddings } from '../../redux/reducers/wedding.reducer';
import Button from '../../components/core/Button';
import { WeddingCard } from '../MyWedding/WeddingCard';
import VendorSection from './VendorSection';

export default function Home() {
  const navigation = useAppNavigation<AppStackNavigationProp>();
  const {width} = useWindowDimensions();
  const theme = useTheme();
  const {isLoading, data} = useAppSelector(state => state.profile);
  const {isLoading: isWeddingLoading, weddings} = useAppSelector(
    state => state.wedding,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isWeddingLoading) {
      dispatch(loadingWeddings());
    }
  }, [isWeddingLoading, dispatch]);

  const latestUnpublishedWedding = useMemo(() => {
    const wedding = weddings
      .filter(w => w.status === 'draft')
      .sort((a, b) => {
        const aCreatedAt = new Date(a.createdAt).getTime();
        const bCreatedAt = new Date(b.createdAt).getTime();
        return bCreatedAt - aCreatedAt;
      });
    return wedding.at(0);
  }, [weddings]);

  return (
    <ScreenLayout headerEnabled={false}>
      <View
        style={{
          paddingVertical: SPACING.sm,
          marginBottom: SPACING.md,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: SPACING.md,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: SPACING.md,
            }}>
            <Image
              source={require('../../assets/images/logo.webp')}
              resizeMode="contain"
              style={{width: 30, height: 30}}
            />
            <Typography
              category="h2"
              fontWeight={500}
              color={theme['text-primary']}>
              EMVITE
            </Typography>
          </View>
          <View style={{position: 'relative', paddingLeft: 22}}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Profile');
              }}>
              <View
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 38,
                  borderWidth: SPACING.xxs,
                  borderColor: isLoading
                    ? theme['border-default']
                    : theme['info-text'],
                  backgroundColor: isLoading
                    ? theme['secondary-bg']
                    : theme['info-bg'],
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {isLoading ? (
                  <ActivityIndicator
                    color={theme['secondary-text']}
                    size={20}
                  />
                ) : (
                  <Typography
                    category="regular"
                    fontWeight={700}
                    color={theme['info-text']}
                    style={{textTransform: 'uppercase'}}>
                    {getInitials(data.name || '')}
                  </Typography>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View>
        <View style={{gap: SPACING.md, flexDirection: 'row'}}>
          <PressableCard
            title="Buat Undangan"
            shortDescription="Buat undangan baru"
            iconName="add"
            width={(width - SPACING.md * 2 - SPACING.md) / 2}
            onPress={() => navigation.navigate('WeddingForm')}
            variant="info"
          />
          <PressableCard
            title="Undangan Saya"
            iconName="description"
            shortDescription="Lihat dan kelola undangan"
            width={(width - SPACING.md * 2 - SPACING.md) / 2}
            onPress={() => navigation.navigate('MyWedding')}
            variant="success"
          />
        </View>
        <View style={{marginTop: SPACING.lg}}>
          <Card
            title={latestUnpublishedWedding ? 'Undangan terakhir' : undefined}
            rightControl={
              latestUnpublishedWedding ? (
                <View style={{marginRight: SPACING.xxs * -1}}>
                  <Button
                    style={{
                      paddingVertical: 0,
                      paddingHorizontal: SPACING.xxs,
                    }}
                    category="xsmall"
                    textStyle={{color: theme['primary-bg']}}
                    appearance="transparent"
                    onPress={() => {
                      navigation.navigate('MyWedding');
                    }}>
                    Lihat semua
                  </Button>
                </View>
              ) : undefined
            }>
            {latestUnpublishedWedding ? (
              <WeddingCard
                data={latestUnpublishedWedding}
                controls={
                  <View
                    style={{
                      marginTop: SPACING.lg,
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      borderTopColor: theme.divider,
                      borderTopWidth: 1,
                      paddingTop: SPACING.md,
                    }}>
                    <Button
                      category="xsmall"
                      textStyle={{fontWeight: '500'}}
                      style={{paddingHorizontal: 12, paddingVertical: 6}}
                      onPress={() => {
                        navigation.navigate('WeddingDetail', {
                          wedding: latestUnpublishedWedding,
                        });
                      }}>
                      Lanjutkan Mengedit
                    </Button>
                  </View>
                }
              />
            ) : (
              <EmptyState
                title={
                  weddings.length > 1
                    ? 'Undangan selesai'
                    : 'Belum ada undangan'
                }
                message={
                  weddings.length > 1
                    ? 'Mulai buat undangan baru sekarang'
                    : 'Mulai buat undangan pertamamu sekarang'
                }
                onRetry={() => {
                  navigation.navigate('WeddingForm');
                }}
                retryLabel="Buat Undangan"
              />
            )}
          </Card>
        </View>
        <View
          style={{marginTop: SPACING.lg, marginHorizontal: SPACING.md * -1}}>
          <VendorSection
            title="Vendor Pilihan"
            description="Vendor terpercaya untuk melengkapi hari spesial Kamu"
          />
        </View>
        {/* <View
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
        </View> */}
      </View>
    </ScreenLayout>
  );
}
