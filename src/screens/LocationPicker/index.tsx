import {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, {Region} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Icon from '@react-native-vector-icons/material-icons';
import {CommonActions, RouteProp} from '@react-navigation/native';
import {useTheme} from '../../components/core/AppProvider';
import Typography from '../../components/core/Typography';
import Button from '../../components/core/Button';
import {RADIUS, SHADOWS, SPACING, TYPOGRAPHY} from '../../constants';
import {AppStackParamList} from '../../types/navigation-type';
import useAppNavigation from '../../hooks/useAppNavigation';
import {searchPlaces} from '../../services/google';
import {SearchTextPlacesProps} from '../../types/google-place-type';
import {APP_GOOGLE_MAPS_API_KEY} from '../../config';
import cleanAddress from '../../utils/cleanAddress';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type LocationPickerRouteProp = RouteProp<AppStackParamList, 'LocationPicker'>;

export default function LocationPicker({
  route,
}: {
  route?: LocationPickerRouteProp;
}) {
  const theme = useTheme();
  const navigation = useAppNavigation();
  const insets = useSafeAreaInsets();
  const mapRef = useRef<MapView>(null);

  const initialLat = route?.params?.initialLat ?? 0;
  const initialLng = route?.params?.initialLng ?? 0;
  const returnScreen = route?.params?.returnScreen;
  const hasInitial = initialLat !== 0 && initialLng !== 0;

  const [region, setRegion] = useState<Region>({
    latitude: hasInitial ? initialLat : -6.2088,
    longitude: hasInitial ? initialLng : 106.8456,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchTextPlacesProps[]>(
    [],
  );
  const [isSearching, setIsSearching] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [selectedVenue, setSelectedVenue] = useState('');
  const [reverseGeocoding, setReverseGeocoding] = useState(false);
  const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const geocodeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const locationObtained = useRef(false);
  const poiName = useRef<string | null>(null);

  const reverseGeocode = useCallback(async (lat: number, lng: number) => {
    if (!APP_GOOGLE_MAPS_API_KEY) {
      return;
    }
    const pendingPoiName = poiName.current;
    poiName.current = null;
    setReverseGeocoding(true);
    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${APP_GOOGLE_MAPS_API_KEY}`,
      );
      const data = await res.json();
      if (data.results?.length > 0) {
        const addr = cleanAddress(data.results[0].formatted_address);
        setSelectedAddress(
          pendingPoiName ? `${pendingPoiName}, ${addr}` : addr,
        );
        if (pendingPoiName) {
          setSelectedVenue(pendingPoiName);
        }
      }
    } catch {}
    setReverseGeocoding(false);
  }, []);

  useEffect(() => {
    if (hasInitial) {
      locationObtained.current = true;
      reverseGeocode(initialLat, initialLng);
      return;
    }

    (async () => {
      if (Platform.OS === 'android') {
        try {
          await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );
        } catch {}
      }

      Geolocation.getCurrentPosition(
        pos => {
          if (locationObtained.current) {
            return;
          }
          locationObtained.current = true;
          const {latitude, longitude} = pos.coords;
          const newRegion = {
            latitude,
            longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          };
          setRegion(newRegion);
          mapRef.current?.animateToRegion(newRegion, 500);
        },
        () => {},
        {enableHighAccuracy: false, timeout: 15000, maximumAge: 300000},
      );
    })();
  }, [hasInitial]);

  const handleSearch = useCallback(
    (query: string) => {
      setSearchQuery(query);
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
      if (query.length < 3) {
        setSearchResults([]);
        setIsSearching(false);
        return;
      }
      setIsSearching(true);
      searchTimeout.current = setTimeout(async () => {
        try {
          const res = await searchPlaces({
            textQuery: query,
            location: {
              latitude: region.latitude,
              longitude: region.longitude,
              radius: 50000,
            },
          });
          if (
            res.status >= 200 &&
            res.status < 300 &&
            Array.isArray(res.data.places)
          ) {
            setSearchResults(res.data.places);
          }
        } catch {}
        setIsSearching(false);
      }, 500);
    },
    [region],
  );

  const selectPlace = useCallback((place: SearchTextPlacesProps) => {
    if (place.location) {
      const newRegion = {
        latitude: place.location.latitude,
        longitude: place.location.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      };
      setRegion(newRegion);
      setSelectedVenue(place.displayName.text);
      setSelectedAddress(cleanAddress(place.formattedAddress));
      mapRef.current?.animateToRegion(newRegion, 500);
    }
    setSearchResults([]);
    setSearchQuery('');
    Keyboard.dismiss();
  }, []);

  const handleConfirm = () => {
    if (returnScreen) {
      navigation.dispatch((state: any) => {
        const targetIndex = state.routes.findIndex(
          (r: any) => r.name === returnScreen,
        );
        if (targetIndex < 0) {
          return CommonActions.goBack();
        }
        const routes = state.routes.slice(0, targetIndex + 1);
        routes[targetIndex] = {
          ...routes[targetIndex],
          params: {
            ...routes[targetIndex].params,
            pickedLat: region.latitude,
            pickedLng: region.longitude,
            pickedAddress: selectedAddress,
            pickedVenue: selectedVenue,
          },
        };
        return CommonActions.reset({
          ...state,
          routes,
          index: routes.length - 1,
        });
      });
    } else {
      navigation.goBack();
    }
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={{flex: 1}}>
        {/* Map area — takes remaining space above bottom card */}
        <View style={{flex: 1}}>
          <MapView
            ref={mapRef}
            style={{flex: 1}}
            initialRegion={region}
            onRegionChangeComplete={newRegion => {
              setRegion(newRegion);
              if (geocodeTimeout.current) {
                clearTimeout(geocodeTimeout.current);
              }
              geocodeTimeout.current = setTimeout(() => {
                reverseGeocode(newRegion.latitude, newRegion.longitude);
              }, 500);
            }}
            onPoiClick={e => {
              const {name, coordinate} = e.nativeEvent;
              poiName.current = name.replace(/\n/g, ' ');
              const newRegion = {
                ...coordinate,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              };
              setRegion(newRegion);
              mapRef.current?.animateToRegion(newRegion, 500);
            }}
            showsUserLocation
            showsMyLocationButton={false}
          />

          {/* Fixed center pin */}
          <View
            pointerEvents="none"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon
              name="location-on"
              size={44}
              color={theme['error-text']}
              style={{marginTop: -44}}
            />
          </View>

          {/* Top search overlay */}
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              paddingTop: insets.top + SPACING.sm,
              paddingHorizontal: SPACING.md,
              paddingBottom: SPACING.sm,
            }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: theme['bg-surface'],
              borderRadius: RADIUS.full,
              paddingHorizontal: SPACING.sm,
              ...SHADOWS.md,
            }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{padding: SPACING.sm}}>
              <Icon
                name="arrow-back"
                size={22}
                color={theme['text-primary']}
              />
            </TouchableOpacity>
            <TextInput
              style={{
                flex: 1,
                fontSize: TYPOGRAPHY.textStyle.regular.fontSize,
                color: theme['text-primary'],
                paddingVertical: SPACING.md,
                paddingHorizontal: SPACING.sm,
              }}
              placeholder="Cari lokasi..."
              placeholderTextColor={theme['text-disabled']}
              value={searchQuery}
              onChangeText={handleSearch}
            />
            {isSearching && (
              <ActivityIndicator
                size="small"
                color={theme['primary-bg']}
                style={{marginRight: SPACING.sm}}
              />
            )}
            {searchQuery.length > 0 && !isSearching && (
              <TouchableOpacity
                onPress={() => {
                  setSearchQuery('');
                  setSearchResults([]);
                  Keyboard.dismiss();
                }}
                style={{padding: SPACING.sm}}>
                <Icon
                  name="close"
                  size={20}
                  color={theme['text-disabled']}
                />
              </TouchableOpacity>
            )}
          </View>

          {/* Search results dropdown */}
          {searchResults.length > 0 && (
            <FlatList
              style={{
                maxHeight: 280,
                backgroundColor: theme['bg-surface'],
                borderRadius: RADIUS.md,
                marginTop: SPACING.sm,
                ...SHADOWS.md,
              }}
              data={searchResults}
              keyExtractor={(_, i) => i.toString()}
              keyboardShouldPersistTaps="handled"
              renderItem={({item}) => (
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: SPACING.md,
                    paddingVertical: SPACING.md,
                    borderBottomWidth: 1,
                    borderBottomColor: theme['border-default'],
                  }}
                  onPress={() => selectPlace(item)}>
                  <Icon
                    name="place"
                    size={20}
                    color={theme['text-disabled']}
                    style={{marginRight: SPACING.sm}}
                  />
                  <View style={{flex: 1}}>
                    <Typography numberOfLines={1}>
                      {item.displayName.text}
                    </Typography>
                    <Typography
                      category="small"
                      numberOfLines={1}
                      color={theme['text-disabled']}>
                      {item.formattedAddress}
                    </Typography>
                  </View>
                </TouchableOpacity>
              )}
            />
          )}
          </View>

          {/* My location button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              Geolocation.getCurrentPosition(
                pos => {
                  const newRegion = {
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                  };
                  setRegion(newRegion);
                  mapRef.current?.animateToRegion(newRegion, 500);
                },
                () => {},
                {enableHighAccuracy: false, timeout: 15000, maximumAge: 300000},
              );
            }}
            style={{
              position: 'absolute',
              bottom: SPACING.md,
              right: SPACING.md,
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: theme['bg-surface'],
              alignItems: 'center',
              justifyContent: 'center',
              ...SHADOWS.md,
            }}>
            <Icon name="my-location" size={22} color={theme['primary-bg']} />
          </TouchableOpacity>
        </View>

        {/* Bottom card */}
        <View
          style={{
            backgroundColor: theme['bg-surface'],
            borderTopLeftRadius: RADIUS.lg,
            borderTopRightRadius: RADIUS.lg,
            padding: SPACING.lg,
            paddingBottom: insets.bottom + SPACING.lg,
            ...SHADOWS.lg,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: SPACING.md,
            }}>
            <Icon
              name="place"
              size={20}
              color={theme['primary-bg']}
              style={{marginRight: SPACING.sm}}
            />
            {reverseGeocoding ? (
              <View
                style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
                <ActivityIndicator
                  size="small"
                  color={theme['primary-bg']}
                />
                <Typography
                  category="small"
                  style={{marginLeft: SPACING.sm}}>
                  Mencari alamat...
                </Typography>
              </View>
            ) : (
              <Typography
                category="small"
                numberOfLines={2}
                style={{flex: 1}}>
                {selectedAddress || 'Geser peta atau cari untuk memilih lokasi'}
              </Typography>
            )}
          </View>
          <Button
            onPress={handleConfirm}
            appearance="primary"
            disabled={reverseGeocoding}>
            Pilih Lokasi Ini
          </Button>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
