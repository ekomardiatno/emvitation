import { useWindowDimensions, View } from 'react-native';
import { useTheme } from '../../components/core/AppProvider';
import Typography from '../../components/core/Typography';
import Button from '../../components/core/Button';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import ViewShot from 'react-native-view-shot';
import { useRef } from 'react';
import InvitationCard from './InvitationCard';
import Share from 'react-native-share';
import { getSpaUrl } from '../../helpers/openSpa';
import { GuestDataType } from '../../types/guest-type';
import useAppSelector from '../../hooks/useAppSelector';
import { SPACING } from '../../constants';
import useAppDispatch from '../../hooks/useAppDispatch';
import { pushSharedGuestId } from '../../redux/reducers/guest.reducer';

export default function GuestCard({
  guest,
  onEdit,
  invitationId,
  disableEdit,
}: {
  guest: GuestDataType;
  onEdit?: () => void;
  invitationId?: string;
  disableEdit?: boolean;
}) {
  const {width, height} = useWindowDimensions();
  const theme = useTheme();
  const viewRef = useRef<ViewShot>(null);
  const {weddings} = useAppSelector(state => state.wedding);
  const {sharedGuestIds} = useAppSelector(state => state.guest);
  const dispatch = useAppDispatch();

  const wedding = weddings.find(w => w.invitationId === invitationId);

  const shareInvitation = async () => {
    if (viewRef.current && viewRef.current.capture) {
      const uri = await viewRef.current.capture();

      await Share.open({
        url: uri,
        type: 'image/png',
        saveToFiles: true,
      }).finally(() => {
        dispatch(pushSharedGuestId(guest.id));
      });
    }
  };

  if (!invitationId) {
    return null;
  }

  return (
    <>
      <View
        style={{
          padding: SPACING.sm,
          paddingLeft: SPACING.sm * 2,
          paddingRight: SPACING.sm,
          borderRadius: 16,
          backgroundColor: theme['bg-surface'],
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: theme['border-default'],
          gap: 8,
        }}>
        <View style={{flex: 1}}>
          <Typography category="h4">{guest.name}</Typography>
        </View>
        <View
          style={{flexDirection: 'row', gap: SPACING.sm, alignItems: 'center'}}>
          <Button
            appearance="transparent"
            style={{
              backgroundColor: sharedGuestIds.includes(guest.id)
                ? theme['success-bg']
                : undefined,
              paddingHorizontal: SPACING.sm,
              paddingVertical: SPACING.sm,
            }}
            onPress={shareInvitation}>
            <MaterialIcons
              name="share"
              size={18}
              color={
                sharedGuestIds.includes(guest.id)
                  ? theme['success-text']
                  : theme['secondary-text']
              }
            />
          </Button>
          {!disableEdit && (
            <Button
              onPress={onEdit}
              style={{
                paddingHorizontal: SPACING.sm,
                paddingVertical: SPACING.sm,
              }}
              appearance="transparent">
              <MaterialIcons
                name="edit"
                size={18}
                color={theme['secondary-text']}
              />
            </Button>
          )}
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          left: (SPACING.md + width) * -1,
          width: width < height ? width : height,
        }}>
        <ViewShot ref={viewRef} options={{format: 'png', quality: 1}}>
          <InvitationCard
            guestName={guest.name}
            qrUrl={getSpaUrl(`/wedding/guest/${guest.id}`)}
            wedding={wedding}
          />
        </ViewShot>
      </View>
    </>
  );
}
