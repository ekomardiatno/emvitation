import { useEffect, useState } from 'react';
import {
  ColorValue, Keyboard,
  KeyboardEvent,
  Modal,
  TouchableOpacity,
  useWindowDimensions,
  View
} from 'react-native';
import { useTheme } from './AppProvider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated';

function KeyboardHeightView() {
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

  return <Animated.View style={{height: keyboardHeight, overflow: 'hidden'}} />;
}

export default function EModal({
  children,
  visible,
  onClose,
  backdropColor,
  contentAlign,
}: {
  children: React.ReactNode;
  onClose: () => void;
  visible: boolean;
  backdropColor?: ColorValue;
  contentAlign?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
}) {
  const {height} = useWindowDimensions();
  const theme = useTheme();
  const translateY = useSharedValue(height);
  const [thisVisible, setThisVisible] = useState(false);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (visible) {
      setThisVisible(true);
    } else {
      translateY.value = withTiming(height, {
        duration: 300,
      });
      setTimeout(() => {
        setThisVisible(false);
      }, 300);
    }
  }, [height, translateY, visible]);

  const handleCancel = () => {
    if (typeof onClose === 'function') onClose();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={thisVisible}
      onRequestClose={handleCancel}
      statusBarTranslucent={true}
      onShow={() => {
        translateY.value = withTiming(0, {
          duration: 300,
        });
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: contentAlign || 'flex-end',
          backgroundColor: backdropColor || theme.overlay,
          paddingBottom: insets.bottom,
          paddingTop: insets.top,
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={handleCancel}
          style={{position: 'absolute', top: 0, left: 0, bottom: 0, right: 0}}
        />
        <Animated.View
          style={[
            {width: '100%', transform: [{translateY}]},
          ]}>
          {children}
        </Animated.View>
        <KeyboardHeightView />
      </View>
    </Modal>
  );
}
