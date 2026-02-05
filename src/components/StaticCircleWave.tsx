import {
  AnimatableNumericValue,
  ColorValue,
  DimensionValue,
  View,
} from 'react-native';
import { useTheme } from './core/AppProvider';

export default function StaticCircleWave({
  size,
  top,
  left,
  right,
  bottom,
  color,
  opacity,
}: {
  size?: DimensionValue;
  top?: DimensionValue;
  left?: DimensionValue;
  right?: DimensionValue;
  bottom?: DimensionValue;
  color?: ColorValue;
  opacity?: AnimatableNumericValue;
}) {
  const theme = useTheme();
  const sizeProp = typeof size === 'number' ? size : 300;
  return (
    <View
      style={{
        width: sizeProp,
        height: sizeProp,
        borderRadius: sizeProp,
        backgroundColor: color || theme['text-primary'],
        opacity: opacity ?? 0.15,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        top,
        left,
        right,
        bottom,
      }}>
      <View
        style={{
          width: sizeProp - (100 / 300) * sizeProp,
          height: sizeProp - (100 / 300) * sizeProp,
          borderRadius: sizeProp - (100 / 300) * sizeProp,
          backgroundColor: color || theme['text-primary'],
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            width: sizeProp - (100 / 300) * sizeProp - (100 / 300) * sizeProp,
            height: sizeProp - (100 / 300) * sizeProp - (100 / 300) * sizeProp,
            borderRadius:
              sizeProp - (100 / 300) * sizeProp - (100 / 300) * sizeProp,
            backgroundColor: color || theme['text-primary'],
          }}
        />
      </View>
    </View>
  );
}
