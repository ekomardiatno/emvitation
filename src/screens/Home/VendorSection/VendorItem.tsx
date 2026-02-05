import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { CARD_SPACING, Vendor, VendorSectionContext } from '.';
import Button from '../../../components/core/Button';
import { Image, useWindowDimensions, View } from 'react-native';
import { useTheme } from '../../../components/core/AppProvider';
import { RADIUS, SPACING } from '../../../constants';
import Typography from '../../../components/core/Typography';
import { useContext, useMemo } from 'react';

export default function VendorItem({
  item,
  index,
  scrollX,
  onPress,
}: {
  item: Vendor;
  index: number;
  scrollX: SharedValue<number>;
  onPress: (url: string) => void;
}) {
  const {cardWidthScale, items} = useContext(VendorSectionContext);
  const {width} = useWindowDimensions();
  const cardWidth = useMemo(
    () => width * cardWidthScale - (items.length > 1 ? 0 : SPACING.md * 2),
    [width, cardWidthScale, items.length],
  );
  const theme = useTheme();
  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollX.value,
      [
        (index - 1) * (cardWidth + CARD_SPACING),
        index * (cardWidth + CARD_SPACING),
        (index + 1) * (cardWidth + CARD_SPACING),
      ],
      [0.92, 1, 0.92],
      Extrapolation.CLAMP,
    );

    return {
      transform: [{scale}],
    };
  });

  const vendorHeroImageHeight = (cardWidth / 16) * 9;
  const logoSize = 80;

  return (
    <Animated.View
      style={[
        {
          width: cardWidth,
          borderRadius: RADIUS.md,
          overflow: 'hidden',
          borderColor: theme['border-default'],
          borderWidth: 1,
          position: 'relative',
        },
        animatedStyle,
      ]}>
      <Image
        source={item.bannerImage}
        style={{
          width: '100%',
          height: vendorHeroImageHeight,
        }}
      />

      <View
        style={{
          backgroundColor: theme['bg-surface'],
          padding: SPACING.lg,
          flexGrow: 1,
        }}>
        <View
          style={{
            flexGrow: 1,
            paddingRight: item.logoImage ? logoSize : 0,
          }}>
          <Typography category="h4">{item.name}</Typography>

          <Typography category="xsmall" style={{marginTop: SPACING.xs}}>
            {item.category &&
              item.location &&
              `${item.category} • ${item.location}`}
            {item.category && !item.location && item.category}
            {!item.category && item.location && item.location}
            {!item.category && !item.location && '—'}
          </Typography>
        </View>

        {item.instagramUrl && (
          <View
            style={{
              marginTop: SPACING.lg,
              borderTopWidth: 1,
              borderTopColor: theme['border-default'],
              paddingTop: SPACING.lg,
            }}>
            <Button
              category="xsmall"
              onPress={() =>
                item.instagramUrl ? onPress(item.instagramUrl) : {}
              }>
              Lihat Instagram
            </Button>
          </View>
        )}
      </View>
      {item.logoImage && (
        <View
          style={{
            width: logoSize,
            height: logoSize,
            borderRadius: RADIUS.full,
            overflow: 'hidden',
            position: 'absolute',
            right: SPACING.md,
            top: vendorHeroImageHeight - logoSize / 2,
            borderWidth: SPACING.xs,
            borderColor: theme['border-default'],
          }}>
          <Image
            source={item.logoImage}
            style={{width: '100%', height: '100%'}}
            resizeMode="cover"
          />
        </View>
      )}
    </Animated.View>
  );
}
