import React, { createContext, useEffect, useMemo, useState } from 'react';
import {
  View,
  Linking,
  useWindowDimensions,
  ImageSourcePropType,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import Typography from '../../../components/core/Typography';
import { SPACING } from '../../../constants';
import Pagination from './Pagination';
import VendorItem from './VendorItem';
import useAppSelector from '../../../hooks/useAppSelector';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { loadingVendors } from '../../../redux/reducers/vendor.reducer';
import getImageFullPath from '../../../helpers/getImageFullPath';
import { ErrorState } from '../../../components/ErrorState';

export const CARD_SPACING = SPACING.md;
export const CARD_SCALE = 0.8;

export type Vendor = {
  id: string;
  name: string;
  category: string | null;
  location: string | null;
  bannerImage: ImageSourcePropType;
  instagramUrl: string | null;
  logoImage?: ImageSourcePropType;
};

export const VendorSectionContext = createContext<{
  cardWidthScale: number;
  items: Vendor[];
}>({
  cardWidthScale: CARD_SCALE,
  items: [],
});

function VendorSection({
  title,
  description,
}: {
  title?: string;
  description?: string;
}) {
  const {width} = useWindowDimensions();
  const scrollX = useSharedValue(0);
  const dispatch = useAppDispatch();
  const {isLoading, vendors, error} = useAppSelector(state => state.vendor);
  const [cardWidthScale, setCardWidthScale] = useState(CARD_SCALE);

  useEffect(() => {
    if (vendors.length < 2) {
      setCardWidthScale(1);
    } else {
      setCardWidthScale(CARD_SCALE);
    }
  }, [vendors.length]);

  const cardWidth = useMemo(() => {
    return (width - (SPACING.md * 2)) * cardWidthScale;
  }, [cardWidthScale, width]);

  useEffect(() => {
    if (isLoading) {
      dispatch(loadingVendors());
    }
  }, [isLoading, dispatch]);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const openInstagram = (url: string) => {
    Linking.openURL(url).catch(() => {});
  };

  const data = useMemo<Vendor[]>(() => {
    if (vendors.length > 0) {
      return vendors.map(vendor => ({
        id: vendor.id,
        name: vendor.name,
        category: vendor.category,
        location: vendor.location,
        bannerImage: {
          uri: getImageFullPath(vendor.bannerImagePath || ''),
        },
        instagramUrl: vendor.instagramUrl,
        logoImage: vendor.logoImagePath
          ? {uri: getImageFullPath(vendor.logoImagePath)}
          : undefined,
      }));
    }
    return [];
  }, [vendors]);

  if (isLoading) {
    return null;
  }

  if (!error && data.length < 1) {
    return null;
  }

  return (
    <VendorSectionContext.Provider value={{cardWidthScale, items: data}}>
      {(title || description) && (
        <View
          style={{
            marginBottom: SPACING.lg,
            paddingHorizontal: SPACING.md,
          }}>
          {title && <Typography category="h4">{title}</Typography>}
          {description && (
            <Typography category="small">{description}</Typography>
          )}
        </View>
      )}
      {error ? (
        <ErrorState
          message={error || 'Unknown Error'}
          onRetry={() => {
            dispatch(loadingVendors());
          }}
          title="Gagal memuat vendor"
        />
      ) : (
        <Animated.FlatList
          data={data}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={cardWidth + SPACING.md}
          decelerationRate="fast"
          contentContainerStyle={{
            paddingHorizontal: SPACING.md,
            gap: CARD_SPACING,
            width: data.length < 2 ? width : undefined,
            justifyContent: data.length < 2 ? 'center' : undefined,
          }}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          renderItem={({item, index}) => (
            <VendorItem
              key={index}
              item={item}
              index={index}
              scrollX={scrollX}
              onPress={openInstagram}
            />
          )}
        />
      )}

      <Pagination data={data} scrollX={scrollX} />
    </VendorSectionContext.Provider>
  );
}

export default VendorSection;
