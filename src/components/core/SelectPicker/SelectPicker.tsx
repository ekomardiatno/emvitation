import { JSX, useEffect, useRef, useState } from 'react'
import {
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  PanResponder,
  Animated,
  TouchableHighlight,
  Platform,
  StyleProp,
  ViewStyle,
} from 'react-native'
import Typography from '../Typography'
import Icon from '@react-native-vector-icons/material-icons'
import { useTheme } from '../AppProvider'
import { useController } from 'react-hook-form'
import { BORDER_RADIUS, BORDER_WIDTH, COLORS, GUTTER_SPACE, TEXT_CONFIG } from '../../../constants'
import capitalizeFirstText from '../../../utils/capitalizeFirstText'
import Option from './Option'
import { getFontFamily } from '../Typography'
import EModal from '../EModal'
import ControlProps from '../ControlProps'
import FieldLabel from '../FieldLabel'
import { useSafeAreaFrame } from 'react-native-safe-area-context'

const SelectPicker = ({ label, placeholder, name, control, options, required, defaultValue, editable = true, containerStyle }: ControlProps & {
  options: { value: string, title: string, icon?: JSX.Element | ((color?: string) => JSX.Element) }[]
  containerStyle?: StyleProp<ViewStyle>
}): JSX.Element => {
  const { height } = useSafeAreaFrame()
  const { field, formState: { errors } } = useController({
    control,
    name,
    defaultValue
  })
  const theme = useTheme()
  const [isOptionOpened, setIsOptionOpened] = useState(false)
  const scrollRef = useRef<ScrollView>(null)
  const scrollY = useRef(new Animated.Value(0)).current

  const translateY = useRef(new Animated.Value(0)).current
  let distanceY = useRef(0)
  const velocityY = useRef(0)
  let animation = useRef<Animated.CompositeAnimation>(null)

  useEffect(() => {
    if (isOptionOpened) {
      translateY.setValue(0)
    }
  }, [isOptionOpened])

  const onCancel = () => {
    setIsOptionOpened(false)
  }

  const onOptionPressed = (value: string) => {
    field.onChange(value)
    setIsOptionOpened(false)
  }

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_evt, gestureState) => {
        if(gestureState.dy <= 0) return false
        if((scrollY as any).__getValue() > 0 && gestureState.dy > 0) return false
        if((scrollY as any).__getValue() <= 0 && gestureState.dy <= 2) return false
        return true
      },

      onPanResponderGrant: () => {
        // Stop any ongoing animation when a new swipe starts
        if (animation.current) {
          animation.current.stop()
        }
        translateY.setValue(distanceY.current)
      },

      onPanResponderMove: (_evt, gestureState) => {
        const finalOffset = Math.max(0, distanceY.current + gestureState.dy)
        translateY.setValue(finalOffset)
        velocityY.current = gestureState.vy // Update velocity dynamically
      },

      onPanResponderEnd: (_evt, gestureState) => {
        const newdistanceY = Math.max(0, distanceY.current + gestureState.dy)
        const DECELERATION = 0.987
        const estimatedDisplacement = velocityY.current / (1 - DECELERATION)
        const estimateddistanceY = newdistanceY + estimatedDisplacement

        if (newdistanceY > height / 4) {
          onCancel()
          distanceY.current = 0
        } else {
          // Continue scrolling with the latest velocity
          animation.current = Animated.decay(translateY, {
            velocity: estimateddistanceY < 0 ?
              0 * (1 - DECELERATION)
              : velocityY.current, // Uses latest swipe velocity
            deceleration: DECELERATION, // Adjust this value for smoothness
            useNativeDriver: true,
          })

          animation.current.start((e) => {
            const event = e as {
              finished: boolean
              value?: number
            }
            distanceY.current = event.finished ? (event.value ?? 0) : (translateY as any).__getValue()
            if (event.finished) {
              distanceY.current = 0
              if ((event.value ?? 0) > height / 4) {
                onCancel()
              } else {
                Animated.timing(translateY, {
                  toValue: 0,
                  duration: 200,
                  useNativeDriver: true
                }).start()
              }
            }
          })
        }

      }
    })
  ).current

  return (
    <View style={containerStyle}>
      {
        label &&
        <FieldLabel label={label} required={required} />
      }
      <View style={{ borderWidth: BORDER_WIDTH, borderRadius: BORDER_RADIUS, borderColor: errors[name] ? theme.borderDangerColor1 : !editable ? theme.backgroundBasicColor1 : theme.borderBasicColor2, backgroundColor: theme.backgroundBasicColor1 }}>
        <TextInput placeholderTextColor={theme.textHintColor} style={{ paddingHorizontal: 15, paddingVertical: Platform.OS === 'ios' ? 15 : 10, color: !editable ? theme.textDisabledColor : theme.textBasicColor, fontFamily: getFontFamily({}) }} placeholder={placeholder} value={field.value} />
        <TouchableOpacity
          disabled={!editable}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: BORDER_RADIUS, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', paddingHorizontal: 15 }}
          activeOpacity={1}
          onPress={() => setIsOptionOpened(true)}
        >
          {
            errors[name] &&
            <Icon name='error' color={theme.textDangerColor} size={TEXT_CONFIG.h6.fontSize} style={{ marginRight: 5 }} />
          }
          <Icon name='expand-more' color={theme.textHintColor} size={TEXT_CONFIG.p1.fontSize} />
        </TouchableOpacity>
      </View>
      {
        (errors[name] && typeof errors[name].message === 'string') &&
        <Typography category='c1' style={{ marginTop: 5 }} color={theme.textDangerColor}>{capitalizeFirstText(errors[name].message)}</Typography>
      }
      <EModal
        visible={isOptionOpened}
        onClose={onCancel}
      >
        <Animated.View  {...panResponder.panHandlers} style={{ backgroundColor: theme.backgroundBasicColor2, borderTopLeftRadius: 15, borderTopRightRadius: 15, overflow: 'hidden', transform: [{ translateY }] }}>
          <View style={{ padding: GUTTER_SPACE, paddingHorizontal: GUTTER_SPACE * 2, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography size={18} style={{ fontWeight: '600' }}>{placeholder || label}</Typography>
            <TouchableHighlight underlayColor={theme.backgroundBasicColor3} onPress={onCancel} style={{ width: 38, height: 38, alignItems: 'center', justifyContent: 'center', borderRadius: 38 / 2, backgroundColor: theme.backgroundBasicColor3 }}>
              <Icon size={20} color={theme.textBasicColor} name='close' />
            </TouchableHighlight>
          </View>
          <SafeAreaView style={{ backgroundColor: theme.backgroundBasicColor1, borderRadius: 15, overflow: 'hidden' }}>
            <View style={{ height: .5 * height }}>
              <ScrollView ref={scrollRef}
                overScrollMode='never'
                bounces={false}
                onScroll={e => {
                  scrollY.setValue(e.nativeEvent.contentOffset.y)
                }}
                onContentSizeChange={(w, h) => {
                  const optionHeight = h / options.length
                  const selectedIndex = options.findIndex(item => item.value === field.value) || 0
                  const offsetY = selectedIndex * optionHeight
                  const containerHeight = .5 * height
                  let initialScrollY = Math.floor(offsetY / containerHeight) * containerHeight
                  initialScrollY = Math.ceil(initialScrollY / optionHeight) * optionHeight - optionHeight
                  const scrollY = initialScrollY + containerHeight < offsetY + optionHeight ? initialScrollY + ((offsetY + optionHeight) - (initialScrollY + containerHeight)) + optionHeight : initialScrollY
                  scrollRef.current?.scrollTo({ y: scrollY, x: 0, animated: true })
                }}
                scrollEventThrottle={16}
              >
                {
                  options &&
                  options.map((option, i, arr) => (
                    <Option selected={option.value === field.value} key={`${option.value}_${i}`} value={option.value} title={option.title} icon={typeof option.icon === 'function' ? option.icon(option.value === field.value ? COLORS.colorBasic000 : undefined) : option.icon} onChange={onOptionPressed} isLastIndex={(i + 1) === arr.length} />
                  ))
                }
              </ScrollView>
            </View>
          </SafeAreaView>
        </Animated.View>
      </EModal>
    </View>
  )
}

export default SelectPicker