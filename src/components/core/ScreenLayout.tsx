import { JSX, useEffect, useRef, useState } from "react"
import {
  Animated,
  Dimensions,
  Keyboard,
  NativeScrollEvent,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native"
import { useTheme } from "./AppProvider"
import { GUTTER_SPACE } from "../../constants"
import Typography from "./Typography"
import { useNavigation } from "@react-navigation/native"
import Icon from "@react-native-vector-icons/material-icons"
import { SafeAreaView, useSafeAreaFrame, useSafeAreaInsets } from "react-native-safe-area-context"

const { height } = Dimensions.get('window')

export const HEADER_HEIGHT = 70 // Default header height

export default function ScreenLayout({ children, headerEnabled = true, title, longerTitle, scrollEnabled = true, rightControl = null, onBackPress }: {
  children: JSX.Element | ((innerContainerHeight: number) => JSX.Element)
  headerEnabled?: boolean
  title?: string
  longerTitle?: string
  scrollEnabled?: boolean
  rightControl?: JSX.Element | null
  onBackPress?: (fnc: () => void) => void
}): JSX.Element | null {
  const navigation = useNavigation()
  const safeArea = useSafeAreaFrame()
  const insets = useSafeAreaInsets()

  const goBack = () => {
    if (navigation.canGoBack())
      navigation.goBack()
  }
  const theme = useTheme()
  const headerHeight = headerEnabled ? HEADER_HEIGHT : 0
  const innerContainerHeight = (safeArea.height - insets.top - insets.bottom) - headerHeight
  const outerScrollRef = useRef<ScrollView>(null)
  const outerScrollY = useRef(new Animated.Value(0)).current
  const innerScrollRef = useRef<ScrollView>(null)
  const bigTitleContainerHeight = safeArea.width * .89
  const innerScrollY = useRef(new Animated.Value(0)).current
  const [innerScrollbarHeight, setInnerScrollbarHeight] = useState(50)
  const scrollBarOpacity = useRef(new Animated.Value(0)).current
  let timeoutScrollBarOpacity = useRef<any>(null).current
  let scrollableHeight = useRef(1)
  let innerScrollbarMovableRange = useRef(innerContainerHeight - innerScrollbarHeight - 20)
  let innerStartY = useRef(0).current
  let outerStartY = useRef(bigTitleContainerHeight - headerHeight).current
  let [innerScrollEnabled, setInnerScrollEnabled] = useState(true)

  // if outer start scroll y = 0 or outer start scroll y != 0 but outer scroll y less than outer start scroll y
  useEffect(() => {
    const listener = outerScrollY.addListener(e => {
      if (innerStartY === 0 && (Math.round(outerStartY) === 0 || Math.round(outerStartY) !== 0 && Math.round(e.value) < Math.round(outerStartY))) {
        setInnerScrollEnabled(false)
      } else {
        setInnerScrollEnabled(true)
      }
    })
    return () => outerScrollY.removeListener(listener)
  }, [])

  const lastScrollY = useRef(0) // Stores the last scroll position
  // Map scroll position to scrollbar movement
  const scrollIndicator = innerScrollY.interpolate({
    inputRange: [0, scrollableHeight.current], // Avoid negative input range
    outputRange: [0, innerScrollbarMovableRange.current], // Adjust scrollbar movement
    extrapolate: "clamp",
  })

  const [keyboardShown, setKeyboardShown] = useState<boolean>(false)
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0)

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardShown(true)
      if (!keyboardHeight) {
        setKeyboardHeight(e.endCoordinates.height)
      }
      if (innerScrollRef.current) {
        innerScrollRef.current.scrollTo({ y: (innerScrollY as any).__getValue() + e.endCoordinates.height, animated: true, x: 0 })
      }
    })
    Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardShown(false)
      if (innerScrollRef.current) {
        innerScrollRef.current.scrollTo({ y: (innerScrollY as any).__getValue() - keyboardHeight, animated: true, x: 0 })
      }
    })
    return () => {
      Keyboard.removeAllListeners('keyboardDidShow')
      Keyboard.removeAllListeners('keyboardDidHide')
    }
  }, [keyboardHeight])

  useEffect(() => {
    if (headerEnabled) {
      outerScrollRef.current?.scrollTo({ y: bigTitleContainerHeight - headerHeight, animated: true, x: 0 })
      outerScrollY.setValue(bigTitleContainerHeight - headerHeight)
    }
  }, [headerEnabled])

  let timeoutHeaderAnimation = useRef<any>(null).current

  // to determine whether header is shrinking or not
  const handleInnerNestedScroll = (currentOffset: number) => {
    if (timeoutHeaderAnimation) clearTimeout(timeoutHeaderAnimation)
    timeoutHeaderAnimation = setTimeout(() => {
      if (currentOffset > Math.floor(bigTitleContainerHeight - headerHeight) / 2) {
        outerScrollRef.current?.scrollTo({ y: bigTitleContainerHeight - headerHeight, animated: true, x: 0 })
        outerStartY = bigTitleContainerHeight - headerHeight
      } else {
        outerScrollRef.current?.scrollTo({ y: 0, animated: true, x: 0 })
        outerStartY = 0
      }
    }, 0)
  }

  const outerHandleEndDrag = ({ nativeEvent }: {
    nativeEvent: NativeScrollEvent
  }) => {
    const currentOffset = nativeEvent.contentOffset.y
    handleInnerNestedScroll(currentOffset)
  }

  const innerHandleScrollEndDrag = ({ nativeEvent }: {
    nativeEvent: NativeScrollEvent
  }) => {
    if (headerEnabled) {
      const currentOffset = (outerScrollY as any).__getValue()
      if (Math.floor(nativeEvent.contentOffset.y) <= 0) {
        handleInnerNestedScroll(currentOffset)
      }
    }
  }

  const handleInnerScrollTouchEnd = () => {
    if (headerEnabled) {
      const currentOffset = (outerScrollY as any).__getValue()
      handleInnerNestedScroll(currentOffset)
    }
  }

  const hideScrollBar = () => {
    timeoutScrollBarOpacity = setTimeout(() => {
      Animated.timing(scrollBarOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true
      }).start()
    }, 800)
  }

  const showScrollBar = () => {
    if (timeoutScrollBarOpacity) clearTimeout(timeoutScrollBarOpacity)
    Animated.timing(scrollBarOpacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true
    }).start()
  }

  const titleSmallOpacityAnim = outerScrollY.interpolate({
    inputRange: [0, (bigTitleContainerHeight - headerHeight) * .5, (bigTitleContainerHeight - headerHeight) * .75],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp'
  })

  const titleMarginLeftAnim = outerScrollY.interpolate({
    inputRange: [0, (bigTitleContainerHeight - headerHeight) * .25, (bigTitleContainerHeight - headerHeight) * .5],
    outputRange: [safeArea.width * -1, safeArea.width * -1, 0],
    extrapolate: 'clamp'
  })

  const titleBigOpacityAnim = outerScrollY.interpolate({
    inputRange: [0, (bigTitleContainerHeight - headerHeight) * .25, (bigTitleContainerHeight - headerHeight) * .5],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp'
  })

  const titleBigTranslateYAnim = outerScrollY.interpolate({
    inputRange: [0, bigTitleContainerHeight - headerHeight],
    outputRange: [0, (bigTitleContainerHeight - headerHeight) * .5],
    extrapolate: 'clamp'
  })

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.backgroundBasicColor1 }}>
      <ScrollView
        overScrollMode='never'
        bounces={false}
        decelerationRate='fast'
        ref={outerScrollRef}
        onScroll={({ nativeEvent }) => {
          const currentOffset = nativeEvent.contentOffset.y
          outerScrollY.setValue(currentOffset)
        }}
        onScrollBeginDrag={() => {
          if (timeoutHeaderAnimation) clearTimeout(timeoutHeaderAnimation)
        }}
        onContentSizeChange={(w, h) => {
          outerScrollRef.current?.scrollTo({ y: bigTitleContainerHeight - headerHeight, animated: false, x: 0 })
          outerScrollY.setValue(bigTitleContainerHeight - headerHeight)
        }}
        onScrollEndDrag={outerHandleEndDrag}
        showsVerticalScrollIndicator={false}
      >
        {
          headerEnabled && (
            <View style={{ height: bigTitleContainerHeight }}>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: GUTTER_SPACE * 2, overflow: 'hidden', paddingTop: (headerHeight / 2) }}>
                <Animated.View style={{ opacity: titleBigOpacityAnim, transform: [{ translateY: titleBigTranslateYAnim }] }}>
                  {
                    typeof longerTitle === 'object' ? longerTitle :
                      <Typography animated size={36} style={{ fontWeight: '400', textAlign: 'center' }}>{longerTitle || title}</Typography>
                  }
                </Animated.View>
              </View>
              <View style={{ height: headerHeight, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: GUTTER_SPACE, borderBottomWidth: 1, borderBottomColor: theme.borderBasicColor2 }}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                  {
                    navigation.canGoBack() ? (
                      <TouchableOpacity onPress={onBackPress ? () => onBackPress(goBack) : goBack}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', overflow: 'hidden', minWidth: 45, paddingVertical: GUTTER_SPACE }}>
                          <View style={{ alignItems: 'center', width: 45 }}>
                            <Icon size={32} name='chevron-left' color={theme.textBasicColor} />
                          </View>
                          <Typography numberOfLines={1} animated size={20} style={{ fontWeight: '500', marginLeft: titleMarginLeftAnim, opacity: titleSmallOpacityAnim, marginRight: 15 }}>{title}</Typography>
                        </View>
                      </TouchableOpacity>
                    ) : (
                      <View style={{ paddingLeft: GUTTER_SPACE }}>
                        <Typography numberOfLines={1} animated size={20} style={{ fontWeight: '500', opacity: titleSmallOpacityAnim }}>{title}</Typography>
                      </View>
                    )
                  }
                </View>
                {rightControl}
              </View>
            </View>
          )
        }
        <View style={{ height: innerContainerHeight, overflow: 'hidden' }}>
          <ScrollView
            ref={innerScrollRef}
            // overScrollMode='never'
            // bounces={false}
            onScrollEndDrag={innerHandleScrollEndDrag}
            nestedScrollEnabled={true}
            scrollEnabled={scrollEnabled}
            scrollEventThrottle={16}
            onTouchEnd={handleInnerScrollTouchEnd}
            onContentSizeChange={(_w, h) => {
              scrollableHeight.current = Math.max(h - innerContainerHeight, 1)
              const visibleRatio = innerContainerHeight / h
              setInnerScrollbarHeight(Math.max(visibleRatio * innerContainerHeight, 30)) // Ensure min size
              innerScrollbarMovableRange.current = innerContainerHeight - Math.max(visibleRatio * innerContainerHeight, 30) - 20
            }}
            onScroll={({ nativeEvent }) => {
              innerScrollY.setValue(nativeEvent.contentOffset.y)
            }}
            onScrollBeginDrag={({ nativeEvent }) => {
              if (timeoutHeaderAnimation) clearTimeout(timeoutHeaderAnimation)
              innerStartY = nativeEvent.contentOffset.y
            }}
            onMomentumScrollBegin={showScrollBar}
            onMomentumScrollEnd={hideScrollBar}
          // showsVerticalScrollIndicator={false}
          >
            {
              scrollEnabled ? (
                <View style={{ overflow: 'hidden', height: !innerScrollEnabled ? innerContainerHeight : undefined }}>
                  {
                    typeof children === 'function' ?
                      children(innerContainerHeight) :
                      children
                  }
                </View>
              ) :
                (
                  <View style={{ height: innerContainerHeight }}>
                    {typeof children === 'function' ? children(innerContainerHeight) : children}
                  </View>
                )
            }
            {
              keyboardShown && (
                <View style={{ height: keyboardHeight }} />
              )
            }
          </ScrollView>

          {/* Custom Scroll Bar */}
          {/* {
          ((!isFinite(innerScrollbarHeight) || !isNaN(innerScrollbarHeight)) && scrollEnabled && (
            (innerContainerHeight - innerScrollbarHeight - 20) > 0
          )) && (
            <Animated.View style={{
              position: "absolute",
              right: 10 / 2,
              top: 10,
              bottom: 10,
              width: 5,
              borderRadius: GUTTER_SPACE / 2,
              opacity: scrollBarOpacity
            }}>
              <Animated.View onTouchStart={() => {
                if (innerScrollEnabled) showScrollBar()
              }} onTouchEnd={() => {
                hideScrollBar()
              }} {...(innerScrollEnabled ? panResponder.panHandlers : {})} style={[{
                width: 5,
                backgroundColor: theme.backgroundAlternativeColor1,
                opacity: 0.25,
                borderRadius: GUTTER_SPACE / 2,
                position: "absolute"
              }, { height: innerScrollbarHeight, top: scrollIndicator }]}>
              </Animated.View>
            </Animated.View>
          )
        } */}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}