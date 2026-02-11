import { Keyboard, KeyboardEvent, Dimensions } from 'react-native';
import { useEffect, useState } from 'react';
import { useSharedValue, withTiming } from 'react-native-reanimated';

export default function useWindowHeightOnKeyboard() {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [windowHeight, setWindowHeight] = useState(
    Dimensions.get('window').height,
  );
  const [isKeyboardOpened, setIsKeyboardOpened] = useState<boolean>(false);

  const keyboardHeightAnimate = useSharedValue(0);
  const windowHeightAnimate = useSharedValue(Dimensions.get('window').height);

  useEffect(() => {
    const handleKeyboardShow = (e: KeyboardEvent) => {
      const keyboardH = e.endCoordinates.height;
      const newWindowHeight = Dimensions.get('window').height - keyboardH;

      setKeyboardHeight(keyboardH);
      setWindowHeight(newWindowHeight);
      setIsKeyboardOpened(true);

      keyboardHeightAnimate.value = withTiming(keyboardH, {
        duration: 200,
      });

      windowHeightAnimate.value = withTiming(newWindowHeight, {
        duration: 200,
      });
    };

    const handleKeyboardHide = () => {
      const fullHeight = Dimensions.get('window').height;

      setKeyboardHeight(0);
      setWindowHeight(fullHeight);
      setIsKeyboardOpened(false);

      keyboardHeightAnimate.value = withTiming(0, {
        duration: 200,
      });

      windowHeightAnimate.value = withTiming(fullHeight, {
        duration: 200,
      });
    };

    const showSub = Keyboard.addListener('keyboardDidShow', handleKeyboardShow);
    const hideSub = Keyboard.addListener('keyboardDidHide', handleKeyboardHide);

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, [keyboardHeightAnimate, windowHeightAnimate]);

  return {
    keyboardHeight,
    windowHeight,
    keyboardHeightAnimate,
    windowHeightAnimate,
    isKeyboardOpened,
  };
}
