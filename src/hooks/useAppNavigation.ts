import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../types/navigation-props';

export default function useAppNavigation() {
  return useNavigation<NavigationProp>();
}
