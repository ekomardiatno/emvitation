import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export default function useAppSelector<T>(
  selector: (state: RootState) => T,
): T {
  return useSelector(selector);
}
