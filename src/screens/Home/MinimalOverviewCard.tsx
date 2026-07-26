import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {RADIUS, SHADOWS, SPACING} from '../../constants';
import {useTheme} from '../../components/core/AppProvider';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import Typography from '../../components/core/Typography';
import useAppSelector from '../../hooks/useAppSelector';
import {useCallback, useEffect} from 'react';
import useAppDispatch from '../../hooks/useAppDispatch';
import {loadingRsvp} from '../../redux/reducers/rsvp.reducer';
import {loadingWishes} from '../../redux/reducers/wish.reducer';
import LoadingState from '../../components/LoadingState';
import useAppNavigation from '../../hooks/useAppNavigation';

export default function MinimalOverviewCard() {
  const {
    isLoading: areRsvpLoading,
    rsvp,
    error: errorRsvp,
  } = useAppSelector(state => state.rsvp);
  const {
    isLoading: areWishesLoading,
    wishes,
    error: errorWishes,
  } = useAppSelector(state => state.wish);
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();

  const loadData = useCallback(() => {
    dispatch(loadingRsvp());
    dispatch(loadingWishes());
  }, [dispatch]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <View>
      <View style={styles.sectionHeader}>
        <Typography category="regular" fontWeight={700}>
          Ringkasan
        </Typography>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={loadData}
          style={[
            styles.refreshButton,
            {backgroundColor: theme['bg-muted']},
          ]}>
          <MaterialIcons
            name="refresh"
            size={18}
            color={theme['text-secondary']}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
      {/* Ucapan stat */}
      <TouchableOpacity
        activeOpacity={0.7}
        style={[
          styles.statCard,
          {
            backgroundColor: theme['bg-surface'],
            borderColor: theme['border-muted'],
          },
        ]}
        onPress={() => navigation.navigate('WishList')}>
        <View style={styles.statTop}>
          <View
            style={[
              styles.iconCircle,
              {backgroundColor: theme['warning-bg']},
            ]}>
            {areWishesLoading ? (
              <LoadingState size={14} />
            ) : errorWishes ? (
              <MaterialIcons
                name="error"
                size={16}
                color={theme['error-text']}
              />
            ) : (
              <MaterialIcons
                name="chat-bubble"
                size={16}
                color={theme['warning-text']}
              />
            )}
          </View>
          <MaterialIcons
            name="chevron-right"
            size={18}
            color={theme['text-disabled']}
          />
        </View>
        <Typography category="h2" fontWeight={700} marginTop={SPACING.sm}>
          {areWishesLoading ? '-' : wishes.length}
        </Typography>
        <Typography category="xsmall" color={theme['text-secondary']}>
          Ucapan
        </Typography>
      </TouchableOpacity>

      {/* RSVP stat */}
      <TouchableOpacity
        activeOpacity={0.7}
        style={[
          styles.statCard,
          {
            backgroundColor: theme['bg-surface'],
            borderColor: theme['border-muted'],
          },
        ]}
        onPress={() => navigation.navigate('RsvpList')}>
        <View style={styles.statTop}>
          <View
            style={[styles.iconCircle, {backgroundColor: theme['info-bg']}]}>
            {areRsvpLoading ? (
              <LoadingState size={14} />
            ) : errorRsvp ? (
              <MaterialIcons
                name="error"
                size={16}
                color={theme['error-text']}
              />
            ) : (
              <MaterialIcons
                name="mail"
                size={16}
                color={theme['info-text']}
              />
            )}
          </View>
          <MaterialIcons
            name="chevron-right"
            size={18}
            color={theme['text-disabled']}
          />
        </View>
        <Typography category="h2" fontWeight={700} marginTop={SPACING.sm}>
          {areRsvpLoading ? '-' : rsvp.length}
        </Typography>
        <Typography category="xsmall" color={theme['text-secondary']}>
          RSVP
        </Typography>
      </TouchableOpacity>

    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  refreshButton: {
    width: 30,
    height: 30,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  statCard: {
    flex: 1,
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    borderWidth: StyleSheet.hairlineWidth,
    ...SHADOWS.sm,
  },
  statTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
