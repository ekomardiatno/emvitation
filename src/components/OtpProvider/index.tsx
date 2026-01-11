import { useEffect, useRef, useState } from 'react';
import OtpContext from '../../contexts/OtpContext';
import { Alert, TextInput, useWindowDimensions, View } from 'react-native';
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated';
import { useTheme } from '../core/AppProvider';
import ScreenLayout from '../core/ScreenLayout';
import Typography from '../core/Typography';
import Confirmation from '../core/Confirmation';
import { RADIUS, SPACING } from '../../constants';
import Button from '../core/Button';
import phoneNumberDisplayFormat from '../../utils/phoneNumberDisplayFormat';

export default function OtpProvider({children}: {children: React.ReactNode}) {
  const [isOtpWindowOpened, setIsOtpWindowOpened] = useState(false);
  const window = useWindowDimensions();
  const translatYOtpWindow = useSharedValue(window.height);
  const [isRequestingOtp, setIsRequestingOtp] = useState(false);
  const [requestOtpError, setRequestOtpError] = useState<Error | null>(null);
  const theme = useTheme();
  const [isCanceling, setIsCanceling] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState('');
  const onVerifiedAction = useRef<() => void>(() => {});
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  useEffect(() => {
    if (isOtpWindowOpened) {
      translatYOtpWindow.value = withTiming(0);
    } else {
      translatYOtpWindow.value = withTiming(window.height);
    }
  }, [isOtpWindowOpened, translatYOtpWindow, window.height]);

  const openWindowOtp = () => {
    setIsOtpWindowOpened(true);
  };

  const requestOtp = (onVerifiedCallback: () => void, phone: string) => {
    onVerifiedAction.current = onVerifiedCallback;
    setPhoneNumber(phone);
    setIsRequestingOtp(true);
    if (!phone) {
      cancel();
      return;
    }
    setTimeout(() => {
      setIsRequestingOtp(false);
      openWindowOtp();
    }, 1000);
  };

  const cancel = () => {
    setIsCanceling(false);
    setRequestOtpError(null);
    setIsRequestingOtp(false);
    setIsOtpWindowOpened(false);
  };

  const onVerify = () => {
    onVerifiedAction.current();
    cancel();
  };

  const onBackPress = () => {
    setIsCanceling(true);
  };

  return (
    <OtpContext.Provider
      value={{
        requestOtp,
        cancel,
        isRequestingOtp,
        requestOtpError,
      }}>
      <View style={{flex: 1, position: 'relative'}}>
        {children}

        <Animated.View
          style={{
            top: 0,
            left: 0,
            position: 'absolute',
            width: window.width,
            height: window.height,
            transform: [{translateY: translatYOtpWindow}],
          }}>
          <ScreenLayout
            onBackPress={isOtpWindowOpened ? onBackPress : undefined}>
            <View
              style={{
                flexGrow: 1,
                paddingTop: SPACING.xl,
                justifyContent: 'center',
              }}>
              <Typography category="h2">Verifikasi nomor</Typography>
              <Typography category="small" style={{marginTop: SPACING.md}}>
                Masukkan 6 digit kode yang sudah dikirim ke Whatsapp dengan
                nomor{' '}
                <Typography category="small" fontWeight={600}>
                  {phoneNumberDisplayFormat(phoneNumber)}
                </Typography>{' '}
                untuk verifikasi nomor
              </Typography>
              <View style={{position: 'relative', marginTop: SPACING.xl}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    gap: SPACING.sm,
                  }}>
                  {[0, 1, 2, 3, 4, 5].map(i => {
                    return (
                      <View
                        key={i}
                        style={{
                          width: 50,
                          height: 50,
                          borderWidth: 1,
                          borderColor: theme['border-default'],
                          borderRadius: RADIUS.md,
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: theme['bg-surface'],
                        }}>
                        <Typography category="h2" style={{textAlign: 'center'}}>
                          {enteredOtp[i]}
                        </Typography>
                      </View>
                    );
                  })}
                </View>
                <TextInput
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    opacity: 0,
                  }}
                  selection={{
                    start: enteredOtp.length,
                    end: enteredOtp.length,
                  }}
                  numberOfLines={1}
                  disableKeyboardShortcuts
                  disableFullscreenUI
                  keyboardType="number-pad"
                  autoComplete="one-time-code"
                  autoCapitalize="none"
                  autoCorrect={false}
                  contextMenuHidden={true}
                  pointerEvents="none"
                  value={enteredOtp}
                  onChangeText={text => {
                    if (text.length < 7) {
                      setEnteredOtp(text.replace(/[^0-9]/g, ''));
                    }
                  }}
                  maxLength={6}
                  textContentType="oneTimeCode"
                  caretHidden
                  selectTextOnFocus={false}
                />
              </View>
              <View style={{marginTop: SPACING.md}}>
                <Typography category="small">
                  Tidak menerima kode?{' '}
                  <Typography
                    onPress={() => {
                      Alert.alert('title', 'message');
                    }}
                    category="small"
                    color={theme['link-default']}
                    fontWeight={600}>
                    Kirim ulang
                  </Typography>
                </Typography>
              </View>
            </View>
            <View style={{marginTop: SPACING.xl}}>
              <Button
                disabled={!enteredOtp || enteredOtp.length < 6}
                onPress={onVerify}>
                Verifikasi
              </Button>
            </View>

            <Confirmation
              visible={isCanceling}
              onConfirmed={cancel}
              onCancel={() => setIsCanceling(false)}
              appearance="warning"
              cautionTitle="Batalkan verifikasi?"
              cautionText="Nomor kamu tidak akan terverifikasi jika proses ini dibatalkan."
              confirmText="Ya, batalkan"
              cancelText="Lanjutkan verifikasi"
            />
          </ScreenLayout>
        </Animated.View>
      </View>
    </OtpContext.Provider>
  );
}
