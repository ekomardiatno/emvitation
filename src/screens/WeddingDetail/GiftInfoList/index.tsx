import MaterialIcons from '@react-native-vector-icons/material-icons';
import { useTheme } from '../../../components/core/AppProvider';
import Button from '../../../components/core/Button';
import Card from '../../../components/core/Card';
import { SPACING, TYPOGRAPHY } from '../../../constants';
import useAppNavigation from '../../../hooks/useAppNavigation';
import GiftInfoItem from './GiftInfoItem';
import { View } from 'react-native';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  deleteGiftInfo,
  getGiftInfoByInvitationId,
} from '../../../services/giftInfo';
import LoadingState from '../../../components/LoadingState';
import { ErrorState } from '../../../components/ErrorState';
import { EmptyState } from '../../../components/EmptyState';
import useAppSelector from '../../../hooks/useAppSelector';
import useAppDispatch from '../../../hooks/useAppDispatch';
import {
  pushGiftInfos,
  removeGiftInfo,
} from '../../../redux/reducers/gift-info.reducer';
import { ApiError } from '../../../services/common';
import useToast from '../../../hooks/useToast';

export default function GiftInfoList({invitationId}: {invitationId: string}) {
  const navigation = useAppNavigation();
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {giftInfos} = useAppSelector(state => state.giftInfo);
  const dispatch = useAppDispatch();
  const [isDeleting, setIsDeleting] = useState(false);
  const [highlightedGiftInfoId, setHighlightedGiftInfoId] = useState<
    string | null
  >(null);
  const toast = useToast();
  const {weddings} = useAppSelector(state => state.wedding);

  const fetchGiftInfos = useCallback(
    async (signal?: AbortSignal) => {
      if (!invitationId) {
        setIsLoading(false);
        return;
      }
      try {
        const res = await getGiftInfoByInvitationId(invitationId, signal);
        if (res.status === 200 && res.data) {
          dispatch(pushGiftInfos(res.data));
        } else {
          setError(res.message || 'Failed to fetch gift info');
        }
      } catch (err) {
        setError('Failed to fetch gift info');
      } finally {
        setIsLoading(false);
      }
    },
    [invitationId, dispatch],
  );

  useEffect(() => {
    const controller = new AbortController();
    if (isLoading) {
      fetchGiftInfos(controller.signal);
    }
    return () => {
      controller.abort();
    };
  }, [isLoading, fetchGiftInfos]);

  const fetchDelete = useCallback(
    async (signal?: AbortSignal) => {
      if (!highlightedGiftInfoId) {
        setIsDeleting(false);
        return;
      }
      try {
        const res = await deleteGiftInfo(highlightedGiftInfoId, signal);
        if (res.status >= 200 && res.status < 300) {
          setIsDeleting(false);
          dispatch(removeGiftInfo(highlightedGiftInfoId));
        } else {
          throw new Error(res.message || 'Failed to delete gift info');
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
        setHighlightedGiftInfoId(null);
      }
    },
    [dispatch, highlightedGiftInfoId, toast],
  );

  useEffect(() => {
    const controller = new AbortController();
    if (isDeleting) {
      fetchDelete(controller.signal);
    } else {
      controller.abort();
    }
  }, [isDeleting, fetchDelete]);

  const hasInvitationPublished = useMemo(() => {
    const wedding = weddings.find(w => w.invitationId === invitationId);
    if (wedding?.status !== 'published') {
      return false;
    }
    return true;
  }, [weddings, invitationId]);

  return (
    <Card
      title="Amplop Digital"
      rightControl={
        <>
          {!hasInvitationPublished && (
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
                  navigation.navigate('GiftInfoForm', {
                    invitationId: invitationId,
                  });
                }
              }}
              disabled={!invitationId || isDeleting}>
              <MaterialIcons
                name="add"
                size={TYPOGRAPHY.textStyle.xsmall.lineHeight}
                color={theme['primary-text']}
              />
            </Button>
          )}
        </>
      }>
      {isLoading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} onRetry={() => setIsLoading(true)} />
      ) : giftInfos.length === 0 ? (
        <EmptyState
          title="Belum ada data amplop digital"
          message="Mulai menambahkan data amplop digital baru"
        />
      ) : (
        <View style={{gap: SPACING.md}}>
          {giftInfos.map(giftInfo => {
            return (
              <GiftInfoItem
                key={giftInfo.id}
                accountHolderName={giftInfo.accountName}
                accountNumber={giftInfo.accountNumber}
                providerName={giftInfo.provider}
                onEdit={() => {
                  navigation.navigate('GiftInfoForm', {
                    invitationId: invitationId,
                    giftInfoId: giftInfo.id,
                  });
                }}
                isDeleting={isDeleting}
                onDelete={() => {
                  setHighlightedGiftInfoId(giftInfo.id);
                  setIsDeleting(true);
                }}
                disableControls={hasInvitationPublished}
              />
            );
          })}
        </View>
      )}
    </Card>
  );
}
