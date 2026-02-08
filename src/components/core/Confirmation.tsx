import {
  View,
  StatusBar,
  Platform,
  useWindowDimensions,
  ViewStyle,
  TextStyle,
  StyleProp,
} from 'react-native';
import { useTheme } from './AppProvider';
import { RADIUS, SPACING, TYPOGRAPHY } from '../../constants';
import Typography from './Typography';
import Button, { ButtonAppearance } from './Button';
import { useEffect, useState } from 'react';
import EModal from './EModal';
import MaterialIcons from '@react-native-vector-icons/material-icons';

export const illustrationImage = (appearance?: ButtonAppearance) => {
  switch (appearance) {
    case 'warning':
      return require('../../assets/images/warning-illustration.webp');
    case 'success':
      return require('../../assets/images/success-illustration.webp');
    case 'danger':
      return require('../../assets/images/error-illustration.webp');
    case 'info':
      return require('../../assets/images/info-illustration.webp');
    default:
      return require('../../assets/images/neutral-illustration.webp');
  }
};

export const IconState = ({
  appearance,
  size,
  style,
}: {
  appearance?: ButtonAppearance;
  size?: number;
  style?: StyleProp<TextStyle>;
}) => {
  const theme = useTheme();

  const color = (type?: ButtonAppearance) => {
    switch (type) {
      case 'primary':
        return theme['primary-bg'];
      case 'info':
        return theme['info-text'];
      case 'warning':
        return theme['warning-text'];
      case 'danger':
        return theme['error-text'];
      case 'success':
        return theme['success-text'];
      case 'secondary':
        return theme['text-secondary'];
      default:
        return theme['text-primary'];
    }
  };

  switch (appearance) {
    case 'warning':
      return (
        <MaterialIcons
          size={size ?? TYPOGRAPHY.textStyle.h1.lineHeight * 2}
          name="warning"
          color={color(appearance)}
          style={style}
        />
      );
    case 'success':
      return (
        <MaterialIcons
          size={size ?? TYPOGRAPHY.textStyle.h1.lineHeight * 2}
          name="check-circle"
          color={color(appearance)}
          style={style}
        />
      );
    case 'danger':
      return (
        <MaterialIcons
          size={size ?? TYPOGRAPHY.textStyle.h1.lineHeight * 2}
          name="error"
          color={color(appearance)}
          style={style}
        />
      );
    default:
      return (
        <MaterialIcons
          size={size ?? TYPOGRAPHY.textStyle.h1.lineHeight * 2}
          name="info"
          color={color(appearance)}
          style={style}
        />
      );
  }
};

export default function Confirmation({
  children,
  onCancel,
  onConfirmed,
  confirmText,
  cautionText,
  cancelText,
  cautionTitle,
  appearance,
  mode,
  visible,
  textStyle,
  buttonStyle,
  isLoading,
  disabled,
  confirmationDialogAppearance,
}: {
  children?: string | React.ReactNode;
  onCancel?: () => void;
  onConfirmed?: () => void;
  cautionText?: string;
  confirmText?: string;
  cancelText?: string;
  cautionTitle?: string;
  appearance?: ButtonAppearance;
  mode?: 'button' | 'alert';
  visible?: boolean;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  isLoading?: boolean;
  disabled?: boolean;
  confirmationDialogAppearance?: ButtonAppearance;
}) {
  const theme = useTheme();
  const {width, height} = useWindowDimensions();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (visible !== undefined) {
      setIsOpen(visible);
    }
  }, [visible]);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    if (onCancel) {
      onCancel();
    }
  };

  const handleConfirm = () => {
    setIsOpen(false);
    if (onConfirmed) {
      onConfirmed();
    }
  };

  return (
    <>
      {mode === 'button' && (
        <Button
          appearance={appearance ?? 'basic'}
          onPress={handleOpen}
          style={buttonStyle}
          textStyle={textStyle}
          isLoading={isLoading}
          disabled={disabled}>
          {children || 'Confirm'}
        </Button>
      )}
      <EModal visible={isOpen} onClose={handleClose}>
        <View
          style={{
            backgroundColor: theme['bg-surface'],
            padding: SPACING.md * 2,
            paddingBottom: SPACING.md,
            borderRadius: RADIUS.xl,
            alignSelf: 'center',
            width:
              width < height ? width - SPACING.md * 2 : height - SPACING.md * 2,
            marginBottom:
              Platform.OS === 'ios' ? SPACING.md * 3 : StatusBar.currentHeight,
          }}>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <IconState
              appearance={confirmationDialogAppearance ?? appearance ?? 'basic'}
              style={{marginBottom: SPACING.md}}
            />
          </View>
          <Typography
            category="large"
            style={{fontWeight: '700', textAlign: 'center'}}>
            {cautionTitle || 'Konfirmasi Tindakan'}
          </Typography>
          <Typography category="small" style={{textAlign: 'center'}}>
            {cautionText || 'Apakah Anda yakin ingin melanjutkan tindakan ini?'}
          </Typography>
          <View style={{paddingTop: SPACING.lg, gap: 5}}>
            <Button
              appearance={confirmationDialogAppearance ?? appearance ?? 'basic'}
              onPress={handleConfirm}
              isLoading={isLoading}>
              {confirmText || 'Ya, lanjutkan'}
            </Button>
            <Button
              appearance="transparent"
              onPress={handleClose}
              isLoading={isLoading}>
              {cancelText || 'Tidak, batal'}
            </Button>
          </View>
        </View>
      </EModal>
    </>
  );
}
