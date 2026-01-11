import ScreenLayout from '../../components/core/ScreenLayout';
import { TouchableHighlight, View } from 'react-native';
import { useTheme } from '../../components/core/AppProvider';
import Typography from '../../components/core/Typography';
import Icon from '@react-native-vector-icons/material-icons';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../../types/navigation-props';
import Button from '../../components/core/Button';
import Confirmation from '../../components/core/Confirmation';
import { RADIUS, SPACING, TYPOGRAPHY } from '../../constants';

export function InvitationCard() {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp>();

  return (
    <>
      <TouchableHighlight
        underlayColor={theme.overlay}
        onPress={() => {
          navigation.navigate('InvitationDetail', {invitationId: 1});
        }}
        style={{borderRadius: 8, overflow: 'hidden'}}>
        <View
          style={{
            padding: SPACING.md,
            borderWidth: 1,
            borderColor: theme['border-default'],
            borderRadius: 8,
            backgroundColor: theme['bg-surface'],
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                backgroundColor: theme['secondary-bg'],
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: RADIUS.full,
                borderWidth: 1,
                borderColor: theme['border-default'],
              }}>
              <Typography
                color={theme['secondary-text']}
                category="small"
                size={TYPOGRAPHY.textStyle.xsmall.fontSize}>
                Template Gratis
              </Typography>
            </View>
          </View>
          <View style={{flex: 1, marginTop: 10}}>
            <Typography style={{fontWeight: '400'}}>
              John Doe & Jane Doe
            </Typography>
            <Typography
              color={theme['text-secondary']}
              category="small"
              style={{marginTop: 4}}>
              06/01/2025 05:11 PM
            </Typography>
          </View>
          <View
            style={{
              flexDirection: 'row',
              gap: 8,
              marginTop: 15,
              flexWrap: 'wrap',
              borderTopColor: theme.divider,
              borderTopWidth: 1,
              paddingTop: SPACING.md,
              justifyContent: 'flex-end',
            }}>
            <Button
              appearance="secondary"
              textStyle={{fontSize: 13}}
              style={{paddingHorizontal: 12, paddingVertical: 6}}
              onPress={() => {
                navigation.navigate('ManageGuest', {invitationId: 1});
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center', gap: SPACING.xs}}>
                <Icon name="people" color={theme['secondary-text']} size={14} />
                <Typography
                  category="xsmall"
                  color={theme['secondary-text']}
                  fontWeight={500}>
                  0 Tamu
                </Typography>
              </View>
            </Button>
            <Confirmation
              mode="button"
              appearance="primary"
              buttonStyle={{paddingHorizontal: 12, paddingVertical: 6}}>
              <View style={{flexDirection: 'row', alignItems: 'center', gap: SPACING.xs}}>
                <Icon name="send" color={theme['primary-text']} size={14} />
                <Typography
                  category="xsmall"
                  color={theme['primary-text']}
                  fontWeight={500}>
                  Terbitkan
                </Typography>
              </View>
            </Confirmation>
          </View>
        </View>
      </TouchableHighlight>
    </>
  );
}

export default function MyInvitation() {
  return (
    <ScreenLayout title="Undangan Saya">
      <View style={{gap: SPACING.md}}>
        <InvitationCard />
        <InvitationCard />
        <InvitationCard />
        <InvitationCard />
        <InvitationCard />
      </View>
    </ScreenLayout>
  );
}
