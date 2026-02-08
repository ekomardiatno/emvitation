import { Linking } from 'react-native';
import { APP_SPA_URL } from '../config';

export function getSpaUrl(path: string) {
  return APP_SPA_URL + path;
}

export default function openSpa(path: string) {
  Linking.openURL(getSpaUrl(path)).catch(() => {});
}
