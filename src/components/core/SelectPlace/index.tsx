import { useEffect, useRef, useState } from 'react';
import {
  Image,
  PermissionsAndroid,
  PermissionStatus,
  ScrollView,
  TouchableHighlight,
  View,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useTheme } from '../AppProvider';
import { RADIUS, SPACING } from '../../../constants';
import Geolocation from '@react-native-community/geolocation';
import Icon from '@react-native-vector-icons/material-icons';
import Button from '../Button';
import FieldLabel from '../FieldLabel';
import EModal from '../EModal';
import Input from '../Input';
import * as yup from 'yup';
import {
  Control,
  FieldValue,
  useController,
  UseControllerReturn,
  useForm,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import Typography from '../Typography';
import ControlProps from '../ControlProps';
import capitalizeFirstText from '../../../utils/capitalizeFirstText';
import {
  PlacesSearchStatusType,
  PlacesTextSearchResponseType,
  PlaceType,
} from '../../../types/google-place-type';
import useWindowHeightOnKeyboard from '../../../hooks/useWindowHeightOnKeyboard';
import FieldErrorText from '../FieldErrorText';

const searchSchema = yup.object({
  search_input: yup.string(),
});

const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;

export default function SelectPlace({
  label,
  required,
  name,
  defaultValue,
  control,
  placeholderSearch,
  editable,
}: Omit<ControlProps, 'control' | 'name'> & {
  control?: Control<FieldValue<any>, any, FieldValue<any>>;
  name?: string;
  placeholderSearch?: string;
}) {
  const {control: searchControl} = useForm({
    resolver: yupResolver(searchSchema),
  });
  let controller: UseControllerReturn<any, string> | null = useController({
    control,
    defaultValue,
    name: name || '',
  });
  if (!control || !name) {
    controller = null;
  }
  // let prevDefaultValue = useRef<string | null | undefined>(defaultValue).current
  const mapRef = useRef<MapView>(null);
  const {keyboardHeight} = useWindowHeightOnKeyboard();

  const theme = useTheme();
  const [initialLocation, setInitialLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [permissionAndroid, setPermissionAndroid] =
    useState<PermissionStatus | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [searchInput, setSearchInput] = useState<string>('');
  const [isSearchModalOpened, setIsSearchModalOpened] =
    useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<null | PlaceType[]>(null);
  const [searchStatus, setSearchStatus] =
    useState<PlacesSearchStatusType | null>(null);
  const [searchError, setSearchError] = useState<TypeError | Error | null>(
    null,
  );
  const [isLoadingMap, setIsLoadingMap] = useState<boolean>(false);
  const frame = useSafeAreaFrame();
  // const insets = useSafeAreaInsets();

  useEffect(() => {
    if (controller?.field.value) {
      const location = (controller.field.value as string)
        .split(',')
        .map((s: string) => Number(s.trim()));
      setSelectedLocation({
        latitude: location[0],
        longitude: location[1],
      });
      mapRef.current?.animateToRegion({
        latitude: location[0],
        longitude: location[1],
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      });
    }
  }, [controller?.field.value]);

  useEffect(() => {
    const requestPermission = async () => {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      setPermissionAndroid(granted);
    };
    requestPermission();
  }, []);

  let timeoutSearch = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  ).current;
  const handleChangeSearchText = (str: string) => {
    if (timeoutSearch) {
      clearTimeout(timeoutSearch);
    }
    timeoutSearch = setTimeout(() => {
      setSearchInput(str);
    }, 800);
  };

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    const fetchApi = async (pageToken?: string) => {
      if (!pageToken) {
        setIsSearching(true);
        setSearchResult(null);
      }
      setSearchError(null);
      try {
        const search = new URLSearchParams();
        if (pageToken) {
          search.append('pagetoken', pageToken);
        } else {
          search.append('query', searchInput);
          if (initialLocation) {
            search.append(
              'location',
              `${initialLocation.latitude},${initialLocation.longitude}`,
            );
          }
        }
        const result = await fetch(
          `https://maps.googleapis.com/maps/api/place/textsearch/json?${search}`,
        );
        if (result.status === 200) {
          const json = (await result.json()) as PlacesTextSearchResponseType;
          setSearchStatus(json.status);
          if (json.status === 'OK' || json.status === 'ZERO_RESULTS') {
            if (pageToken) {
              setSearchResult(state => {
                if (state) return [...state, ...json.results];
                return json.results;
              });
            } else {
              setSearchResult(json.results);
            }
            if (json.next_page_token) {
              timeout = setTimeout(() => {
                fetchApi(json.next_page_token);
                console.log('triggered');
              }, 2000);
            }
          } else if (json.status === 'INVALID_REQUEST' && pageToken) {
            timeout = setTimeout(() => {
              fetchApi(pageToken);
            }, 2000);
          } else {
            throw new Error(json.status);
          }
        } else {
          throw new Error(result.statusText);
        }
      } catch (e) {
        console.log(e, '<<<');
        if (e instanceof TypeError) {
          setSearchError(e);
        } else if (e instanceof Error) {
          setSearchError(e);
        }
      } finally {
        setIsSearching(false);
      }
    };
    if (searchInput) {
      fetchApi();
      return () => {
        if (timeout) {
          clearTimeout(timeout);
        }
      };
    }
  }, [searchInput, initialLocation]);

  useEffect(() => {
    if (
      defaultValue &&
      /^[-+]?([1-8]?\d(?:\.\d+)?|90(?:\.0+)?),\s*[-+]?((1[0-7]\d|0?\d{1,2})(?:\.\d+)?|180(?:\.0+)?)$/.test(
        defaultValue,
      )
    ) {
      const [latitude, longitude] = defaultValue
        .split(',')
        .map(s => Number(s.trim()));
      setInitialLocation({latitude, longitude});
      setSelectedLocation({latitude, longitude});
      mapRef.current?.animateToRegion({
        latitude,
        longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      });
    } else {
      if (permissionAndroid === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(pos => {
          const {latitude, longitude} = pos.coords;
          setInitialLocation({latitude, longitude});
          mapRef.current?.animateToRegion({
            latitude,
            longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          });
        });
      }
    }
  }, [permissionAndroid, defaultValue]);

  const handleSelectPlace = (place: PlaceType) => {
    if (place.geometry?.location) {
      const {lat, lng} = place.geometry?.location;
      mapRef.current?.animateToRegion({
        latitude: lat,
        longitude: lng,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      });
      setInitialLocation({latitude: lat, longitude: lng});
      if (!selectedLocation)
        setSelectedLocation({latitude: lat, longitude: lng});
      setIsSearchModalOpened(false);
    }
  };

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    if (isLoadingMap) {
      timeout = setTimeout(() => {
        setIsLoadingMap(false);
      }, 0);
      return () => {
        if (timeout) clearTimeout(timeout);
      };
    }
  }, [isLoadingMap]);

  useEffect(() => {
    if (theme.googleMapStyle) {
      setIsLoadingMap(true);
    }
  }, [theme.googleMapStyle]);

  useEffect(() => {
    if (selectedLocation) {
      controller?.field.onChange(
        `${selectedLocation.latitude}, ${selectedLocation.longitude}`,
      );
    }
  }, [controller?.field, selectedLocation]);

  return (
    <View>
      {label && <FieldLabel label={label} required={required} />}
      <View
        style={{
          position: 'relative',
          borderWidth: 1,
          borderColor:
            controller?.formState.errors &&
            name &&
            controller.formState.errors[name]
              ? theme['error-text']
              : theme['border-default'],
          borderRadius: RADIUS.sm,
          overflow: 'hidden',
          width: '100%',
          height: frame.width > frame.height ? frame.height - 115 : frame.width,
        }}>
        {!isLoadingMap && initialLocation && (
          <MapView
            ref={mapRef}
            style={{width: '100%', height: '100%'}}
            initialRegion={{
              latitude: initialLocation.latitude,
              longitude: initialLocation.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LATITUDE_DELTA,
            }}
            onRegionChangeComplete={e => {
              setInitialLocation({
                latitude: e.latitude,
                longitude: e.longitude,
              });
            }}
            onPress={e => {
              const {latitude, longitude} = e.nativeEvent.coordinate;
              setSelectedLocation({latitude, longitude});
            }}
            onPoiClick={e => {
              const {latitude, longitude} = e.nativeEvent.coordinate;
              setSelectedLocation({latitude, longitude});
            }}
            // customMapStyle={theme.googleMapStyle}
          >
            {selectedLocation && (
              <Marker
                draggable
                onDragEnd={e => {
                  const {latitude, longitude} = e.nativeEvent.coordinate;
                  setSelectedLocation({latitude, longitude});
                }}
                coordinate={selectedLocation}
              />
            )}
          </MapView>
        )}
        {selectedLocation && (
          <View
            style={{
              paddingHorizontal: SPACING.md,
              height: 40,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Typography
                numberOfLines={1}
                style={{textAlign: 'center'}}
                category="small">
                {Object.keys(selectedLocation)
                  .map(
                    k => selectedLocation[k as keyof typeof selectedLocation],
                  )
                  .join(', ')}
              </Typography>
            </View>
          </View>
        )}
        <View
          style={{
            position: 'absolute',
            right: SPACING.md / 2,
            top: SPACING.md / 2,
            zIndex: 1,
            gap: 8,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <Button
              onPress={() => {
                setIsSearchModalOpened(true);
              }}
              style={{
                backgroundColor: theme['primary-bg'],
                paddingVertical: 6,
                paddingHorizontal: 6,
                borderRadius: SPACING.md - SPACING.md / 2,
              }}
              appearance="transparent">
              <Icon color={theme['primary-text']} size={20} name="search" />
            </Button>
          </View>
          {selectedLocation && (
            <View style={{gap: 8}}>
              <Button
                onPress={() => {
                  const {latitude, longitude} = selectedLocation;
                  setInitialLocation({latitude, longitude});
                  mapRef.current?.animateToRegion({
                    latitude,
                    longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                  });
                }}
                style={{
                  backgroundColor: theme['secondary-bg'],
                  paddingVertical: 6,
                  paddingHorizontal: 6,
                  borderRadius: SPACING.md - SPACING.md / 2,
                }}
                appearance="transparent">
                <Icon
                  color={theme['secondary-text']}
                  size={20}
                  name="pin-drop"
                />
              </Button>
              <Button
                onPress={() => {
                  setSelectedLocation(null);
                }}
                style={{
                  paddingVertical: 6,
                  paddingHorizontal: 6,
                  borderRadius: SPACING.md - SPACING.md / 2,
                }}
                appearance="basic">
                <Icon
                  color={theme['text-primary']}
                  size={20}
                  name="wrong-location"
                />
              </Button>
            </View>
          )}
        </View>
        {editable === false && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: theme['bg-surface'],
              opacity: 0.5,
              zIndex: 3,
            }}
          />
        )}
      </View>
      {controller?.formState.errors &&
        name &&
        controller?.formState.errors[name] &&
        typeof controller?.formState.errors[name].message === 'string' && (
          <FieldErrorText>
            {capitalizeFirstText(controller?.formState.errors[name].message)}
          </FieldErrorText>
        )}
      <EModal
        visible={isSearchModalOpened}
        onClose={() => setIsSearchModalOpened(false)}>
        <View
          style={{
            backgroundColor: theme['bg-surface'],
            width: '100%',
            height:
              frame.width < frame.height
                ? 500 - keyboardHeight / 2
                : frame.width - 100,
            paddingHorizontal: SPACING.md,
            paddingVertical: SPACING.md,
            borderTopLeftRadius: RADIUS.md,
            borderTopRightRadius: RADIUS.md,
          }}>
          <View style={{position: 'relative'}}>
            <Input
              name="search_input"
              placeholder={placeholderSearch ?? 'Cari Tempat'}
              control={searchControl}
              onChangeText={handleChangeSearchText}
              inputWrapperStyle={{
                backgroundColor: theme['bg-muted'],
              }}
              inputStyle={{
                paddingRight: 40,
                paddingLeft: SPACING.sm,
                color: theme['text-secondary'],
              }}
            />
            <View
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                width: 40,
              }}>
              <Icon name="search" color={theme['text-secondary']} size={20} />
            </View>
          </View>
          <View
            style={{
              overflow: 'hidden',
              flex: 1,
              borderRadius: 16,
              paddingTop: SPACING.md,
            }}>
            {isSearching ? (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                }}>
                <Image
                  source={require('../../../assets/images/neutral-illustration.webp')}
                  style={{width: 80, height: 80}}
                />
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Typography category="large">Mencari...</Typography>
                </View>
              </View>
            ) : searchError ? (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                }}>
                <Image
                  source={require('../../../assets/images/error-illustration.webp')}
                  style={{width: 80, height: 80}}
                />
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Typography category="large">Ada kesalahan</Typography>
                  <Typography category="small">
                    Silakan coba lagi nanti
                  </Typography>
                </View>
              </View>
            ) : !searchResult ? (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                }}>
                <Image
                  source={require('../../../assets/images/info-illustration.webp')}
                  style={{width: 80, height: 80}}
                />

                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Typography category="large">Temukan lokasi</Typography>
                  <Typography category="small">
                    Cari tempat familiar di sekitar lokasi
                  </Typography>
                </View>
              </View>
            ) : searchStatus === 'ZERO_RESULTS' ? (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                }}>
                <Image
                  source={require('../../../assets/images/warning-illustration.webp')}
                  style={{width: 80, height: 80}}
                />

                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Typography category="large">
                    Tempat tidak ditemukan
                  </Typography>
                  <Typography category="small">
                    Coba gunakan kata kunci lain
                  </Typography>
                </View>
              </View>
            ) : (
              <ScrollView>
                <View style={{gap: SPACING.md}}>
                  {searchResult?.map((place, i) => {
                    return (
                      <TouchableHighlight
                        key={i}
                        underlayColor={theme.overlay}
                        style={{
                          borderRadius: 16,
                          backgroundColor: theme['secondary-bg'],
                        }}
                        onPress={() => {
                          handleSelectPlace(place);
                        }}>
                        <View
                          style={{
                            padding: SPACING.md,
                            borderRadius: 16,
                            backgroundColor: theme['secondary-bg'],
                            flexDirection: 'row',
                            gap: 8,
                          }}>
                          <Icon
                            name="place"
                            color={theme['secondary-text']}
                            size={26}
                          />
                          <View style={{flex: 1}}>
                            <Typography category="h4">{place.name}</Typography>
                            <Typography
                              color={theme['secondary-text']}
                              numberOfLines={1}>
                              {place.formatted_address}
                            </Typography>
                          </View>
                        </View>
                      </TouchableHighlight>
                    );
                  })}
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </EModal>
    </View>
  );
}
