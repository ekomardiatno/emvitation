import {CONTAINER_GUTTER, RADIUS, SHADOWS, SPACING} from '../../constants';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {AppStackNavigationProp} from '../../types/navigation-type';
import {useTheme} from '../../components/core/AppProvider';
import Typography from '../../components/core/Typography';
import ScreenLayout from '../../components/core/ScreenLayout';
import useAppNavigation from '../../hooks/useAppNavigation';
import useAppSelector from '../../hooks/useAppSelector';
import getInitials from '../../utils/getInitials';
import {EmptyState} from '../../components/EmptyState';
import {useEffect, useMemo} from 'react';
import useAppDispatch from '../../hooks/useAppDispatch';
import {loadingWeddings} from '../../redux/reducers/wedding.reducer';
import Button from '../../components/core/Button';
import {WeddingCard} from '../MyWedding/WeddingCard';
import VendorSection from './VendorSection';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import {gettingProfile} from '../../redux/reducers/profile.reducer';
import LoadingState from '../../components/LoadingState';
import MinimalOverviewCard from './MinimalOverviewCard';

export default function Home() {
  const navigation = useAppNavigation<AppStackNavigationProp>();
  const theme = useTheme();
  const {isLoading, data, error} = useAppSelector(state => state.profile);
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

  const firstName = useMemo(() => {
    if (!data.name) {
      return '';
    }
    return data.name.split(' ')[0];
  }, [data.name]);

  return (
    <ScreenLayout headerEnabled={false}>
      {/* Header row */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={
              theme.schema === 'dark'
                ? require('../../assets/images/logo-white-50px.webp')
                : require('../../assets/images/logo-50px.webp')
            }
            resizeMode="contain"
            style={styles.headerLogo}
          />
          <Typography category="h4" fontWeight={700} style={{letterSpacing: 2}}>
            EMVITE
          </Typography>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            if (error) {
              dispatch(gettingProfile());
            } else {
              navigation.navigate('Profile');
            }
          }}>
          <View
            style={[
              styles.avatar,
              {
                backgroundColor: isLoading
                  ? theme['secondary-bg']
                  : error
                  ? theme['error-bg']
                  : theme['primary-bg'],
              },
            ]}>
            {isLoading ? (
              <ActivityIndicator color={theme['secondary-text']} size={16} />
            ) : error ? (
              <MaterialIcons
                name="error"
                size={18}
                color={theme['error-text']}
              />
            ) : (
              <Typography
                category="small"
                fontWeight={700}
                color={theme['primary-text']}
                style={{textTransform: 'uppercase'}}>
                {getInitials(data.name || '')}
              </Typography>
            )}
          </View>
        </TouchableOpacity>
      </View>

      {/* Greeting */}
      <View style={styles.greeting}>
        <Typography category="h2" fontWeight={700}>
          {firstName ? `Hai, ${firstName}` : 'Selamat datang'}
        </Typography>
        <Typography
          category="small"
          marginTop={SPACING.xs}
          color={theme['text-secondary']}>
          Kelola undangan pernikahanmu di sini
        </Typography>
      </View>

      <View style={{paddingBottom: SPACING.lg}}>
        {/* Quick Actions — horizontal list items */}
        <View style={{gap: SPACING.sm}}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('WeddingForm')}>
            <View
              style={[
                styles.actionRow,
                {
                  backgroundColor: theme['bg-surface'],
                  borderColor: theme['border-muted'],
                },
              ]}>
              <View
                style={[
                  styles.actionIcon,
                  {backgroundColor: theme['primary-bg']},
                ]}>
                <MaterialIcons name="add" size={22} color={theme['primary-text']} />
              </View>
              <View style={styles.actionText}>
                <Typography category="regular" fontWeight={600}>
                  Buat Undangan
                </Typography>
                <Typography category="xsmall" color={theme['text-secondary']}>
                  Buat undangan pernikahan baru
                </Typography>
              </View>
              <MaterialIcons
                name="chevron-right"
                size={22}
                color={theme['text-disabled']}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('MyWedding')}>
            <View
              style={[
                styles.actionRow,
                {
                  backgroundColor: theme['bg-surface'],
                  borderColor: theme['border-muted'],
                },
              ]}>
              <View
                style={[
                  styles.actionIcon,
                  {backgroundColor: theme['info-bg']},
                ]}>
                <MaterialIcons
                  name="description"
                  size={20}
                  color={theme['info-text']}
                />
              </View>
              <View style={styles.actionText}>
                <Typography category="regular" fontWeight={600}>
                  Undangan Saya
                </Typography>
                <Typography category="xsmall" color={theme['text-secondary']}>
                  Lihat dan kelola undangan
                </Typography>
              </View>
              <MaterialIcons
                name="chevron-right"
                size={22}
                color={theme['text-disabled']}
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* Stats Overview */}
        <View style={{marginTop: SPACING.xl}}>
          <MinimalOverviewCard />
        </View>

        {/* Latest Draft */}
        <View style={{marginTop: SPACING.xl}}>
          <View style={styles.sectionHeader}>
            <Typography category="regular" fontWeight={700}>
              Undangan Terakhir
            </Typography>
            {latestUnpublishedWedding && (
              <Button
                style={styles.seeAllButton}
                category="xsmall"
                textStyle={{color: theme['primary-bg']}}
                appearance="transparent"
                onPress={() => navigation.navigate('MyWedding')}>
                Lihat semua
              </Button>
            )}
          </View>
          <View style={{marginTop: SPACING.sm}}>
            {isWeddingLoading ? (
              <View
                style={[
                  styles.loadingCard,
                  {
                    backgroundColor: theme['bg-surface'],
                    borderColor: theme['border-muted'],
                  },
                ]}>
                <LoadingState />
              </View>
            ) : latestUnpublishedWedding ? (
              <WeddingCard
                data={latestUnpublishedWedding}
                controls={
                  <View
                    style={[
                      styles.cardControls,
                      {borderTopColor: theme.divider},
                    ]}>
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
              <View
                style={[
                  styles.emptyCard,
                  {
                    backgroundColor: theme['bg-surface'],
                    borderColor: theme['border-muted'],
                  },
                ]}>
                <EmptyState
                  title={
                    weddings.length > 1 ? 'Draf Kosong' : 'Belum Ada Undangan'
                  }
                  message={
                    weddings.length > 1
                      ? 'Mulai buat undangan baru sekarang'
                      : 'Mulai buat undangan pertamamu sekarang'
                  }
                  onRetry={() => navigation.navigate('WeddingForm')}
                  retryLabel="Buat Undangan"
                />
              </View>
            )}
          </View>
        </View>

        {/* Vendor Section */}
        <View
          style={{
            marginTop: SPACING.xl,
            marginHorizontal: CONTAINER_GUTTER * -1,
          }}>
          <VendorSection
            title="Vendor Pilihan"
            description="Vendor terpercaya untuk melengkapi hari spesial Kamu"
          />
        </View>
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  headerLogo: {
    width: 28,
    height: 28,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greeting: {
    marginTop: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    borderWidth: StyleSheet.hairlineWidth,
    ...SHADOWS.sm,
  },
  actionIcon: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    flex: 1,
    gap: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  seeAllButton: {
    paddingVertical: 0,
    paddingHorizontal: SPACING.xs,
    marginRight: SPACING.xs * -1,
  },
  loadingCard: {
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RADIUS.md,
    borderWidth: StyleSheet.hairlineWidth,
  },
  emptyCard: {
    borderRadius: RADIUS.md,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
  },
  cardControls: {
    marginTop: SPACING.lg,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    paddingTop: SPACING.md,
  },
});
