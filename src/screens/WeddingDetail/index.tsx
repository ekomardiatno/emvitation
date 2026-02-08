import { Image, View } from 'react-native';
import ScreenLayout from '../../components/core/ScreenLayout';
import { useTheme } from '../../components/core/AppProvider';
import Icon from '@react-native-vector-icons/material-icons';
import {
  AppStackNavigationProp,
  AppStackParamList,
} from '../../types/navigation-type';
import { SPACING, TYPOGRAPHY } from '../../constants';
import useAppNavigation from '../../hooks/useAppNavigation';
import { RouteProp } from '@react-navigation/native';
import { useEffect, useMemo } from 'react';
import useToast from '../../hooks/useToast';
import CoupleCard from './CoupleCard';
import { APP_API_URL } from '../../config';
import Button from '../../components/core/Button';
import useAppSelector from '../../hooks/useAppSelector';
import EventList from './EventList';
import Card from '../../components/core/Card';
import GiftInfoList from './GiftInfoList';
import openSpa from '../../helpers/openSpa';
import Typography from '../../components/core/Typography';
import PublicationAction from './PublicationAction';

type WeddingDetailRouteProp = RouteProp<AppStackParamList, 'WeddingDetail'>;

export default function WeddingDetail({
  route,
}: {
  route?: WeddingDetailRouteProp;
}) {
  const theme = useTheme();
  const navigation = useAppNavigation<AppStackNavigationProp>();
  const {weddings} = useAppSelector(state => state.wedding);
  const toast = useToast();
  const {templates} = useAppSelector(state => state.template);
  const {guests} = useAppSelector(state => state.guest);

  const wedding = useMemo(() => {
    return weddings.find(w => w.id === route?.params.wedding?.id);
  }, [route?.params.wedding, weddings]);

  useEffect(() => {
    if (!route?.params.wedding) {
      toast.show('error', 'Wedding invalid');
      navigation.goBack();
    }
  }, [route?.params.wedding, toast, navigation]);

  const template = useMemo(() => {
    if (templates.length < 1 || !wedding) {
      return null;
    }
    return templates.find(t => t.id === wedding.templateId);
  }, [templates, wedding]);

  const weddingGuests = useMemo(() => {
    if (!wedding) {
      return [];
    }
    return guests.filter(g => g.invitationId === wedding.invitationId);
  }, [wedding, guests]);

  return (
    <ScreenLayout
      title="Detail Undangan"
      rightControl={
        <>
          {wedding && (
            <Button
              appearance="basic"
              textStyle={{fontSize: 13}}
              style={{paddingHorizontal: 12, paddingVertical: 6}}
              onPress={() => {
                navigation.navigate('ManageGuest', {
                  invitationId: wedding?.invitationId,
                });
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: SPACING.xs,
                }}>
                <Icon
                  name="people"
                  color={theme['secondary-text']}
                  size={TYPOGRAPHY.textStyle.xsmall.lineHeight}
                />
                <Typography
                  category="xsmall"
                  color={theme['secondary-text']}
                  fontWeight={500}>
                  {weddingGuests.length} Tamu
                </Typography>
              </View>
            </Button>
          )}
        </>
      }
      footer={
        <View style={{gap: SPACING.sm}}>
          <Button
            appearance="basic"
            onPress={() => {
              openSpa(`/wedding/preview/${wedding?.id}`);
            }}
            style={{flexGrow: 1}}>
            Pratinjau
          </Button>
          <PublicationAction wedding={wedding} />
        </View>
      }>
      <View style={{gap: SPACING.md}}>
        <Card
          title="Template & Detail Pasangan"
          rightControl={
            <>
              {wedding?.status !== 'published' && (
                <Button
                  style={{
                    paddingHorizontal: 0,
                    paddingVertical: 0,
                    width: SPACING['2xl'],
                    height: SPACING['2xl'],
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    if (wedding) {
                      navigation.navigate('WeddingForm', {
                        wedding: wedding,
                      });
                    }
                  }}
                  appearance="basic">
                  <Icon
                    color={theme['text-primary']}
                    size={TYPOGRAPHY.textStyle.xsmall.lineHeight}
                    name="edit"
                  />
                </Button>
              )}
            </>
          }>
          <View style={{gap: SPACING.md}}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                padding: SPACING.sm,
                backgroundColor: theme['bg-muted'],
                borderRadius: SPACING.sm,
                borderWidth: 1,
                borderColor: theme['border-default'],
              }}>
              <View
                style={{
                  width: 96,
                  height: (96 / 3) * 4,
                  overflow: 'hidden',
                  borderRadius: SPACING.sm,
                  borderWidth: 1,
                  borderColor: theme['border-default'],
                }}>
                <Image
                  source={{
                    uri:
                      APP_API_URL +
                      '/file?filePath=' +
                      template?.previewImagePath,
                  }}
                  resizeMode="cover"
                  style={{width: '100%', height: '100%'}}
                />
              </View>
            </View>
            <View style={{flexGrow: 1, gap: SPACING.md}}>
              <CoupleCard
                name={wedding?.groomName}
                nickname={wedding?.groomNickname || undefined}
                fatherName={wedding?.groomFatherName}
                hometown={wedding?.groomHometown}
                motherName={wedding?.groomMotherName}
                imgUri={
                  wedding?.groomPhotoPath
                    ? APP_API_URL + '/file?filePath=' + wedding?.groomPhotoPath
                    : null
                }
              />
              <CoupleCard
                gender="female"
                name={wedding?.brideName}
                nickname={wedding?.brideNickname || undefined}
                fatherName={wedding?.brideFatherName}
                hometown={wedding?.brideHometown}
                motherName={wedding?.brideMotherName}
                imgUri={
                  wedding?.bridePhotoPath
                    ? APP_API_URL + '/file?filePath=' + wedding?.bridePhotoPath
                    : null
                }
              />
            </View>
          </View>
        </Card>

        <EventList invitationId={wedding?.invitationId || ''} />

        <GiftInfoList invitationId={wedding?.invitationId || ''} />
      </View>
    </ScreenLayout>
  );
}
