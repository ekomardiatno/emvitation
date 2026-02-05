import { useWindowDimensions, View } from 'react-native';
import ToastContext from '../contexts/ToastContext';
import { ToastType } from '../types/toast-type';
import Typography from './core/Typography';
import { useTheme } from './core/AppProvider';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { RADIUS, SPACING, TYPOGRAPHY } from '../constants';
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from '@react-native-vector-icons/material-icons';
import { MaterialIconsType } from '../types/material-icons';
import getRandomIntInclusive from '../utils/getRandomIntInclusive';

const DEFAULT_TOAST_DURATION = 2000;
const ANIMATION_DURATION = 300;

const Toast = memo(function Toast({
  type,
  message,
  duration = DEFAULT_TOAST_DURATION,
  onClosed,
  toastId,
}: {
  type: ToastType;
  message: string;
  duration?: number;
  onClosed?: (toastId?: number) => void;
  toastId?: number;
}) {
  const insets = useSafeAreaInsets();
  const initTranslateY = SPACING['3xl'] + insets.bottom;
  const theme = useTheme();
  const marginTop = useSharedValue(0);
  const opacity = useSharedValue(0);
  const [isRemoved, setIsRemoved] = useState(false);
  const [elementHeight, setElementHeight] = useState(0);
  const translateY = useSharedValue(initTranslateY);
  const [isClosing, setIsClosing] = useState(false);

  const removeToast = useCallback(() => {
    setIsRemoved(true);
    if (onClosed) {
      onClosed(toastId);
    }
  }, [onClosed, toastId]);

  useEffect(() => {
    if (!isRemoved && isClosing) {
      setTimeout(() => {
        removeToast();
      }, ANIMATION_DURATION);
    }
  }, [isClosing, isRemoved, removeToast]);

  useEffect(() => {
    const showToast = () => {
      opacity.value = withTiming(1, {
        duration: ANIMATION_DURATION,
      });
      translateY.value = withTiming(0, {
        duration: ANIMATION_DURATION,
      });
    };
    if (!isRemoved) {
      if (duration > 0) {
        showToast();
        const timeoutClose = setTimeout(() => {
          marginTop.value = withTiming(elementHeight * -1, {
            duration: ANIMATION_DURATION,
          });
          opacity.value = withTiming(0, {
            duration: ANIMATION_DURATION,
          });
          translateY.value = withTiming(initTranslateY, {
            duration: ANIMATION_DURATION,
          });
          setIsClosing(true);
        }, ANIMATION_DURATION + DEFAULT_TOAST_DURATION);
        return () => {
          clearTimeout(timeoutClose);
        };
      } else {
        showToast();
      }
    }
  }, [
    duration,
    elementHeight,
    initTranslateY,
    marginTop,
    opacity,
    translateY,
    isRemoved,
  ]);

  const toastStyle = useMemo<{
    bg: string;
    iconBg: string;
    iconName: MaterialIconsType;
  }>(() => {
    switch (type) {
      case 'error':
        return {
          bg: theme['error-bg'],
          iconBg: theme['error-text'],
          iconName: 'cancel',
        };
      case 'success':
        return {
          bg: theme['success-bg'],
          iconBg: theme['success-text'],
          iconName: 'check-circle',
        };
      case 'warning':
        return {
          bg: theme['warning-bg'],
          iconBg: theme['warning-text'],
          iconName: 'error',
        };
      default:
        return {
          bg: theme['info-bg'],
          iconBg: theme['info-text'],
          iconName: 'info',
        };
    }
  }, [theme, type]);

  if (isRemoved) {
    return null;
  }

  return (
    <Animated.View
      style={{
        backgroundColor: toastStyle.bg,
        opacity: opacity,
        marginTop: marginTop,
        transform: [{translateY}],
        padding: SPACING.sm,
        paddingVertical: SPACING.sm,
        borderRadius: RADIUS.lg,
        elevation: SPACING.sm,
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.sm,
      }}
      onLayout={e => {
        setElementHeight(e.nativeEvent.layout.height + SPACING.sm);
      }}>
      <View
        style={{
          width: 30,
          height: 30,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: toastStyle.iconBg,
          flexShrink: 0,
          borderRadius: RADIUS.full,
        }}>
        <Icon
          name={toastStyle.iconName}
          color={theme.light}
          size={TYPOGRAPHY.textStyle.small.lineHeight}
        />
      </View>
      <Typography
        style={{flex: 1}}
        fontWeight={400}
        category="small"
        color={theme['text-primary']}>
        {message}
      </Typography>
    </Animated.View>
  );
});

export default function ToastProvider({children}: {children: React.ReactNode}) {
  const {width} = useWindowDimensions();
  const [toasts, setToasts] = useState<
    {
      toastId: number;
      type: ToastType;
      message: string;
      duration?: number;
      createdAt: number;
    }[]
  >([]);
  const [closedToasts, setClosedToasts] = useState<number[]>([]);
  const timeoutCheckToasts = useRef<NodeJS.Timeout | null>(null);
  const timeoutClearToasts = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (closedToasts.length > 0) {
      timeoutCheckToasts.current = setTimeout(() => {
        if (closedToasts.length === toasts.length) {
          if (timeoutClearToasts.current) {
            clearTimeout(timeoutClearToasts.current);
          }
          setToasts(toast =>
            toast.filter(t => !closedToasts.includes(t.toastId)),
          );
          timeoutClearToasts.current = setTimeout(() => {
            setToasts([]);
            setClosedToasts([]);
          }, ANIMATION_DURATION);
        }
      }, ANIMATION_DURATION);
      return () => {
        if (timeoutCheckToasts.current) {
          clearTimeout(timeoutCheckToasts.current);
        }
      };
    }
  }, [closedToasts, toasts.length]);

  const show = useCallback(
    (type: ToastType, message: string, duration?: number) => {
      const toastId = new Date().getTime() + getRandomIntInclusive(100, 999);
      setToasts(prev => {
        if (prev.find(p => p.message === message)) {
          const existing = prev.find(p => p.message === message);
          if (
            existing &&
            existing.createdAt +
              ANIMATION_DURATION * 2 +
              (existing.duration || DEFAULT_TOAST_DURATION) >
              Date.now()
          ) {
            return prev;
          }
        }
        if (timeoutCheckToasts.current) {
          clearTimeout(timeoutCheckToasts.current);
        }
        return [
          ...prev.filter(p => p.message !== message),
          {
            type,
            message,
            duration,
            toastId,
            createdAt: Date.now(),
          },
        ];
      });
    },
    [],
  );

  const insets = useSafeAreaInsets();

  return (
    <ToastContext.Provider value={{show}}>
      {children}
      <View
        style={{
          position: 'absolute',
          bottom: SPACING['3xl'] + insets.bottom,
          left: 0,
          width: width,
          gap: SPACING.sm,
          flexDirection: 'column-reverse',
          alignItems: 'center',
          paddingHorizontal: SPACING.md,
        }}>
        {toasts
          .filter(t => !closedToasts.includes(t.toastId))
          .map(toast => (
            <Toast
              key={toast.toastId}
              type={toast.type}
              message={toast.message}
              duration={toast.duration}
              toastId={toast.toastId}
              onClosed={() => {
                setClosedToasts(state => [...state, toast.toastId]);
              }}
            />
          ))}
      </View>
    </ToastContext.Provider>
  );
}
