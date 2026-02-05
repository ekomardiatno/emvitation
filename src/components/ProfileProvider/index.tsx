import { useCallback, useEffect } from 'react';
import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';
import { getMyProfile } from '../../services/profile';
import {
  getProfileError,
  gettingProfile,
  setProfile,
} from '../../redux/reducers/profile.reducer';
import { ApiError } from '../../services/common';

export default function ProfileProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const {accessToken} = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const {isLoading} = useAppSelector(state => state.profile);

  useEffect(() => {
    if (accessToken) {
      dispatch(gettingProfile());
    }
  }, [accessToken, dispatch]);

  const fetchProfile = useCallback(
    async (signal?: AbortSignal) => {
      if (!accessToken) {
        return;
      }
      try {
        const res = await getMyProfile(signal);
        if (res.status >= 200 && res.status < 300) {
          dispatch(
            setProfile({
              name: res.data.name,
              phone: res.data.phone,
            }),
          );
        } else {
          throw new Error('Unable to get profile');
        }
      } catch (e) {
        if (
          (e instanceof Error && e.message !== 'canceled') ||
          (e as ApiError).message
        ) {
          dispatch(
            getProfileError({
              error: (e as Error | ApiError).message,
            }),
          );
        }
      }
    },
    [dispatch, accessToken],
  );

  useEffect(() => {
    const controller = new AbortController();
    if (isLoading) {
      fetchProfile(controller.signal);
    } else {
      controller.abort();
    }
  }, [isLoading, fetchProfile]);

  return <>{children}</>;
}
