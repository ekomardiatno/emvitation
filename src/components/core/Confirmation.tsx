import {
  View,
  StatusBar,
  Platform,
  useWindowDimensions,
  ViewStyle,
  TextStyle,
  StyleProp,
  Image,
} from 'react-native';
import { useTheme } from './AppProvider';
import { RADIUS, SPACING } from '../../constants';
import Typography from './Typography';
import Button, { ButtonAppearance } from './Button';
import { useEffect, useState } from 'react';
import EModal from './EModal';

export const illustration = (appearance?: ButtonAppearance) => {
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
          appearance={appearance}
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
          <Image
            width={180}
            height={180}
            resizeMode="contain"
            resizeMethod="resize"
            style={{width: 180, height: 180, alignSelf: 'center'}}
            source={illustration(appearance)}
          />
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
              appearance={appearance}
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
