import Typography from './Typography';
import { useTheme } from './AppProvider';
import { SPACING } from '../../constants';
import { StyleProp, TextStyle } from 'react-native';

export default function FieldLabel({
  required,
  label,
  style,
}: {
  required?: boolean;
  label: string;
  style?: StyleProp<TextStyle>;
}) {
  const theme = useTheme();
  return (
    <Typography
      category="small"
      fontWeight={500}
      style={[{marginBottom: SPACING.xs}, style]}
      numberOfLines={1}>
      {label}
      {required && (
        <Typography
          category="small"
          fontWeight={700}
          color={theme['error-text']}>
          {' '}
          *
        </Typography>
      )}
    </Typography>
  );
}
