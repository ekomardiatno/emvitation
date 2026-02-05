import { View } from 'react-native';
import { SPACING } from '../../constants';
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
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme['border-default'],
        backgroundColor: theme['bg-surface'],
        position: 'relative',
        overflow: 'hidden',
      }}>
      {(title || rightControl) && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 8,
            padding: SPACING.md,
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
          paddingHorizontal: SPACING.md,
          paddingBottom: SPACING.md,
          paddingTop: !(title || rightControl) ? SPACING.md : undefined,
        }}>
        {children}
      </View>
    </View>
  );
}
