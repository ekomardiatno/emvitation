import { View } from 'react-native';
import { RADIUS, SHADOWS, SPACING } from '../../constants';
import { useTheme } from './AppProvider';
import Typography from './Typography';

export default function Card({
  title,
  rightControl,
  children,
}: {
  title?: string | React.ReactNode;
  rightControl?: React.ReactNode;
  children: React.ReactNode;
}) {
  const theme = useTheme();
  return (
    <View
      style={{
        borderRadius: RADIUS.md,
        borderWidth: 1,
        borderColor: theme['border-default'],
        backgroundColor: theme['bg-surface'],
        position: 'relative',
        overflow: 'hidden',
        ...SHADOWS.sm,
      }}>
      {(title || rightControl) && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 8,
            padding: SPACING.lg,
          }}>
          <View style={{flexGrow: 1}}>
            {typeof title === 'string' ? (
              <Typography style={{fontWeight: 'bold'}}>{title}</Typography>
            ) : (
              title
            )}
          </View>

          <View>{rightControl}</View>
        </View>
      )}
      <View
        style={{
          paddingHorizontal: SPACING.lg,
          paddingBottom: SPACING.lg,
          paddingTop: !(title || rightControl) ? SPACING.lg : undefined,
        }}>
        {children}
      </View>
    </View>
  );
}
