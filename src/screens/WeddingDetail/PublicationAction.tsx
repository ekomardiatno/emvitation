import { useCallback, useEffect, useState } from 'react';
import useAppSelector from '../../hooks/useAppSelector';
import { updateWedding } from '../../services/wedding';
import { WeddingDataType } from '../../types/wedding-type';
import Confirmation from '../../components/core/Confirmation';
import useAppDispatch from '../../hooks/useAppDispatch';
import { patchWedding } from '../../redux/reducers/wedding.reducer';
import useToast from '../../hooks/useToast';
import { ApiError } from '../../services/common';

export default function PublicationAction({
  wedding,
}: {
  wedding?: WeddingDataType;
}) {
  const [isChangingStatus, setIsChangingStatus] = useState(false);
  const [nextStatus, setNextStatus] = useState<
    WeddingDataType['status'] | null
  >(null);
  const {events} = useAppSelector(state => state.event);
  const dispatch = useAppDispatch();
  const toast = useToast();

  const fetchChangeStatus = useCallback(
    async (signal?: AbortSignal) => {
      if (!wedding || !nextStatus) {
        setIsChangingStatus(false);
        return;
      }
      try {
        const res = await updateWedding(
          wedding.id,
          {
            status: nextStatus,
          },
          signal,
        );
        if (res.status >= 200 && res.status < 300) {
          dispatch(patchWedding(res.data));
          toast.show(
            'success',
            nextStatus === 'published'
              ? 'Berhasil menerbitkan undangan'
              : 'Undangan siap untuk diedit',
          );
          setIsChangingStatus(false);
        } else {
          throw new Error(res.message || 'Unable to publish invitation');
        }
      } catch (e) {
        if (
          (e instanceof Error && e.message !== 'canceled') ||
          (e as ApiError).message
        ) {
          toast.show('error', (e as Error | ApiError).message);
        }
        setIsChangingStatus(false);
      }
    },
    [wedding, dispatch, toast, nextStatus],
  );

  useEffect(() => {
    const controller = new AbortController();
    if (isChangingStatus) {
      fetchChangeStatus(controller.signal);
    } else {
      controller.abort();
    }
  }, [isChangingStatus, fetchChangeStatus]);

  const onChangeStatus = (status: WeddingDataType['status']) => {
    if (!wedding) {
      return;
    }
    setNextStatus(status);
    const weddingEvents = events.filter(
      ev => ev.invitationId === wedding.invitationId,
    );
    if (weddingEvents.length < 1) {
      toast.show('warning', 'Daftar acara masih kosong');
      return;
    }
    const latestEvent = weddingEvents.sort((a, b) => {
      const aTime = new Date(a.date).setHours(
        Number(a.endTime.split(':').at(0)),
        Number(a.endTime.split(':').at(1)),
        Number(a.endTime.split(':').at(2)),
        0,
      );
      const bTime = new Date(b.date).setHours(
        Number(b.endTime.split(':').at(0)),
        Number(b.endTime.split(':').at(1)),
        Number(b.endTime.split(':').at(2)),
        0,
      );
      return bTime - aTime;
    })[0];
    const earliestEventTime = new Date(latestEvent.date).setHours(
      Number(latestEvent.endTime.split(':').at(0)),
      Number(latestEvent.endTime.split(':').at(1)),
      Number(latestEvent.endTime.split(':').at(2)),
      0,
    );

    if (wedding.status !== 'published' && earliestEventTime < Date.now()) {
      toast.show('error', 'Acara pernikahan sudah kedaluwarsa');
      return;
    }
    setIsChangingStatus(true);
  };

  if (!wedding) {
    return null;
  }
  return (
    <Confirmation
      mode="button"
      appearance={wedding.status === 'published' ? 'danger' : 'primary'}
      cautionTitle={
        wedding.status === 'published' ? 'Edit Undangan' : 'Terbitkan Undangan'
      }
      isLoading={isChangingStatus}
      cautionText={
        wedding.status === 'published'
          ? 'Undangan tidak dapat diakses publik sampai kamu menerbitkan ulang undangan'
          : 'Kamu tidak bisa mengedit undangan atau menambahkan daftar tamu setelah undangan diterbitkan!'
      }
      confirmText={wedding.status === 'published' ? 'Edit' : 'Terbitkan'}
      cancelText="Batal"
      onConfirmed={() => {
        if (wedding.status === 'published') {
          onChangeStatus('draft');
        } else {
          onChangeStatus('published');
        }
      }}>
      {wedding.status === 'published' ? 'Edit Undangan' : 'Terbitkan Undangan'}
    </Confirmation>
  );
}
