import Icon from '@react-native-vector-icons/material-icons';
import { DimensionValue, GestureResponderEvent, View } from 'react-native';
import Typography from './Typography';
import { useTheme } from './AppProvider';
import { MaterialIconsType } from '../../types/material-icons';
import { PlatformPressable } from '@react-navigation/elements';
import { SPACING } from '../../constants';
import { useMemo } from 'react';

export default function PressableCard({
  title,
  iconName,
  shortDescription,
  onPress,
  width,
  variant,
}: {
  title: string;
  iconName: MaterialIconsType;
  shortDescription?: string;
  onPress?: (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | GestureResponderEvent,
  ) => void;
  width?: DimensionValue;
  variant?: 'success' | 'info' | 'error' | 'warning' | 'secondary';
}) {
  const theme = useTheme();

  const variantStyle = useMemo(() => {
    switch (variant) {
      case 'error':
        return {
          bg: theme['error-bg'],
          text: theme['error-text'],
        };
      case 'info':
        return {
          bg: theme['info-bg'],
          text: theme['info-text'],
        };
      case 'success':
        return {
          bg: theme['success-bg'],
          text: theme['success-text'],
        };
      case 'warning':
        return {
          bg: theme['warning-bg'],
          text: theme['warning-text'],
        };
      default:
        return {
          bg: theme['secondary-bg'],
          text: theme['secondary-text'],
        };
    }
  }, [theme, variant]);

  return (
    <View
      style={{
        justifyContent: 'space-between',
        padding: SPACING.md,
        backgroundColor: theme['bg-surface'],
        borderRadius: 10,
        flexGrow: 1,
        overflow: 'hidden',
        borderColor: theme['border-default'],
        borderWidth: 1,
        width,
      }}>
      <View
        style={{width: '100%', alignItems: 'center', justifyContent: 'center'}}>
        <View
          style={{
            width: 60,
            height: 60,
            borderRadius: 60,
            backgroundColor: variantStyle.bg,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: SPACING.md,
          }}>
          <Icon name={iconName} color={variantStyle.text} size={30} />
        </View>
        <Typography
          category="small"
          numberOfLines={1}
          fontWeight={600}
          style={{textAlign: 'center'}}>
          {title}
        </Typography>
        {shortDescription && (
          <Typography
            category="xsmall"
            color={theme['text-secondary']}
            numberOfLines={1}
            style={{textAlign: 'center'}}>
            {shortDescription}
          </Typography>
        )}
      </View>
      <PlatformPressable
        pressColor={theme['bg-surface']}
        style={{position: 'absolute', top: 0, left: 0, bottom: 0, right: 0}}
        onPress={onPress}>
        <View />
      </PlatformPressable>
    </View>
  );
}
