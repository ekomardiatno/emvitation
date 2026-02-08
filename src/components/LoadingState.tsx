import { ActivityIndicator, View } from 'react-native';
import { TYPOGRAPHY } from '../constants';
import { useTheme } from './core/AppProvider';

export default function LoadingState({
  size,
}: {
  size?: number | 'small' | 'large';
}) {
  const theme = useTheme();
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ActivityIndicator
        size={size ?? TYPOGRAPHY.textStyle.h1.lineHeight}
        color={theme['primary-bg']}
      />
    </View>
  );
}
