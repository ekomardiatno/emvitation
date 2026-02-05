import { useNavigation } from '@react-navigation/native';
import {
  AppStackNavigationProp,
  AuthStackNavigationProp,
} from '../types/navigation-type';

export default function useAppNavigation<
  T = AppStackNavigationProp & AuthStackNavigationProp,
>() {
  return useNavigation<T>();
}
