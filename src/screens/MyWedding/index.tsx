import ScreenLayout from '../../components/core/ScreenLayout';
import { View } from 'react-native';
import { SPACING } from '../../constants';
import useAppNavigation from '../../hooks/useAppNavigation';
import { useEffect, useState } from 'react';
import { WeddingDataType } from '../../types/wedding-type';
import LoadingState from '../../components/LoadingState';
import { ErrorState } from '../../components/ErrorState';
import useAppSelector from '../../hooks/useAppSelector';
import { loadingTemplates } from '../../redux/reducers/template.reducer';
import useAppDispatch from '../../hooks/useAppDispatch';
import { EmptyState } from '../../components/EmptyState';
import { WeddingCard } from './WeddingCard';
import { AppStackParamList } from '../../types/navigation-type';
import { RouteProp } from '@react-navigation/native';
import { loadingWeddings } from '../../redux/reducers/wedding.reducer';
import { loadingGuests } from '../../redux/reducers/guest.reducer';

type MyWeddingRouteProp = RouteProp<AppStackParamList, 'MyWedding'>;

export default function MyWedding({}: {route?: MyWeddingRouteProp}) {
  const {isLoading, weddings, error} = useAppSelector(state => state.wedding);
  const {isLoading: isGuestLoading, error: errorGuests} = useAppSelector(
    state => state.guest,
  );
  const [list, setList] = useState<WeddingDataType[]>(weddings);
  const dispatch = useAppDispatch();
  const {isLoading: areTemplatesLoading} = useAppSelector(
    state => state.template,
  );
  const navigation = useAppNavigation();

  useEffect(() => {
    setList(weddings);
  }, [weddings]);

  useEffect(() => {
    if (areTemplatesLoading) {
      dispatch(loadingTemplates());
    }
  }, [dispatch, areTemplatesLoading]);

  useEffect(() => {
    if (isLoading) {
      dispatch(loadingWeddings());
    }
  }, [dispatch, isLoading]);

  useEffect(() => {
    if (isGuestLoading) {
      dispatch(loadingGuests());
    }
  }, [dispatch, isGuestLoading]);

  return (
    <ScreenLayout title="Undangan Saya">
      {isLoading || isGuestLoading ? (
        <LoadingState />
      ) : error || errorGuests ? (
        <ErrorState
          message={error || errorGuests || ''}
          onRetry={() => {
            if (error) {
              dispatch(loadingWeddings());
            }
            if (errorGuests) {
              dispatch(loadingGuests());
            }
          }}
        />
      ) : (
        <>
          {list.length < 1 ? (
            <EmptyState
              title="Belum Ada Undangan"
              message="Kamu belum membuat undangan. Buat undangan pertamamu sekarang!"
              onRetry={() => navigation.navigate('WeddingForm')}
              retryLabel="Buat Undangan"
            />
          ) : (
            <View style={{gap: SPACING.md}}>
              {list.map(item => {
                return <WeddingCard key={item.id} data={item} />;
              })}
            </View>
          )}
        </>
      )}
    </ScreenLayout>
  );
}
