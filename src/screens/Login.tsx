import { View, StyleSheet, Image } from 'react-native';
import ScreenLayout from '../components/core/ScreenLayout';
import Typography from '../components/core/Typography';
import { useTheme } from '../components/core/AppProvider';
import { RADIUS, SHADOWS, SPACING } from '../constants';
import Button from '../components/core/Button';
import { useCallback, useState } from 'react';
import { googleSignIn } from '../services/auth';
import { ApiError } from '../services/common';
import useToast from '../hooks/useToast';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/reducers/auth.reducer';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Icon from '@react-native-vector-icons/material-icons';
import FA5Icon from '@react-native-vector-icons/fontawesome5';

const logoImage = require('../assets/images/logo.webp');

export default function Login() {
  const toast = useToast();
  const theme = useTheme();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const dispatch = useDispatch();

  const fetchGoogleSignIn = useCallback(
    async (idToken: string, signal?: AbortSignal) => {
      try {
        const res = await googleSignIn(idToken, signal);
        if (res.status >= 200 && res.status < 300) {
          dispatch(
            loginSuccess({
              accessToken: res.data.accessToken,
              refreshToken: res.data.refreshToken,
            }),
          );
          setIsLoggingIn(false);
        } else {
          throw new Error('Unable to login');
        }
      } catch (e) {
        if (
          (e instanceof Error && e.message !== 'canceled') ||
          (e as ApiError).status
        ) {
          toast.show(
            'error',
            (e as Error | ApiError).message || 'Unable to login',
          );
        }
        setIsLoggingIn(false);
      }
    },
    [dispatch, toast],
  );

  const onGoogleSignIn = useCallback(async () => {
    try {
      setIsLoggingIn(true);
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();

      if (response.type === 'cancelled') {
        setIsLoggingIn(false);
        return;
      }

      const idToken = response.data?.idToken;
      if (!idToken) {
        toast.show('error', 'Gagal mendapatkan token dari Google');
        setIsLoggingIn(false);
        return;
      }

      fetchGoogleSignIn(idToken);
    } catch (e) {
      toast.show(
        'error',
        (e as Error).message || 'Gagal masuk dengan Google',
      );
      setIsLoggingIn(false);
    }
  }, [fetchGoogleSignIn, toast]);

  return (
    <ScreenLayout headerEnabled={false} contentVerticalAlign="center">
      <View style={styles.container}>
        {/* App logo */}
        <Image source={logoImage} style={styles.logo} resizeMode="contain" />

        {/* Brand */}
        <Typography
          category="h1"
          fontWeight={700}
          marginTop={SPACING.lg}
          style={{textAlign: 'center', letterSpacing: 4}}>
          EMVITE
        </Typography>

        {/* Tagline */}
        <Typography
          category="small"
          marginTop={SPACING.sm}
          style={{textAlign: 'center', letterSpacing: 0.3}}
          color={theme['text-secondary']}>
          Buat undangan pernikahan digital{'\n'}yang elegan dan personal
        </Typography>

        {/* Divider */}
        <View style={styles.dividerRow}>
          <View
            style={[styles.dividerLine, {backgroundColor: theme.divider}]}
          />
          <Icon
            name="spa"
            size={16}
            color={theme['text-disabled']}
            style={{marginHorizontal: SPACING.md}}
          />
          <View
            style={[styles.dividerLine, {backgroundColor: theme.divider}]}
          />
        </View>

        {/* Sign in card */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme['bg-surface'],
              borderColor: theme['border-muted'],
              ...SHADOWS.md,
            },
          ]}>
          <Typography
            category="regular"
            fontWeight={600}
            style={{textAlign: 'center'}}>
            Mulai sekarang
          </Typography>
          <Typography
            category="xsmall"
            marginTop={SPACING.xs}
            style={{textAlign: 'center'}}
            color={theme['text-secondary']}>
            Masuk dengan akun Google untuk melanjutkan
          </Typography>

          <View style={{marginTop: SPACING.xl}}>
            <Button
              onPress={onGoogleSignIn}
              disabled={isLoggingIn}
              isLoading={isLoggingIn}>
              <View style={styles.googleButtonContent}>
                <FA5Icon name="google" size={16} color={theme['primary-text']} iconStyle="brand" />
                <Typography
                  category="small"
                  fontWeight={600}
                  color={theme['primary-text']}>
                  Masuk dengan Google
                </Typography>
              </View>
            </Button>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Typography
          category="xsmall"
          color={theme['text-disabled']}
          style={{textAlign: 'center'}}>
          {require('../../package.json').version}
        </Typography>
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING['2xl'],
    marginBottom: SPACING.xl,
    width: '60%',
  },
  dividerLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
  },
  card: {
    width: '100%',
    borderRadius: RADIUS.lg,
    borderWidth: StyleSheet.hairlineWidth,
    paddingVertical: SPACING.xl,
    paddingHorizontal: SPACING.lg,
  },
  googleButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
  },
  footer: {
    marginTop: SPACING.xl,
    paddingBottom: SPACING.sm,
  },
});
