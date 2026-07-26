import { View, StyleSheet } from 'react-native';
import Typography from './core/Typography';
import Button from './core/Button';
import { RADIUS, SPACING } from '../constants';
import { useTheme } from './core/AppProvider';
import Icon from '@react-native-vector-icons/material-icons';

type Props = {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
};

export function ErrorState({
  message = 'Something went wrong',
  title = 'Oops!',
  onRetry,
  retryLabel,
}: Props) {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.iconCircle,
          {backgroundColor: theme['error-bg']},
        ]}>
        <View
          style={[
            styles.iconCircleInner,
            {backgroundColor: theme['error-text'] + '1A'},
          ]}>
          <Icon name="wifi-off" size={32} color={theme['error-text']} />
        </View>
      </View>
      <Typography
        fontWeight={600}
        style={{textAlign: 'center'}}
        category="large"
        marginTop={SPACING.lg}>
        {title}
      </Typography>
      <Typography
        category="small"
        marginTop={SPACING.xs}
        style={{textAlign: 'center', maxWidth: 260}}
        color={theme['text-secondary']}>
        {message}
      </Typography>

      {onRetry && (
        <View style={{marginTop: SPACING.xl}}>
          <Button category="xsmall" appearance="secondary" onPress={onRetry}>
            {retryLabel || 'Muat Ulang'}
          </Button>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING['2xl'],
  },
  iconCircle: {
    width: 88,
    height: 88,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircleInner: {
    width: 64,
    height: 64,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
