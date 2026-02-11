import { useEffect, useState } from 'react';
import { Keyboard, KeyboardEvent, StyleProp, ViewStyle } from 'react-native';
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated';

export default function KeyboardHeightView({
  style,
}: {
  style?: StyleProp<ViewStyle>;
}) {
  const keyboardHeight = useSharedValue(0);
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  useEffect(() => {
    if (!keyboardOpen) {
      const handleKeyboardShow = (e: KeyboardEvent) => {
        setKeyboardOpen(true);
        keyboardHeight.value = withTiming(e.endCoordinates.height);
      };
      const showSub = Keyboard.addListener(
        'keyboardDidShow',
        handleKeyboardShow,
      );
      return () => {
        showSub.remove();
      };
    }
  }, [keyboardHeight, keyboardOpen]);

  useEffect(() => {
    if (keyboardOpen) {
      const handleKeyboardHide = () => {
        setKeyboardOpen(false);
        keyboardHeight.value = withTiming(0);
      };
      const hideSub = Keyboard.addListener(
        'keyboardDidHide',
        handleKeyboardHide,
      );
      return () => {
        hideSub.remove();
      };
    }
  }, [keyboardHeight, keyboardOpen]);

  return (
    <Animated.View
      style={[{height: keyboardHeight, overflow: 'hidden'}, style]}
    />
  );
}
