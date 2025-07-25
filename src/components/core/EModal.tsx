import { JSX, useEffect, useRef, useState } from "react"
import {
	Animated,
	Keyboard,
	KeyboardEvent,
	Modal,
	Platform,
	StatusBar,
	TouchableOpacity,
	useWindowDimensions,
	View,
} from "react-native"
import { GUTTER_SPACE } from "../../constants"
import { useTheme } from "./AppProvider"
import { useSafeAreaInsets } from "react-native-safe-area-context"

function KeyboardHeightView(): JSX.Element {

	const keyboardHeight = useRef(new Animated.Value(0)).current
	const [keyboardOpen, setKeyboardOpen] = useState(false)

	useEffect(() => {
		if (!keyboardOpen) {
			const handleKeyboardShow = (e: KeyboardEvent) => {
				setKeyboardOpen(true)
				Animated.timing(keyboardHeight, {
					toValue: e.endCoordinates.height,
					duration: 200,
					useNativeDriver: false
				}).start()
			}
			const showSub = Keyboard.addListener("keyboardDidShow", handleKeyboardShow)
			return () => {
				showSub.remove()
			}
		}
	}, [keyboardOpen])

	useEffect(() => {
		if (keyboardOpen) {
			const handleKeyboardHide = () => {
				setKeyboardOpen(false)
				Animated.timing(keyboardHeight, {
					toValue: 0,
					duration: 200,
					useNativeDriver: false
				}).start()
			}
			const hideSub = Keyboard.addListener("keyboardDidHide", handleKeyboardHide)
			return () => {
				hideSub.remove()
			}
		}
	}, [keyboardOpen])

	return (
		<Animated.View style={{ height: keyboardHeight, overflow: 'hidden' }}></Animated.View>
	)
}

export default function EModal({ children, visible, onClose }: {
	children: JSX.Element
	onClose: () => void
	visible: boolean
}): JSX.Element {
	const { height } = useWindowDimensions()
	const theme = useTheme()
	const [heightContentSize, setHeightContentSize] = useState(0)
	const translateY = useRef(new Animated.Value(heightContentSize ? heightContentSize + (Platform?.OS === 'ios' ? GUTTER_SPACE * 3 + 100 : (StatusBar?.currentHeight || 0)) : height)).current
	const [thisVisible, setThisVisible] = useState(false)
	const insets = useSafeAreaInsets()

	useEffect(() => {
		if (visible) {
			setThisVisible(true)
			Animated.timing(translateY, {
				toValue: 0,
				duration: 200,
				useNativeDriver: true
			}).start()
		} else {
			Animated.timing(translateY, {
				toValue: heightContentSize ? heightContentSize + (Platform?.OS === 'ios' ? GUTTER_SPACE * 3 + 100 : (StatusBar?.currentHeight || 0)) : height,
				duration: 200,
				useNativeDriver: true
			}).start(e => {
				if (e.finished) {
					setThisVisible(false)
				}
			})
		}
	}, [visible])

	const handleCancel = () => {
		if (typeof onClose === 'function') onClose()
	}

	return (
		<Modal
			animationType='fade'
			transparent={true}
			visible={thisVisible}
			onRequestClose={handleCancel}
			statusBarTranslucent={true}
		>
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', backgroundColor: theme.backgroundModalBackdropColor, paddingBottom: insets.bottom, paddingTop: insets.top }}>
				<TouchableOpacity
					activeOpacity={1} onPress={handleCancel} style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }} />
				<Animated.View onLayout={e => {
					e.target.measure((_x, _y, _width, height, _pageX, _pageY) => {
						if (height) {
							setHeightContentSize(height)
						}
					})
				}} style={[{ width: '100%', transform: [{ translateY }], alignItems: 'center' }]}>
					{children}
				</Animated.View>
				<KeyboardHeightView />
			</View>
		</Modal>
	)
}