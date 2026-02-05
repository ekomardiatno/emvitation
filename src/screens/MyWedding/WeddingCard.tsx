import { Image, TouchableHighlight, View } from 'react-native';
import { useTheme } from '../../components/core/AppProvider';
import Typography from '../../components/core/Typography';
import Icon from '@react-native-vector-icons/material-icons';
import { AppStackNavigationProp } from '../../types/navigation-type';
import Button from '../../components/core/Button';
import Confirmation from '../../components/core/Confirmation';
import { RADIUS, SPACING } from '../../constants';
import useAppNavigation from '../../hooks/useAppNavigation';
import { useEffect, useMemo } from 'react';
import { WeddingDataType } from '../../types/wedding-type';
import useAppSelector from '../../hooks/useAppSelector';
import { APP_API_URL } from '../../config';
import moment from 'moment';
import useAppDispatch from '../../hooks/useAppDispatch';
import { loadingEvents } from '../../redux/reducers/event.reducer';
import { loadingTemplates } from '../../redux/reducers/template.reducer';

export function WeddingCard({
  data,
  controls,
}: {
  data: WeddingDataType;
  controls?: React.ReactNode;
}) {
  const theme = useTheme();
  const navigation = useAppNavigation<AppStackNavigationProp>();
  const {isLoading: areTemplatesLoading, templates} = useAppSelector(
    state => state.template,
  );
  const {guests} = useAppSelector(state => state.guest);
  const {isLoading: areEventsLoading, events} = useAppSelector(
    state => state.event,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (areTemplatesLoading) {
      dispatch(loadingTemplates());
    }
  }, [areTemplatesLoading, dispatch]);

  useEffect(() => {
    if (areEventsLoading) {
      dispatch(loadingEvents());
    }
  }, [areEventsLoading, dispatch]);

  const template = useMemo(() => {
    if (templates.length < 1) {
      return null;
    }
    return templates.find(t => t.id === data.templateId);
  }, [templates, data]);

  const weddingGuests = useMemo(() => {
    return guests.filter(g => g.invitationId === data.invitationId);
  }, [guests, data]);

  const event = useMemo(() => {
    const weddingEvents = events.filter(
      ev => ev.invitationId === data.invitationId,
    );
    if (weddingEvents.length < 1) return null;
    if (weddingEvents.find(we => we.isMainEvent)) {
      return weddingEvents.find(we => we.isMainEvent);
    }
    return weddingEvents[0];
  }, [data.invitationId, events]);

  return (
    <>
      <TouchableHighlight
        underlayColor={theme.overlay}
        onPress={() => {
          navigation.navigate('WeddingDetail', {wedding: data});
        }}
        style={{borderRadius: 8, overflow: 'hidden'}}>
        <View
          style={{
            padding: SPACING.md,
            borderWidth: 1,
            borderColor: theme['border-default'],
            borderRadius: 8,
            backgroundColor: theme['bg-surface'],
            flexDirection: 'row',
            gap: SPACING.md,
          }}>
          <View
            style={{
              width: 80,
              height: (80 / 3) * 4,
              overflow: 'hidden',
              borderRadius: SPACING.sm,
              borderWidth: 1,
              borderColor: theme['border-default'],
            }}>
            <Image
              source={{
                uri:
                  APP_API_URL + '/file?filePath=' + template?.previewImagePath,
              }}
              resizeMode="cover"
              style={{width: '100%', height: '100%'}}
            />
          </View>
          <View style={{flexGrow: 1}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  backgroundColor: theme['secondary-bg'],
                  paddingHorizontal: SPACING.sm,
                  paddingVertical: SPACING.xs,
                  borderRadius: RADIUS.full,
                  borderWidth: 1,
                  borderColor: theme['border-default'],
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: SPACING.xs,
                }}>
                <Icon name="web" color={theme['text-primary']} />
                <Typography color={theme['secondary-text']} category="xsmall">
                  {template?.name}
                </Typography>
              </View>
            </View>
            <View style={{flex: 1, marginTop: SPACING.sm}}>
              <Typography style={{fontWeight: '400'}}>
                {`${data.groomNickname || data.groomName} & ${
                  data.brideNickname || data.brideName
                }`}
              </Typography>
              {event && (
                <>
                  <Typography category="xsmall" style={{marginTop: SPACING.xs}}>
                    {`${moment(event.date).format(
                      'ddd, DD MMM Y',
                    )} ${event.startTime
                      .split(':')
                      .slice(0, 2)
                      .join(':')} - ${event.endTime
                      .split(':')
                      .slice(0, 2)
                      .join(':')}`}
                  </Typography>
                  {event.address && (
                    <Typography
                      category="xsmall"
                      style={{marginTop: SPACING.xs}}>
                      {event.address}
                    </Typography>
                  )}
                </>
              )}
            </View>
            {controls || (
              <View
                style={{
                  flexDirection: 'row',
                  gap: 8,
                  marginTop: SPACING.lg,
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
                    navigation.navigate('ManageGuest', {
                      invitationId: data.invitationId,
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
                      size={14}
                    />
                    <Typography
                      category="xsmall"
                      color={theme['secondary-text']}
                      fontWeight={500}>
                      {weddingGuests.length} Tamu
                    </Typography>
                  </View>
                </Button>
                <Confirmation
                  mode="button"
                  appearance={
                    data.status !== 'draft' ? 'transparent' : 'primary'
                  }
                  buttonStyle={{paddingHorizontal: 12, paddingVertical: 6}}
                  disabled={data.status === 'published'}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: SPACING.xs,
                    }}>
                    <Icon
                      name="send"
                      color={
                        data.status !== 'draft'
                          ? theme['text-primary']
                          : theme['primary-text']
                      }
                      size={14}
                    />
                    <Typography
                      category="xsmall"
                      color={
                        data.status !== 'draft'
                          ? theme['text-primary']
                          : theme['primary-text']
                      }
                      fontWeight={500}>
                      {data.status === 'published'
                        ? 'Sudah Diterbitkan'
                        : 'Terbitkan'}
                    </Typography>
                  </View>
                </Confirmation>
              </View>
            )}
          </View>
        </View>
      </TouchableHighlight>
    </>
  );
}
