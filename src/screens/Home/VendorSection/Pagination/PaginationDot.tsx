import { useWindowDimensions } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { CARD_SPACING, VendorSectionContext } from '..';
import { useTheme } from '../../../../components/core/AppProvider';
import { useContext, useMemo } from 'react';

export default function PaginationDot({
  index,
  scrollX,
}: {
  index: number;
  scrollX: SharedValue<number>;
}) {
  const {width} = useWindowDimensions();
  const {cardWidthScale} = useContext(VendorSectionContext);
  const cardWidth = useMemo(
    () => width * cardWidthScale,
    [width, cardWidthScale],
  );
  const theme = useTheme();
  const animatedDotStyle = useAnimatedStyle(() => {
    const widthInterpolation = interpolate(
      scrollX.value,
      [
        (index - 1) * (cardWidth + CARD_SPACING),
        index * (cardWidth + CARD_SPACING),
        (index + 1) * (cardWidth + CARD_SPACING),
      ],
      [6, 10, 6],
      Extrapolation.CLAMP,
    );

    return {
      width: widthInterpolation,
      opacity: widthInterpolation > 9 ? 1 : 0.4,
    };
  });

  return (
    <Animated.View
      style={[
        {
          height: 6,
          borderRadius: 3,
          backgroundColor: theme['text-primary'],
          marginHorizontal: 4,
        },
        animatedDotStyle,
      ]}
    />
  );
}
