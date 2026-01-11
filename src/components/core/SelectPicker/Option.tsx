import { TouchableHighlight, View } from 'react-native';
import { useTheme } from '../AppProvider';
import Typography from '../Typography';

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
      style={{borderRadius: 15}}
      onPress={() => {
        if (onChange) {
          onChange(value);
        }
      }}>
      <View
        style={{
          paddingHorizontal: 20,
          flexDirection: 'row',
          backgroundColor: selected ? theme['primary-bg'] : theme['bg-surface'],
          borderRadius: 15,
          gap: 20,
        }}>
        {icon && <View style={{paddingVertical: 10}}>{icon}</View>}
        <View
          style={{
            flex: 1,
            borderBottomWidth: isLastIndex ? 0 : 1,
            borderColor: selected
              ? theme['primary-bg']
              : theme['border-default'],
            paddingVertical: 10,
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
