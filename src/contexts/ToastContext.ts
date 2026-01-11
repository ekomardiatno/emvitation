import { createContext } from 'react';
import { ToastType } from '../types/toast-type';

export default createContext<{
  show: (type: ToastType, message: string, duration?: number) => void;
}>({
  show: () => {},
});
