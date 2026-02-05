import { DimensionValue, View } from 'react-native';
import Typography from './core/Typography';
import { useTheme } from './core/AppProvider';
import { MaterialIconsType } from '../types/material-icons';
import Icon from '@react-native-vector-icons/material-icons';
import { TYPOGRAPHY } from '../constants';

export default function Divider({
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  marginVertical,
  marginHorizontal,
  text,
  icon,
}: {
  marginTop?: DimensionValue;
  marginBottom?: DimensionValue;
  marginLeft?: DimensionValue;
  marginRight?: DimensionValue;
  marginVertical?: DimensionValue;
  marginHorizontal?: DimensionValue;
  text?: string;
  icon?: MaterialIconsType;
}) {
  const theme = useTheme();
  return (
    <View
      style={{
        position: 'relative',
        alignItems: 'center',
        marginTop: marginTop !== undefined ? marginTop : marginVertical,
        marginBottom:
          marginBottom !== undefined ? marginBottom : marginVertical,
      }}>
      <View
        style={{
          borderTopColor: theme.divider,
          borderTopWidth: 1,
          position: 'absolute',
          top: '50%',
          left: marginLeft !== undefined ? marginLeft : marginHorizontal || 0,
          right:
            marginRight !== undefined ? marginRight : marginHorizontal || 0,
        }}
      />
      {text && (
        <Typography
          style={{paddingHorizontal: 8, backgroundColor: theme['bg-app']}}
          color={theme['text-secondary']}
          category="small">
          {text}
        </Typography>
      )}
      {icon && (
        <View style={{backgroundColor: theme['bg-app'], paddingHorizontal: 10}}>
          <Icon size={TYPOGRAPHY.textStyle.small.fontSize} name={icon} color={theme.divider} />
        </View>
      )}
    </View>
  );
}
