import ScreenLayout from '../../components/core/ScreenLayout';
import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';
import LoadingState from '../../components/LoadingState';
import { ErrorState } from '../../components/ErrorState';
import { loadingRsvp } from '../../redux/reducers/rsvp.reducer';
import { EmptyState } from '../../components/EmptyState';
import { View } from 'react-native';
import { SPACING } from '../../constants';
import RsvpCard from './RsvpCard';

export default function RsvpList() {
  const {rsvp, isLoading, error} = useAppSelector(state => state.rsvp);
  const dispatch = useAppDispatch();

  return (
    <ScreenLayout title="RSVP">
      {isLoading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState
          message={error}
          onRetry={() => {
            dispatch(loadingRsvp());
          }}
        />
      ) : rsvp.length < 1 ? (
        <EmptyState
          title="RSVP Kosong"
          message="Belum ada konfirmasi kehadiran tamu"
        />
      ) : (
        <View style={{gap: SPACING.md}}>
          {rsvp.map(r => {
            return <RsvpCard key={r.id} rsvpData={r} />;
          })}
        </View>
      )}
    </ScreenLayout>
  );
}
