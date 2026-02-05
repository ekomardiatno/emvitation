import { View, StyleSheet, Image } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { useTheme } from '../components/core/AppProvider';

type Props = {
  onFinish: () => void;
};

export default function AnimatedSplash({onFinish}: Props) {
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);
  const theme = useTheme();

  useEffect(() => {
    const timeout = setTimeout(() => {
      opacity.value = withTiming(0, {duration: 500});
      scale.value = withTiming(1.1, {duration: 500}, () => {
        runOnJS(onFinish)();
      });
    }, 600); // show logo briefly

    return () => clearTimeout(timeout);
  }, [onFinish, opacity, scale]);

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{scale: scale.value}],
  }));

  return (
    <View
      style={{
        ...StyleSheet.absoluteFillObject,
        backgroundColor: theme['bg-app'],
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Animated.View style={style}>
        <Image
          source={require('../assets/images/logo.webp')}
          style={{
            width: 120,
            height: 120,
            resizeMode: 'contain',
          }}
        />
      </Animated.View>
    </View>
  );
}
