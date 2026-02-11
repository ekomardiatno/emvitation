import { useWindowDimensions } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { VendorSectionContext } from '..';
import { useTheme } from '../../../../components/core/AppProvider';
import { useContext, useMemo } from 'react';
import { SPACING } from '../../../../constants';

export default function PaginationDot({
  index,
  scrollX,
}: {
  index: number;
  scrollX: SharedValue<number>;
}) {
  const {width} = useWindowDimensions();
  const {cardWidthScale, items} = useContext(VendorSectionContext);
  const cardWidth = useMemo(
    () => (width - SPACING.md * 2) * cardWidthScale,
    [width, cardWidthScale],
  );
  const theme = useTheme();
  const animatedDotStyle = useAnimatedStyle(() => {
    const widthInterpolation = interpolate(
      scrollX.value,
      [
        (index - 1) * (cardWidth - SPACING.md * 2),
        items.length - 1 === index
          ? index * (cardWidth + SPACING.md) -
            (width - (width - SPACING.md * 2) * cardWidthScale)
          : index * (cardWidth + SPACING.md),
        (index + 1) * (cardWidth - SPACING.md * 2),
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
