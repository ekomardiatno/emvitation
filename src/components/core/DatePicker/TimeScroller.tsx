import { JSX, useEffect, useRef } from 'react'
import { Animated, PanResponder, View } from 'react-native'
import { useTheme } from '../AppProvider'
import { BORDER_RADIUS, BORDER_WIDTH } from '../../../constants'
import Typography from '../Typography'

const SIZE = 60

const TimeScroller = ({ setTime, time, numbers }: {
  setTime: (time: string) => void
  time: string
  numbers: number[]
}): JSX.Element => {
  const theme = useTheme()

  const scrollY = useRef(new Animated.Value(0)).current;
  let translateY = useRef(0)
  const velocityY = useRef(0);
  let animation = useRef<Animated.CompositeAnimation>(null);

  useEffect(() => {
    if(time) {
      const selectedTime = Number(time) * -1
      Animated.timing(scrollY, {
        toValue: selectedTime * (SIZE - (BORDER_WIDTH * 2)), // Ensure within bounds
        duration: 300,
        useNativeDriver: true
      }).start();
      translateY.current = selectedTime * (SIZE - (BORDER_WIDTH * 2))
    }
  }, [time])

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,

      onPanResponderGrant: () => {
        // Stop any ongoing animation when a new swipe starts
        if (animation.current) {
          animation.current.stop();
        }
        scrollY.setValue(translateY.current)
      },

      onPanResponderMove: (_evt, gestureState) => {
        const finalOffset = Math.max((numbers.length - 1) * (SIZE - (BORDER_WIDTH * 2)) * -1, Math.min(0, (translateY.current + gestureState.dy)))
        scrollY.setValue(finalOffset);
        velocityY.current = gestureState.vy; // Update velocity dynamically
      },

      onPanResponderRelease: (_evt, gestureState) => {
        const maxTranslateY = (numbers.length - 1) * (SIZE - (BORDER_WIDTH * 2)) * -1
        const newTranslateY = Math.max((numbers.length - 1) * (SIZE - (BORDER_WIDTH * 2)) * -1, Math.min(0, (translateY.current + gestureState.dy)))
        const DECELERATION = 0.985
        const estimatedDisplacement = velocityY.current / (1 - DECELERATION)
        const estimatedTranslateY = newTranslateY + estimatedDisplacement
        // Continue scrolling with the latest velocity
        animation.current = Animated.decay(scrollY, {
          velocity: estimatedTranslateY < maxTranslateY ?
            (maxTranslateY - newTranslateY) * (1 - DECELERATION)
            : estimatedTranslateY > 0 ?
              (newTranslateY * -1) * (1 - DECELERATION)
              : velocityY.current, // Uses latest swipe velocity
          deceleration: DECELERATION, // Adjust this value for smoothness
          useNativeDriver: true,
        });

        animation.current.start((e) => {
          const event = e as {
            value?: number;
            finished: boolean
          }
          translateY.current = e.finished ? (event.value ?? 0) : (scrollY as any).__getValue()
          if (e.finished) {
            const nextOffset = Math.max((numbers.length - 1) * (SIZE - (BORDER_WIDTH * 2)) * -1, Math.min(0, (event.value ?? 0)));
            const finalOffset = Math.round(nextOffset / (SIZE - (BORDER_WIDTH * 2)))
            const selectedTime = ('0' + (finalOffset * -1)).slice(-2)
            setTime(selectedTime)
            Animated.timing(scrollY, {
              toValue: (finalOffset * (SIZE - (BORDER_WIDTH * 2))),
              duration: 200,
              useNativeDriver: true
            }).start()
            translateY.current = (finalOffset * (SIZE - (BORDER_WIDTH * 2)))
          }
        });
      },
    })
  ).current;

  return (
    <View {...panResponder.panHandlers} style={{ borderWidth: BORDER_WIDTH, borderRadius: BORDER_RADIUS, borderColor: theme.borderBasicColor2, backgroundColor: theme.backgroundBasicColor2, overflow: 'hidden', width: SIZE, height: SIZE }}>
      <Animated.View style={{
        transform: [{ translateY: scrollY }]
      }}>
        {
          numbers.map(number => (
            <View key={`number_${number}`} style={{ width: SIZE - BORDER_WIDTH * 2, height: SIZE - BORDER_WIDTH * 2, alignItems: 'center', justifyContent: 'center' }}>
              <Typography size={28} style={{ fontWeight: '800' }}>{('0' + number).slice(-2)}</Typography>
            </View>
          ))
        }
      </Animated.View>
    </View>
  )
}

export default TimeScroller