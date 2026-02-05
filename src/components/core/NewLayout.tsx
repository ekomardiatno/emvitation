import React from 'react';
import { TouchableOpacity, useWindowDimensions, View } from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  Text,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedRef,
  scrollTo,
  withTiming,
} from 'react-native-reanimated';

function NewLayout() {
  const translateY = useSharedValue(-250);
  const scrollY = useSharedValue(0);
  const {height} = useWindowDimensions();
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const contentHeight = useSharedValue(0);
  const dy = useSharedValue(0);
  const translationY = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      dy.value = 0;
      translationY.value = 0;
    })
    .onChange(event => {
      const maxScroll = contentHeight.value - height;
      const dyStep = -event.translationY - dy.value;
      dy.value = -event.translationY;
      const translationYStep = event.translationY - translationY.value;
      translationY.value = event.translationY;
      if (scrollY.value <= 0 && translationYStep > 0) {
        console.log('swipedown');
        // Swiping down
        translateY.value = Math.min(
          0,
          translateY.value + translationYStep * 1.5,
        );
      } else if (translationYStep < 0 && translateY.value > -250) {
        console.log('swipeup');
        // Swiping up
        translateY.value = Math.max(
          -250,
          translateY.value + translationYStep * 1.5,
        );
      } else if (translateY.value <= -250) {
        const nextScroll = scrollY.value + dyStep * 1.5;
        const clampedScroll = Math.min(Math.max(0, nextScroll), maxScroll);
        scrollTo(scrollRef, 0, clampedScroll, false);
        scrollY.value = clampedScroll;
      }
    })
    .onFinalize(event => {
      const maxScroll = contentHeight.value - height;
      if (translateY.value > -250) {
        translateY.value = withTiming(0, {
          duration: 300,
        });
      } else if (translateY.value < 0) {
        translateY.value = withTiming(-250, {
          duration: 300,
        });
      } else if (scrollY.value > 0 && scrollY.value < maxScroll) {
        const predictedScroll = event.translationY + event.velocityY * 0.1;
        const nextScroll = scrollY.value + -predictedScroll;
        const clampedScroll = Math.min(Math.max(0, nextScroll), maxScroll);
        console.log(scrollY.value, clampedScroll);
        scrollTo(scrollRef, 0, clampedScroll, true);
        scrollY.value = clampedScroll;
      }
      // if(event.translationY > 0) {
      //   console.log('up', scrollY.value, predictedScroll)
      // } else if (event.translationY < 0) {
      //   console.log('down', scrollY.value, predictedScroll)
      // }
    });
  // .onEnd(e => {
  //   console.log('end', e)
  // })

  const animatedHeaderStyle = useAnimatedStyle(() => ({
    transform: [{translateY: translateY.value}],
  }));
  const animatedContentStyle = useAnimatedStyle(() => ({
    transform: [{translateY: translateY.value}],
  }));

  return (
    <View style={{flex: 1}}>
      <GestureHandlerRootView
        style={{
          position: 'absolute',
          top: 0,
          height: height,
          width: '100%',
          zIndex: 2,
        }}>
        <GestureDetector gesture={panGesture}>
          <Animated.View style={{flex: 1}}></Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
      <Animated.View
        style={[
          {height: 300, width: '100%', backgroundColor: 'red'},
          animatedHeaderStyle,
        ]}>
        <Text>Sliding Header</Text>
      </Animated.View>
      <Animated.View
        style={[
          {height: height - 50, backgroundColor: 'blue'},
          animatedContentStyle,
        ]}>
        <Animated.ScrollView
          ref={scrollRef}
          scrollEventThrottle={16}
          onContentSizeChange={(w, h) => {
            contentHeight.set(h);
          }}
          scrollEnabled={false}>
          <View style={{alignItems: 'center', gap: 5}}>
            {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((s, i) => {
              return (
                <TouchableOpacity key={i}>
                  <View
                    style={{
                      padding: 5,
                      backgroundColor: 'red',
                      width: 50,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 30,
                        color: 'white',
                      }}>
                      {s}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </Animated.ScrollView>
      </Animated.View>
    </View>
  );
}

export default NewLayout;
