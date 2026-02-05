import { Pressable, StyleProp, View, ViewStyle } from 'react-native';
import { useTheme } from './core/AppProvider';
import { RADIUS, SPACING, TYPOGRAPHY } from '../constants';
import Icon from '@react-native-vector-icons/material-icons';
import Typography from './core/Typography';
import { MaterialIconsType } from '../types/material-icons';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

export default function SettingsSection({
  children,
}: {
  children?: React.ReactNode;
}) {
  const theme = useTheme();

  return (
    <View
      style={{
        gap: 1,
        backgroundColor: theme['bg-surface'],
        borderWidth: 1,
        borderColor: theme['border-default'],
        borderRadius: RADIUS.lg,
        overflow: 'hidden',
      }}>
      {children}
    </View>
  );
}
const IconComponent = ({
  hidden,
  iconName,
}: {
  iconName?: MaterialIconsType;
  hidden?: boolean;
}) => {
  const theme = useTheme();
  if (!iconName) {
    return null;
  }
  return (
    <Icon
      name={iconName}
      size={TYPOGRAPHY.textStyle.h3.fontSize}
      color={theme['text-primary']}
      style={{marginTop: 0, opacity: hidden ? 0 : 1}}
    />
  );
};

const SettingsItemTextComponent = ({
  title,
  description,
  hidden,
}: {
  title: string;
  description: string;
  hidden?: boolean;
}) => {
  const theme = useTheme();
  return (
    <View style={{position: 'relative', flexGrow: 1}}>
      <Typography
        style={{opacity: hidden ? 0 : 1}}
        fontWeight={700}
        category="small">
        {title}
      </Typography>
      <Typography
        style={{opacity: hidden ? 0 : 1, marginTop: SPACING.xxs}}
        category="xsmall">
        {description}
      </Typography>
      {hidden && (
        <View
          style={{
            borderTopColor: theme['border-default'],
            borderTopWidth: 1,
            position: 'absolute',
            bottom: SPACING.md * -1 - 1,
            left: 0,
            right: 0,
          }}
        />
      )}
    </View>
  );
};

export function SettingsItem({
  title,
  description,
  onPress,
  iconName,
}: {
  title: string;
  description: string;
  onPress?: () => void;
  iconName?: MaterialIconsType;
}) {
  const theme = useTheme();
  const scale = useSharedValue(1);
  const overlayOpacity = useSharedValue(0);

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

  const containerStyle: StyleProp<ViewStyle> = {
    flexDirection: 'row',
    gap: SPACING.sm,
    padding: SPACING.sm,
    paddingVertical: SPACING.md,
  };

  return (
    <Pressable
      onPressIn={onPressIn}
      onTouchEnd={onBeforePressOut}
      onPressOut={onPressOut}>
      <View style={{position: 'relative'}}>
        <Animated.View
          style={{
            ...containerStyle,
            position: 'absolute',
            top: 0,
            left: 0,
            transform: [{scale: scale}],
          }}>
          <IconComponent iconName={iconName} />
          <SettingsItemTextComponent title={title} description={description} />
        </Animated.View>
        <View style={containerStyle}>
          <IconComponent iconName={iconName} hidden />
          <SettingsItemTextComponent
            title={title}
            description={description}
            hidden
          />
        </View>
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
      </View>
    </Pressable>
  );
}
