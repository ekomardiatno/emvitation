import { View } from 'react-native';
import { useTheme } from '../../components/core/AppProvider';
import Typography from '../../components/core/Typography';
import Button from '../../components/core/Button';
import MaterialIcons from '@react-native-vector-icons/material-icons';

export default function GuestCard({
  name,
  onEdit,
}: {
  name: string;
  onEdit?: () => void;
}) {
  const theme = useTheme();
  return (
    <View
      style={{
        padding: 8,
        paddingLeft: 8 * 2,
        borderRadius: 16,
        backgroundColor: theme['secondary-bg'],
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
      }}>
      <View style={{flex: 1}}>
        <Typography category="h4">{name}</Typography>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Button appearance="transparent">
          <MaterialIcons
            name="share"
            size={18}
            color={theme['secondary-text']}
          />
        </Button>
        <Button appearance="transparent">
          <MaterialIcons
            name="edit"
            size={18}
            onPress={onEdit}
            color={theme['secondary-text']}
          />
        </Button>
      </View>
    </View>
  );
}
