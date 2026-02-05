import { useCallback, useEffect, useRef, useState } from 'react';
import OtpContext from '../../contexts/OtpContext';
import { TextInput, useWindowDimensions, View } from 'react-native';
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated';
import { useTheme } from '../core/AppProvider';
import ScreenLayout from '../core/ScreenLayout';
import Typography from '../core/Typography';
import Confirmation from '../core/Confirmation';
import { RADIUS, SPACING } from '../../constants';
import Button from '../core/Button';
import phoneNumberDisplayFormat from '../../utils/phoneNumberDisplayFormat';
import { getOtp } from '../../services/auth';
import { ApiError } from '../../services/common';
import calculateTimeLeft, {
  displayCountdownText,
} from '../../utils/calculateTimeLeft';
import useToast from '../../hooks/useToast';

export default function OtpProvider({children}: {children: React.ReactNode}) {
  const inputRef = useRef<TextInput>(null);
  const [isOtpWindowOpened, setIsOtpWindowOpened] = useState(false);
  const window = useWindowDimensions();
  const translatYOtpWindow = useSharedValue(window.height);
  const [isRequestingOtp, setIsRequestingOtp] = useState(false);
  const [requestOtpError, setRequestOtpError] = useState<Error | null>(null);
  const theme = useTheme();
  const [isCanceling, setIsCanceling] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState('');
  const onVerifiedAction = useRef<(otp?: string) => void>(() => {});
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [requestedOtp, setRequestedOtp] = useState<{
    validUntil: number;
    otp: string;
  } | null>(null);
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [nextRequestOtpIn, setNextRequestOtpIn] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

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

  const toast = useToast();

  const onVerify = () => {
    if ((requestedOtp?.validUntil || 0) - currentTime < 1) {
      toast.show('error', 'OTP kedaluwarsa, silakan kirim ulang OTP');
      return;
    }
    if (requestedOtp?.otp === enteredOtp) {
      onVerifiedAction.current(requestedOtp.otp);
      inputRef.current?.blur();
      cancel();
    } else {
      toast.show('error', 'OTP tidak valid');
    }
  };

  const onBackPress = () => {
    setIsCanceling(true);
  };

  const fetchToken = useCallback(
    async (signal?: AbortSignal) => {
      setEnteredOtp('');
      setRequestOtpError(null);
      try {
        const res = await getOtp(phoneNumber, signal);
        if (res.status >= 200 && res.status < 300) {
          setRequestedOtp(res.data);
          setIsRequestingOtp(false);
          setNextRequestOtpIn(Date.now() + 30 * 1000);
          inputRef.current?.focus();
        } else {
          throw new Error('Unable to send OTP');
        }
      } catch (e) {
        if (
          (e instanceof Error && e.message !== 'canceled') ||
          (e as ApiError).status
        ) {
          setRequestOtpError(new Error((e as Error | ApiError).message));
        }
        setIsRequestingOtp(false);
      }
    },
    [phoneNumber],
  );

  useEffect(() => {
    const controller = new AbortController();
    if (isRequestingOtp) {
      const signal = controller.signal;
      fetchToken(signal);
    } else {
      controller.abort();
    }
  }, [isRequestingOtp, fetchToken]);

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
                untuk verifikasi nomor.
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
                  ref={inputRef}
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
                  autoFocus={true}
                  maxLength={6}
                  textContentType="oneTimeCode"
                  caretHidden
                  selectTextOnFocus={false}
                />
              </View>
              <View style={{marginTop: SPACING.md}}>
                <Typography category="small">
                  Tidak menerima kode?{' '}
                  {(nextRequestOtpIn || 0) - currentTime < 1 ? (
                    <Typography
                      onPress={() => {
                        setIsRequestingOtp(true);
                      }}
                      category="small"
                      color={theme['link-default']}
                      fontWeight={600}>
                      Kirim ulang
                    </Typography>
                  ) : (
                    <Typography
                      category="small"
                      color={theme['secondary-text']}
                      fontWeight={600}>
                      Kirim ulang dalam{' '}
                      {nextRequestOtpIn &&
                        displayCountdownText(
                          calculateTimeLeft(
                            new Date(nextRequestOtpIn),
                            new Date(currentTime),
                          ),
                        )}
                    </Typography>
                  )}
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
