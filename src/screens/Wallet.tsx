import { useEffect } from 'react';
import Typography from '../components/core/Typography';
import { RADIUS, SPACING } from '../constants';
import Button from '../components/core/Button';
import { Appearance, ScrollView, StatusBar, View } from 'react-native';
import { useTheme } from '../components/core/AppProvider';
import Icon from '@react-native-vector-icons/material-icons';

export default function Wallet() {
  const theme = useTheme();
  useEffect(() => {
    StatusBar.setTranslucent(true);
    let timeout: any = null;
    Appearance.addChangeListener(() => {
      timeout = setTimeout(() => {
        StatusBar.setTranslucent(true);
      }, 800);
    });
    return () => {
      if (timeout) clearTimeout(timeout);
      StatusBar.setTranslucent(false);
    };
  }, []);
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          margin: SPACING.md,
          marginVertical: SPACING.md,
          marginBottom: SPACING.md * 2,
        }}>
        <View
          style={{
            backgroundColor: theme['primary-bg'],
            borderRadius: RADIUS.lg,
            padding: 20,
            paddingVertical: 30,
          }}>
          <Typography color={theme['primary-text']} style={{marginBottom: 5}}>
            Saldo
          </Typography>
          <Typography color={theme['primary-text']} category="h1">
            3,000,000
          </Typography>
        </View>
        <View style={{flexDirection: 'row', gap: 8, marginTop: SPACING.md}}>
          <Button
            style={{
              paddingVertical: 10,
              paddingHorizontal: 10,
              flexGrow: 1,
              justifyContent: 'center',
              borderRadius: 8,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
              backgroundColor: theme['bg-surface'],
              borderColor: theme['border-default'],
            }}>
            <>
              <Icon
                name="arrow-circle-down"
                color={theme['text-primary']}
                size={20}
              />
              <Typography color={theme['text-primary']}>Tarik Saldo</Typography>
            </>
          </Button>
          <Button
            style={{
              paddingVertical: 10,
              paddingHorizontal: 10,
              flexGrow: 1,
              borderRadius: 8,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 8,
              backgroundColor: theme['bg-surface'],
              borderColor: theme['border-default'],
            }}>
            <>
              <Icon
                name="arrow-circle-up"
                color={theme['text-primary']}
                size={20}
              />
              <Typography color={theme['text-primary']}>
                Tambah Saldo
              </Typography>
            </>
          </Button>
        </View>
      </View>

      <Typography
        style={{
          paddingHorizontal: SPACING.md,
          marginBottom: SPACING.md,
        }}
        category="regular">
        RIWAYAT TRANSAKSI
      </Typography>
      <ScrollView
        style={{
          marginHorizontal: SPACING.md,
          marginBottom: SPACING.md,
          overflow: 'hidden',
        }}>
        <View
          style={{
            flexDirection: 'column',
            gap: 5,
          }}>
          <View
            style={{
              paddingVertical: 15,
              backgroundColor: theme['bg-surface'],
              borderColor: theme['border-default'],
              borderWidth: 1,
              paddingHorizontal: 15,
              borderRadius: 8,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 5,
              }}>
              <View style={{gap: 3}}>
                <Typography>Guest Quota</Typography>
                <Typography category="small" color={theme['text-secondary']}>
                  10 May 2023 05:11 PM
                </Typography>
              </View>
              <Typography category="h4">Rp100,000</Typography>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
