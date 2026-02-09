import { View } from 'react-native';
import { RADIUS, SPACING, TYPOGRAPHY } from '../../constants';
import { useTheme } from '../../components/core/AppProvider';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import Typography from '../../components/core/Typography';
import useAppSelector from '../../hooks/useAppSelector';
import { useCallback, useEffect } from 'react';
import useAppDispatch from '../../hooks/useAppDispatch';
import { loadingRsvp } from '../../redux/reducers/rsvp.reducer';
import { loadingWishes } from '../../redux/reducers/wish.reducer';
import Button from '../../components/core/Button';
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

  const loadingRsvpAndWishes = useCallback(() => {
    dispatch(loadingRsvp());
    dispatch(loadingWishes());
  }, [dispatch]);

  useEffect(() => {
    loadingRsvpAndWishes();
  }, [loadingRsvpAndWishes]);

  return (
    <View
      style={{
        padding: SPACING.sm,
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.md,
        backgroundColor: theme['bg-surface'],
        borderWidth: 1,
        borderColor: theme['border-default'],
        borderRadius: RADIUS.full,
      }}>
      <Button
        style={{
          paddingVertical: 0,
          paddingHorizontal: 0,
          borderRadius: RADIUS.full,
          flexGrow: 1,
        }}
        onPress={() => {
          navigation.navigate('WishList');
        }}
        appearance="transparent">
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}>
          <View
            style={{
              width: 32,
              height: 32,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: errorWishes
                ? theme['error-bg']
                : theme['warning-bg'],
              borderRadius: 32,
            }}>
            {areWishesLoading ? (
              <LoadingState size={20} />
            ) : errorWishes ? (
              <MaterialIcons
                name="error"
                size={15}
                style={{color: theme['error-text']}}
              />
            ) : (
              <MaterialIcons
                name="message"
                size={15}
                style={{color: theme['warning-text']}}
              />
            )}
          </View>
          <View>
            <Typography category="xsmall" fontWeight={600} numberOfLines={1}>
              Ucapan
            </Typography>
            <Typography category="small">{wishes.length}</Typography>
          </View>
        </View>
      </Button>
      <Button
        style={{
          paddingVertical: 0,
          paddingHorizontal: 0,
          borderRadius: RADIUS.full,
          flexGrow: 1,
        }}
        onPress={() => {
          navigation.navigate('RsvpList');
        }}
        appearance="transparent">
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: SPACING.md,
          }}>
          <View
            style={{
              width: 32,
              height: 32,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: errorRsvp ? theme['error-bg'] : theme['info-bg'],
              borderRadius: 32,
            }}>
            {areRsvpLoading ? (
              <LoadingState size={20} />
            ) : errorRsvp ? (
              <MaterialIcons
                name="error"
                size={15}
                style={{color: theme['error-text']}}
              />
            ) : (
              <MaterialIcons
                name="insert-invitation"
                size={15}
                style={{color: theme['info-text']}}
              />
            )}
          </View>
          <View style={{flexGrow: 1}}>
            <Typography category="xsmall" fontWeight={600} numberOfLines={1}>
              RSVP
            </Typography>
            <Typography category="small">{rsvp.length}</Typography>
          </View>
        </View>
      </Button>
      <Button
        appearance="basic"
        style={{paddingHorizontal: SPACING.xs, paddingVertical: SPACING.xs}}
        onPress={loadingRsvpAndWishes}>
        <MaterialIcons
          name="refresh"
          color={theme['text-primary']}
          size={TYPOGRAPHY.textStyle.small.lineHeight}
        />
      </Button>
    </View>
  );
}
