import { useEffect, useState } from 'react';
import {
  Keyboard,
  KeyboardEvent,
  Modal,
  Platform,
  StatusBar,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { SPACING } from '../../constants';
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
}: {
  children: React.ReactNode;
  onClose: () => void;
  visible: boolean;
}) {
  const {height} = useWindowDimensions();
  const theme = useTheme();
  const [heightContentSize, setHeightContentSize] = useState(0);
  const translateY = useSharedValue(
    heightContentSize
      ? heightContentSize +
          (Platform?.OS === 'ios'
            ? SPACING.md * 3 + 100
            : StatusBar?.currentHeight || 0)
      : height,
  );
  const [thisVisible, setThisVisible] = useState(false);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (visible) {
      setThisVisible(true);
      translateY.value = withTiming(0);
    } else {
      translateY.value = withTiming(
        heightContentSize
          ? heightContentSize +
              (Platform?.OS === 'ios'
                ? SPACING.md * 3 + 100
                : StatusBar?.currentHeight || 0)
          : height,
        {
          duration: 300,
        },
      );
      setTimeout(() => {
        setThisVisible(false);
      }, 300);
    }
  }, [height, heightContentSize, translateY, visible]);

  const handleCancel = () => {
    if (typeof onClose === 'function') onClose();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={thisVisible}
      onRequestClose={handleCancel}
      statusBarTranslucent={true}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-end',
          backgroundColor: theme.overlay,
          paddingBottom: insets.bottom,
          paddingTop: insets.top,
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={handleCancel}
          style={{position: 'absolute', top: 0, left: 0, bottom: 0, right: 0}}
        />
        <Animated.View
          onLayout={e => {
            e.target.measure((_x, _y, _width, height, _pageX, _pageY) => {
              if (height) {
                setHeightContentSize(height);
              }
            });
          }}
          style={[
            {width: '100%', transform: [{translateY}], alignItems: 'center'},
          ]}>
          {children}
        </Animated.View>
        <KeyboardHeightView />
      </View>
    </Modal>
  );
}
