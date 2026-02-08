import { Image, View } from 'react-native';
import Typography from '../../components/core/Typography';
import { useTheme } from '../../components/core/AppProvider';
import { FONT_FAMILY, RADIUS, SPACING } from '../../constants';
import QRCode from 'react-native-qrcode-svg';
import { WeddingDataType } from '../../types/wedding-type';
import useAppSelector from '../../hooks/useAppSelector';
import moment from 'moment';
import Divider from '../../components/Divider';
import MaterialIcons from '@react-native-vector-icons/material-icons';

export default function InvitationCard({
  guestName,
  qrUrl,
  wedding,
}: {
  guestName: string;
  qrUrl: string;
  wedding?: WeddingDataType;
}) {
  const theme = useTheme();
  const {events} = useAppSelector(state => state.event);

  const event = events.find(
    event => event.invitationId === wedding?.invitationId,
  );

  if (!wedding) {
    return null;
  }

  return (
    <View
      style={{
        backgroundColor: theme['border-default'],
        padding: SPACING.lg,
      }}>
      <View
        style={{
          borderWidth: SPACING.xs,
          borderColor: theme['border-default'],
          backgroundColor: theme['bg-surface'],
          padding: SPACING.lg,
          borderRadius: RADIUS.lg,
          overflow: 'hidden',
        }}>
        <Typography
          color={theme['text-secondary']}
          style={{textAlign: 'center'}}>
          Undangan Pernikahan
        </Typography>
        {wedding.brideNickname && wedding.groomNickname ? (
          <Typography
            category="h1"
            style={{
              fontFamily: FONT_FAMILY.handwrite,
              fontWeight: 400,
              textAlign: 'center',
            }}
            color={theme['text-primary']}>
            {`${wedding.groomNickname} & ${wedding.brideNickname}`}
          </Typography>
        ) : (
          <View
            style={{
              padding: SPACING.md,
              backgroundColor: theme['bg-muted'],
              marginTop: SPACING.md,
              borderRadius: RADIUS.lg,
            }}>
            <Typography
              category="h1"
              style={{
                fontFamily: FONT_FAMILY.handwrite,
                textAlign: 'center',
                fontWeight: 400,
              }}>
              {wedding.groomName}
            </Typography>
            <Divider
              text="&"
              backgroundColor={theme['bg-muted']}
              dividerColor={theme['text-primary']}
              textStyle={{fontFamily: FONT_FAMILY.handwrite, fontWeight: '400'}}
              textCategory="h2"
            />
            <Typography
              category="h1"
              style={{
                fontFamily: FONT_FAMILY.handwrite,
                fontWeight: 400,
                textAlign: 'center',
              }}>
              {wedding.brideName}
            </Typography>
          </View>
        )}

        {event?.date && (
          <View style={{marginTop: SPACING.lg, gap: SPACING.xs}}>
            <Divider />
            <Typography
              category="large"
              style={{margin: SPACING.sm, textAlign: 'center'}}>
              {moment(event.date).format('ddd, DD MMM Y')}
            </Typography>
            <Divider />
          </View>
        )}

        <View
          style={{
            marginTop: SPACING.xl,
            alignSelf: 'center',
          }}>
          <Typography
            color={theme['text-secondary']}
            category="small"
            style={{textAlign: 'center'}}>
            Mengundang
          </Typography>
          <Typography category="large" style={{textAlign: 'center'}}>
            {guestName}
          </Typography>
        </View>

        <View
          style={{
            marginTop: SPACING.xl,
            gap: SPACING.sm,
            alignItems: 'center',
          }}>
          <QRCode
            value={qrUrl}
            size={160}
            backgroundColor={theme['bg-surface']}
            color={theme['text-primary']}
          />
          <Typography color={theme['text-secondary']} category="xsmall">
            Pindai untuk melihat undangan
          </Typography>
        </View>

        <Divider
          marginBottom={SPACING.sm}
          marginTop={SPACING['2xl']}
          backgroundColor={theme['bg-surface']}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: SPACING.lg * -1,
            paddingBottom: SPACING.sm,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: SPACING.sm,
              justifyContent: 'center',
            }}>
            <Typography category="xsmall" color={theme['text-secondary']}>
              Provided By
            </Typography>
            <Image
              source={
                theme.schema === 'dark'
                  ? require('../../assets/images/logo-white-50px.webp')
                  : require('../../assets/images/logo.webp')
              }
              style={{width: 18, height: 30, resizeMode: 'contain'}}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: SPACING.xs,
            }}>
            <MaterialIcons name="public" color={theme['text-disabled']} />
            <Typography category="xsmall" color={theme['text-disabled']}>
              ekomardiatno.my.id
            </Typography>
          </View>
        </View>
      </View>
    </View>
  );
}
