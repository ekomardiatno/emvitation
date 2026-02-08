import { ActivityIndicator, View } from 'react-native';
import EventCard from './EventCard';
import { RADIUS, SPACING, TYPOGRAPHY } from '../../constants';
import useAppSelector from '../../hooks/useAppSelector';
import { useCallback, useEffect, useMemo, useState } from 'react';
import LoadingState from '../../components/LoadingState';
import { ErrorState } from '../../components/ErrorState';
import useAppDispatch from '../../hooks/useAppDispatch';
import {
  loadingEvents,
  patchEvent,
  removeEvent,
} from '../../redux/reducers/event.reducer';
import { EmptyState } from '../../components/EmptyState';
import moment from 'moment';
import useAppNavigation from '../../hooks/useAppNavigation';
import { deleteEvent, updateEvent } from '../../services/event';
import errorHandler from '../../helpers/errorHandler';
import useToast from '../../hooks/useToast';
import { useTheme } from '../../components/core/AppProvider';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import Button from '../../components/core/Button';
import Typography from '../../components/core/Typography';
import EModal from '../../components/core/EModal';
import Card from '../../components/core/Card';
import { ApiError } from '../../services/common';

export default function EventList({invitationId}: {invitationId: string}) {
  const {isLoading, error, events} = useAppSelector(state => state.event);
  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();
  const toast = useToast();
  const [isChangingMainEvent, setIsChangingMainEvent] = useState(false);
  const theme = useTheme();
  const [isDeleting, setIsDeleting] = useState(false);
  const [highlightedEventId, setHighlightedEventId] = useState<string | null>(
    null,
  );
  const {weddings} = useAppSelector(state => state.wedding);

  const weddingEvents = useMemo(() => {
    return events.filter(e => e.invitationId === invitationId);
  }, [events, invitationId]);

  useEffect(() => {
    if (isLoading) {
      dispatch(loadingEvents());
    }
  }, [dispatch, isLoading]);

  const onChangeMainEvent = async (eventId: string) => {
    if (isChangingMainEvent) {
      return;
    }
    setIsChangingMainEvent(true);
    try {
      const res = await updateEvent(eventId, {isMainEvent: true});
      if (res.status >= 200 && res.status < 300 && res.data) {
        const otherWeddingEvents = events.filter(
          e => e.invitationId === invitationId,
        );
        for (const otherEvent of otherWeddingEvents) {
          dispatch(patchEvent({...otherEvent, isMainEvent: false}));
        }
        dispatch(patchEvent(res.data));
        toast.show('success', 'Berhasil mengubah acara utama');
      } else {
        throw new Error('Unable to change main event');
      }
    } catch (e) {
      errorHandler(e, (errMsg: string) => {
        toast.show('error', errMsg);
      });
    } finally {
      setTimeout(() => {
        setIsChangingMainEvent(false);
      }, 1000);
    }
  };

  const fetchDelete = useCallback(
    async (signal?: AbortSignal) => {
      console.log('triggered');
      if (!highlightedEventId) {
        setIsDeleting(false);
        return;
      }
      try {
        const res = await deleteEvent(highlightedEventId, signal);
        if (res.status >= 200 && res.status < 300) {
          setIsDeleting(false);
          dispatch(removeEvent(highlightedEventId));
        } else {
          throw new Error(res.message || 'Failed to delete event');
        }
      } catch (e) {
        if (
          (e instanceof Error && e.message !== 'canceled') ||
          (e as ApiError).message
        ) {
          toast.show(
            'error',
            (e as Error | ApiError)?.message || 'Unknown error',
          );
        }
      } finally {
        setHighlightedEventId(null);
      }
    },
    [dispatch, highlightedEventId, toast],
  );

  useEffect(() => {
    const controller = new AbortController();
    if (isDeleting) {
      fetchDelete(controller.signal);
    } else {
      controller.abort();
    }
  }, [isDeleting, fetchDelete]);

  const hasWeddingPublished = useMemo(() => {
    const wedding = weddings.find(w => w.invitationId === invitationId);
    if (wedding?.status === 'published') return true;
    return false;
  }, [invitationId, weddings]);

  return (
    <>
      <Card
        title="Daftar Acara"
        rightControl={
          <>
            {!hasWeddingPublished && (
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
                  if (invitationId) {
                    navigation.navigate('EventForm', {
                      invitationId: invitationId,
                    });
                  }
                }}
                disabled={!invitationId}>
                <MaterialIcons
                  name="add"
                  size={TYPOGRAPHY.textStyle.xsmall.lineHeight}
                  color={theme['primary-text']}
                />
              </Button>
            )}
          </>
        }>
        <View style={{gap: SPACING.md}}>
          {isLoading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState
              message={error}
              onRetry={() => dispatch(loadingEvents())}
            />
          ) : weddingEvents.length < 1 ? (
            <EmptyState
              title="Belum Ada Data Acara"
              message="Mulai menambahkan data acara"
            />
          ) : (
            weddingEvents.map(event => {
              return (
                <EventCard
                  key={event.id}
                  title={event.title}
                  date={`${moment(event.date).format(
                    'ddd, DD MMM Y',
                  )} ${event.startTime
                    .split(':')
                    .slice(0, 2)
                    .join(':')} - ${event.endTime
                    .split(':')
                    .slice(0, 2)
                    .join(':')}`}
                  location={event.address}
                  isMainEvent={event.isMainEvent}
                  isDeleting={isDeleting}
                  onEdit={() => {
                    navigation.navigate('EventForm', {
                      invitationId,
                      event,
                    });
                  }}
                  disabledControls={hasWeddingPublished}
                  onChangeMainEvent={() => onChangeMainEvent(event.id)}
                  onDelete={() => {
                    console.log('onConfirmed');
                    setHighlightedEventId(event.id);
                    setIsDeleting(true);
                  }}
                />
              );
            })
          )}
        </View>
      </Card>
      <EModal visible={isChangingMainEvent} onClose={() => {}}>
        <View
          style={{
            backgroundColor: theme['bg-surface'],
            padding: SPACING.md,
            elevation: 1,
            borderRadius: RADIUS.md,
            flexDirection: 'row',
            alignItems: 'center',
            gap: SPACING.sm,
            marginHorizontal: SPACING.lg,
          }}>
          <ActivityIndicator
            size={TYPOGRAPHY.textStyle.h1.lineHeight}
            color={theme['primary-bg']}
          />
          <Typography>Mengubah acara utama...</Typography>
        </View>
      </EModal>
    </>
  );
}
