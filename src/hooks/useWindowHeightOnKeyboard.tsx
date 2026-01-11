import { Keyboard, KeyboardEvent, Dimensions, Animated } from 'react-native';
import { useEffect, useRef, useState } from 'react';

export default function useWindowHeightOnKeyboard() {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [windowHeight, setWindowHeight] = useState(
    Dimensions.get('window').height,
  );
  const [isKeyboardOpened, setIsKeyboardOpened] = useState<boolean>(false);
  const keyboardHeightAnimate = useRef(new Animated.Value(0)).current;
  const windowHeightAnimate = useRef(
    new Animated.Value(Dimensions.get('window').height),
  ).current;

  useEffect(() => {
    if (!isKeyboardOpened) {
      const handleKeyboardShow = (e: KeyboardEvent) => {
        setKeyboardHeight(e.endCoordinates.height);
        setWindowHeight(
          Dimensions.get('window').height - e.endCoordinates.height,
        );
        setIsKeyboardOpened(true);
        Animated.sequence([
          Animated.timing(keyboardHeightAnimate, {
            toValue: e.endCoordinates.height,
            useNativeDriver: false,
            duration: 200,
          }),
          Animated.timing(windowHeightAnimate, {
            toValue: Dimensions.get('window').height - e.endCoordinates.height,
            useNativeDriver: false,
            duration: 200,
          }),
        ]);
      };

      const showSub = Keyboard.addListener(
        'keyboardDidShow',
        handleKeyboardShow,
      );
      return () => {
        showSub.remove();
      };
    }
  }, [isKeyboardOpened, keyboardHeightAnimate, windowHeightAnimate]);

  useEffect(() => {
    if (isKeyboardOpened) {
      const handleKeyboardHide = () => {
        setKeyboardHeight(0);
        setWindowHeight(Dimensions.get('window').height);
        setIsKeyboardOpened(false);
        Animated.sequence([
          Animated.timing(keyboardHeightAnimate, {
            toValue: 0,
            useNativeDriver: false,
            duration: 200,
          }),
          Animated.timing(windowHeightAnimate, {
            toValue: Dimensions.get('window').height,
            useNativeDriver: false,
            duration: 200,
          }),
        ]);
      };
      const hideSub = Keyboard.addListener(
        'keyboardDidHide',
        handleKeyboardHide,
      );

      return () => {
        hideSub.remove();
      };
    }
  }, [isKeyboardOpened, keyboardHeightAnimate, windowHeightAnimate]);

  return {
    keyboardHeight,
    windowHeight,
    keyboardHeightAnimate,
    windowHeightAnimate,
  };
}
