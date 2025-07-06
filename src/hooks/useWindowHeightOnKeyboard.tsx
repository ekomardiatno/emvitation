import { Keyboard, KeyboardEvent, Dimensions } from 'react-native'
import { useEffect, useState } from 'react'

export default function useWindowHeightOnKeyboard() {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [windowHeight, setWindowHeight] = useState(Dimensions.get('window').height);

  useEffect(() => {
    const handleKeyboardShow = (e: KeyboardEvent) => {
      setKeyboardHeight(e.endCoordinates.height);
      setWindowHeight(Dimensions.get('window').height - e.endCoordinates.height);
    };

    const handleKeyboardHide = () => {
      setKeyboardHeight(0);
      setWindowHeight(Dimensions.get('window').height);
    };

    const showSub = Keyboard.addListener('keyboardDidShow', handleKeyboardShow);
    const hideSub = Keyboard.addListener('keyboardDidHide', handleKeyboardHide);

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  return { keyboardHeight, windowHeight };
}