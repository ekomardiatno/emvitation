import { Image, View } from 'react-native';
import Typography from './core/Typography';
import { RADIUS } from '../constants';
import { useTheme } from './core/AppProvider';

export default function Brand({
  direction = 'row',
}: {
  direction?: 'col' | 'row';
}) {
  const theme = useTheme();
  return (
    <View
      style={{
        justifyContent: 'center',
      }}>
      <View
        style={{
          flexDirection: direction as
            | 'row'
            | 'column'
            | 'row-reverse'
            | 'column-reverse',
          alignItems: 'center',
          gap: 8,
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme['primary-bg'],
            paddingTop: 3,
            borderRadius: RADIUS.full,
            width: 30,
            height: 30,
          }}>
          <Image
            style={{width: '100%', height: '100%'}}
            width={16}
            height={16}
            source={require('../assets/images/logo-white-50px.webp')}
          />
        </View>
        <Typography fontWeight={700} category="h3" color={theme['primary-bg']}>
          EMVITE
        </Typography>
      </View>
    </View>
  );
}
