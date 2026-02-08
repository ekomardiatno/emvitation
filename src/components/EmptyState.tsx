import { View, StyleSheet } from 'react-native';
import Typography from './core/Typography';
import Button from './core/Button';
import { SPACING } from '../constants';
import { IconState } from './core/Confirmation';
import { useTheme } from './core/AppProvider';

type Props = {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
};

export function EmptyState({
  message = 'Your list is empty. Start creating new item',
  title = 'Not Items Found',
  onRetry,
  retryLabel,
}: Props) {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <IconState appearance="info" style={{marginBottom: SPACING.sm}} />
      <Typography
        color={theme['info-text']}
        style={{marginBottom: SPACING.xxs, textAlign: 'center'}}
        category="h3">
        {title}
      </Typography>
      <Typography
        category="small"
        style={{textAlign: 'center'}}
        fontWeight={300}>
        {message}
      </Typography>

      {onRetry && (
        <View style={{marginTop: SPACING.lg}}>
          <Button category="xsmall" appearance="info" onPress={onRetry}>
            {retryLabel}
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
    padding: 16,
  },
  text: {
    color: '#D32F2F',
    marginBottom: 12,
    textAlign: 'center',
  },
});
