import { TouchableHighlight, View } from 'react-native';
import { useTheme } from '../AppProvider';
import Typography from '../Typography';
import { RADIUS, SPACING } from '../../../constants';

const Option = ({
  value,
  title,
  onChange,
  icon,
  selected,
  isLastIndex = false,
}: {
  value: string;
  title: string;
  onChange?: ((value: string) => void) | undefined;
  icon?: React.ReactNode;
  selected?: boolean;
  isLastIndex?: boolean;
}) => {
  const theme = useTheme();
  return (
    <TouchableHighlight
      underlayColor={selected ? theme['secondary-bg'] : theme['bg-surface']}
      style={{borderRadius: RADIUS.xl}}
      onPress={() => {
        if (onChange) {
          onChange(value);
        }
      }}>
      <View
        style={{
          paddingHorizontal: SPACING.xl,
          flexDirection: 'row',
          backgroundColor: selected ? theme['primary-bg'] : theme['bg-surface'],
          borderRadius: RADIUS.xl,
          gap: SPACING.xl,
        }}>
        {icon && <View style={{paddingVertical: SPACING.md}}>{icon}</View>}
        <View
          style={{
            flex: 1,
            borderBottomWidth: isLastIndex ? 0 : 1,
            borderColor: selected
              ? theme['primary-bg']
              : theme['border-default'],
            paddingVertical: SPACING.md,
            justifyContent: 'center',
          }}>
          <Typography
            color={selected ? theme['primary-text'] : theme['text-primary']}>
            {title}
          </Typography>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default Option;
