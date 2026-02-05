import { View, StyleSheet, Image } from 'react-native';
import Typography from './core/Typography';
import Button from './core/Button';
import { SPACING } from '../constants';
import { illustration } from './core/Confirmation';
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
      <Image
        width={120}
        height={120}
        resizeMode="contain"
        resizeMethod="resize"
        style={{width: 120, height: 120, alignSelf: 'center'}}
        source={illustration('warning')}
      />
      <Typography
        color={theme['warning-text']}
        style={{marginTop: -10, marginBottom: SPACING.xxs, textAlign: 'center'}}
        category="h2">
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
          <Button category="xsmall" appearance="warning" onPress={onRetry}>
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
