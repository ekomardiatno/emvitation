import { Pressable } from 'react-native';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useTheme } from './core/AppProvider';
import Typography from './core/Typography';
import { useMemo } from 'react';
import { RADIUS } from '../constants';

export default function PushableButton({
  children,
  variant = 'primary',
  onPress,
}: {
  children: React.ReactNode | string;
  variant?:
    | 'primary'
    | 'success'
    | 'info'
    | 'error'
    | 'secondary'
    | 'warning'
    | 'success-50'
    | 'warning-50'
    | 'info-50'
    | 'error-50';
  onPress?: () => void;
}) {
  const scale = useSharedValue(1);
  const overlayOpacity = useSharedValue(0);
  const theme = useTheme();

  const onPressIn = () => {
    scale.value = withSpring(0.98);
    overlayOpacity.value = withSpring(1);
  };

  const onBeforePressOut = () => {
    scale.value = withSpring(1);
    overlayOpacity.value = withSpring(0);
  };

  const onPressOut = () => {
    if (onPress) {
      onPress();
    }
  };

  const buttonTheme = useMemo(() => {
    switch (variant) {
      case 'error':
        return {
          bg: theme['error-text'],
          text: theme['text-inverse'],
        };
      case 'success':
        return {
          bg: theme['success-text'],
          text: theme['text-inverse'],
        };
      case 'info':
        return {
          bg: theme['info-text'],
          text: theme['text-inverse'],
        };
      case 'warning':
        return {
          bg: theme['warning-text'],
          text: theme['text-inverse'],
        };
      case 'secondary':
        return {
          bg: theme['secondary-bg'],
          text: theme['secondary-text'],
        };
      case 'error-50':
        return {
          bg: theme['error-bg'],
          text: theme['error-text'],
        };
      case 'info-50':
        return {
          bg: theme['info-bg'],
          text: theme['info-text'],
        };
      case 'warning-50':
        return {
          bg: theme['warning-bg'],
          text: theme['warning-text'],
        };
      case 'success-50':
        return {
          bg: theme['success-bg'],
          text: theme['success-text'],
        };
      default:
        return {
          bg: theme['primary-bg'],
          text: theme['primary-text'],
        };
    }
  }, [theme, variant]);

  return (
    <Pressable
      onPressIn={onPressIn}
      onTouchEnd={onBeforePressOut}
      onPressOut={onPressOut}>
      <Animated.View
        style={{
          backgroundColor: buttonTheme.bg,
          paddingVertical: 10,
          paddingHorizontal: 15,
          borderRadius: RADIUS.full,
          position: 'relative',
          transform: [{scale}],
        }}>
        {typeof children === 'string' ? (
          <Typography
            style={{textAlign: 'center'}}
            color={buttonTheme.text}
            category="small">
            {children}
          </Typography>
        ) : (
          children
        )}
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: theme.overlay,
            opacity: overlayOpacity,
          }}
        />
      </Animated.View>
    </Pressable>
  );
}
