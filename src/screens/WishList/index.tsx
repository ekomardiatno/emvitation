import { View } from 'react-native';
import ScreenLayout from '../../components/core/ScreenLayout';
import { EmptyState } from '../../components/EmptyState';
import { ErrorState } from '../../components/ErrorState';
import LoadingState from '../../components/LoadingState';
import { SPACING } from '../../constants';
import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';
import { loadingWishes } from '../../redux/reducers/wish.reducer';
import WishCard from './WishCard';

export default function WishList() {
  const {wishes, isLoading, error} = useAppSelector(state => state.wish);
  const dispatch = useAppDispatch();
  return (
    <ScreenLayout title="Ucapan">
      {isLoading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState
          message={error}
          onRetry={() => {
            dispatch(loadingWishes());
          }}
        />
      ) : wishes.length < 1 ? (
        <EmptyState
          title="Ucapan Kosong"
          message="Belum ada ucapan yang masuk"
        />
      ) : (
        <View style={{gap: SPACING.md}}>
          {wishes.map(w => {
            return <WishCard key={w.id} wish={w} />;
          })}
        </View>
      )}
    </ScreenLayout>
  );
}
