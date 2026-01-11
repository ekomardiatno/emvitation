import Typography from './Typography';
import { useTheme } from './AppProvider';
import { SPACING } from '../../constants';
export default function FieldLabel({
  required,
  label,
}: {
  required?: boolean;
  label: string;
}) {
  const theme = useTheme();
  return (
    <Typography
      category="small"
      fontWeight={500}
      style={{marginBottom: SPACING.xs}}
      numberOfLines={1}>
      {label}
      {required && (
        <Typography category="small" fontWeight={700} color={theme['error-text']}>
          {' '}
          *
        </Typography>
      )}
    </Typography>
  );
}
