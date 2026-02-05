import { useMemo } from 'react';
import {
  ActivityIndicator,
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { RADIUS, SPACING, TYPOGRAPHY } from '../../constants';
import { useTheme } from './AppProvider';
import Typography from './Typography';
import { PlatformPressable } from '@react-navigation/elements';
import { TypographyCategoryType } from '../../types/typography-type';

export type ButtonAppearance =
  | 'primary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'transparent'
  | 'secondary'
  | 'basic';

const Button = ({
  children,
  onPress,
  disabled = false,
  appearance = 'primary',
  style = {},
  textStyle,
  category = 'small',
  isLoading,
}: {
  children: string | React.ReactNode;
  onPress?: (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | GestureResponderEvent,
  ) => void;
  disabled?: boolean;
  appearance?: ButtonAppearance;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  category?: TypographyCategoryType;
  isLoading?: boolean;
}) => {
  const theme = useTheme();

  const btnColor = useMemo(() => {
    switch (appearance) {
      case 'primary':
        return {
          background:
            disabled || isLoading
              ? theme['primary-disabled-bg']
              : theme['primary-bg'],
          border:
            disabled || isLoading
              ? theme['primary-disabled-bg']
              : theme['primary-bg'],
          text: theme['primary-text'],
        };
      case 'info':
        return {
          background:
            disabled || isLoading
              ? theme['secondary-disabled-bg']
              : theme['info-text'],
          border:
            disabled || isLoading
              ? theme['secondary-disabled-bg']
              : theme['info-text'],
          text:
            disabled || isLoading
              ? theme['secondary-disabled-text']
              : theme['text-inverse'],
        };
      case 'warning':
        return {
          background:
            disabled || isLoading
              ? theme['secondary-disabled-bg']
              : theme['warning-text'],
          border:
            disabled || isLoading
              ? theme['secondary-disabled-bg']
              : theme['warning-text'],
          text:
            disabled || isLoading
              ? theme['secondary-disabled-text']
              : theme['text-inverse'],
        };
      case 'danger':
        return {
          background:
            disabled || isLoading
              ? theme['secondary-disabled-bg']
              : theme['error-text'],
          border:
            disabled || isLoading
              ? theme['secondary-disabled-bg']
              : theme['error-text'],
          text:
            disabled || isLoading
              ? theme['secondary-disabled-text']
              : theme['text-inverse'],
        };
      case 'success':
        return {
          background:
            disabled || isLoading
              ? theme['secondary-disabled-bg']
              : theme['success-text'],
          border:
            disabled || isLoading
              ? theme['secondary-disabled-bg']
              : theme['success-text'],
          text:
            disabled || isLoading
              ? theme['secondary-disabled-text']
              : theme['text-inverse'],
        };
      case 'secondary':
        return {
          background:
            disabled || isLoading
              ? theme['secondary-disabled-bg']
              : theme['secondary-bg'],
          border:
            disabled || isLoading
              ? theme['border-muted']
              : theme['border-default'],
          text:
            disabled || isLoading
              ? theme['secondary-disabled-text']
              : theme['secondary-text'],
        };
      case 'basic': {
        return {
          background:
            disabled || isLoading ? theme['bg-muted'] : theme['bg-surface'],
          border:
            disabled || isLoading
              ? theme['border-muted']
              : theme['border-default'],
          text:
            disabled || isLoading
              ? theme['text-disabled']
              : theme['text-primary'],
        };
      }
      default:
        return {
          background: 'transparent',
          border: 'transparent',
          text:
            disabled || isLoading
              ? theme['text-disabled']
              : theme['text-primary'],
        };
    }
  }, [appearance, disabled, theme, isLoading]);

  const textStyleProps = StyleSheet.flatten(textStyle);
  const styleProps = StyleSheet.flatten(style);

  return (
    <View
      style={{
        borderRadius: styleProps.borderRadius ?? RADIUS.full,
        flex: styleProps.flex,
        flexGrow: styleProps.flexGrow,
        overflow: 'hidden',
        flexBasis: styleProps.flexBasis,
        width: styleProps.width,
      }}>
      <PlatformPressable
        disabled={disabled || isLoading}
        pressColor={disabled || isLoading ? 'transparent' : theme.overlay}
        style={[
          {
            borderRadius: RADIUS.full,
            borderWidth: 1,
            backgroundColor: btnColor.background,
            borderColor: btnColor.border,
            paddingVertical: SPACING.sm,
            paddingHorizontal: SPACING.md,
          },
          style,
        ]}
        onPress={isLoading ? undefined : onPress}>
        {isLoading ? (
          <ActivityIndicator
            size={TYPOGRAPHY.textStyle[category || 'regular'].lineHeight + 1}
            color={textStyleProps?.color || btnColor.text}
          />
        ) : (
          <>
            {typeof children === 'string' ? (
              <Typography
                color={textStyleProps?.color || btnColor.text}
                style={{textAlign: 'center', ...textStyleProps}}
                fontWeight={
                  !textStyleProps?.fontWeight
                    ? category !== 'small' && category !== 'xsmall'
                      ? 700
                      : 600
                    : undefined
                }
                category={category}>
                {children}
              </Typography>
            ) : (
              children
            )}
          </>
        )}
      </PlatformPressable>
    </View>
  );
};

export default Button;
