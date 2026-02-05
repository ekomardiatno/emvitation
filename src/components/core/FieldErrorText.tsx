import { SPACING } from '../../constants';
import { useTheme } from './AppProvider';
import Typography from './Typography';

export default function FieldErrorText({
  children,
}: {
  children?: string | React.ReactNode;
}) {
  const theme = useTheme();
  return (
    <Typography category="xsmall" marginTop={SPACING.xxs} fontWeight={400} color={theme['error-text']}>
      {children}
    </Typography>
  );
}
