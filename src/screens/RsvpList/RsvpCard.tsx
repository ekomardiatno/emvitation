import { useEffect } from 'react';
import { useTheme } from '../../components/core/AppProvider';
import Card from '../../components/core/Card';
import Typography from '../../components/core/Typography';
import useAppSelector from '../../hooks/useAppSelector';
import { RsvpDataType } from '../../types/rsvp-type';
import useAppDispatch from '../../hooks/useAppDispatch';
import { loadingGuests } from '../../redux/reducers/guest.reducer';
import { RADIUS, SPACING, TYPOGRAPHY } from '../../constants';
import moment from 'moment';
import { View } from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { WeddingCard } from '../MyWedding/WeddingCard';
import Divider from '../../components/Divider';

export default function RsvpCard({rsvpData}: {rsvpData: RsvpDataType}) {
  const theme = useTheme();
  const {guests, isLoading: areGuestsLoading} = useAppSelector(
    state => state.guest,
  );
  const {weddings} = useAppSelector(state => state.wedding);
  const guest = guests.find(g => g.id === rsvpData.guestId);
  const dispatch = useAppDispatch();

  const wedding = weddings.find(w => w.invitationId === guest?.invitationId);

  useEffect(() => {
    if (areGuestsLoading) {
      dispatch(loadingGuests());
    }
  }, [areGuestsLoading, dispatch]);

  return (
    <Card>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: SPACING.md,
        }}>
        <Typography category="large" fontWeight={600}>
          {guest?.name}
        </Typography>
        {rsvpData.status && (
          <View
            style={{
              paddingHorizontal: SPACING.xs,
              alignSelf: 'flex-start',
              borderRadius: RADIUS.full,
              backgroundColor:
                rsvpData.status === 'attending'
                  ? theme['success-bg']
                  : rsvpData.status === 'not_attending'
                  ? theme['error-bg']
                  : rsvpData.status === 'maybe'
                  ? theme['warning-bg']
                  : 'transparent',
              borderWidth: 1,
              borderColor: 'transparent',
              flexDirection: 'row',
              alignItems: 'center',
              gap: SPACING.xs,
            }}>
            <MaterialIcons
              name={
                rsvpData.status === 'attending'
                  ? 'check'
                  : rsvpData.status === 'not_attending'
                  ? 'close'
                  : 'circle'
              }
              color={
                rsvpData.status === 'attending'
                  ? theme['success-text']
                  : rsvpData.status === 'not_attending'
                  ? theme['error-text']
                  : rsvpData.status === 'maybe'
                  ? theme['warning-text']
                  : 'transparent'
              }
            />
            <Typography
              category="xsmall"
              fontWeight={500}
              color={
                rsvpData.status === 'attending'
                  ? theme['success-text']
                  : rsvpData.status === 'not_attending'
                  ? theme['error-text']
                  : rsvpData.status === 'maybe'
                  ? theme['warning-text']
                  : 'transparent'
              }>
              {rsvpData.status === 'attending'
                ? 'Hadir'
                : rsvpData.status === 'not_attending'
                ? 'Tidak Hadir'
                : rsvpData.status === 'maybe'
                ? 'Belum Pasti'
                : ''}
            </Typography>
          </View>
        )}
      </View>
      <Typography
        category="xsmall"
        marginTop={SPACING.xxs}
        color={theme['text-secondary']}>
        {moment(rsvpData.createdAt).format('ddd, DD MMM Y HH:mm')}
      </Typography>
      {rsvpData.message && (
        <View
          style={{
            flexDirection: 'row',
            gap: SPACING.xs,
            marginTop: SPACING.md,
            borderWidth: 1,
            borderColor: theme['border-default'],
            borderRadius: RADIUS.md,
            padding: SPACING.sm,
          }}>
          <MaterialIcons
            size={TYPOGRAPHY.textStyle.large.lineHeight}
            name="format-quote"
            color={theme['text-secondary']}
          />
          <View style={{flexGrow: 1, paddingTop: SPACING.xxs}}>
            <Typography
              color={theme['text-secondary']}
              style={{fontStyle: 'italic'}}>
              {rsvpData.message}
            </Typography>
          </View>
        </View>
      )}
      {wedding && (
        <View>
          <Divider marginVertical={SPACING.md} />
          <WeddingCard
            hideTemplateInfo={true}
            data={wedding}
            controls={<></>}
          />
        </View>
      )}
    </Card>
  );
}
