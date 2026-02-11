import { useCallback, useEffect, useRef, useState } from 'react';
import {
  PermissionsAndroid,
  PermissionStatus,
  ScrollView,
  TouchableHighlight,
  View,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useTheme } from '../AppProvider';
import { RADIUS, SPACING, TYPOGRAPHY } from '../../../constants';
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
  SearchTextPlacesProps,
} from '../../../types/google-place-type';
import FieldErrorText from '../FieldErrorText';
import { IconState } from '../Confirmation';
import { searchPlaces } from '../../../services/google';
import { ApiError } from '../../../services/common';
import LoadingState from '../../LoadingState';
import KeyboardHeightView from '../KeyboardHeightView';

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
  onSelectPlace,
}: Omit<ControlProps, 'control' | 'name'> & {
  control?: Control<FieldValue<any>, any, FieldValue<any>>;
  name?: string;
  placeholderSearch?: string;
  onSelectPlace?: (place: SearchTextPlacesProps) => void;
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
  const [searchResult, setSearchResult] = useState<SearchTextPlacesProps[]>([]);
  const [searchStatus, setSearchStatus] =
    useState<PlacesSearchStatusType | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [isLoadingMap, setIsLoadingMap] = useState<boolean>(false);
  const frame = useSafeAreaFrame();
  // const insets = useSafeAreaInsets();

  useEffect(() => {
    if (selectedLocation) {
      mapRef.current?.animateToRegion({
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      });
    }
  }, [selectedLocation]);

  useEffect(() => {
    if (controller?.field.value) {
      const location = (controller.field.value as string)
        .split(',')
        .map((s: string) => Number(s.trim()));
      setSelectedLocation({
        latitude: location[0],
        longitude: location[1],
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

  const timeoutReFetchApi = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fetchSearchPlaces = useCallback(
    async (signal?: AbortSignal, pageToken?: string) => {
      if (!pageToken) {
        setIsSearching(false);
        setSearchResult([]);
      }
      setSearchError(null);
      setIsSearching(true);
      setSearchStatus(null);
      try {
        const res = await searchPlaces(
          {
            textQuery: searchInput,
            location: initialLocation
              ? {
                  latitude: initialLocation.latitude,
                  longitude: initialLocation.longitude,
                  radius: 50000,
                }
              : undefined,
            pageToken,
          },
          signal,
        );
        if (
          res.status >= 200 &&
          res.status < 300 &&
          Array.isArray(res.data.places)
        ) {
          if (pageToken) {
            setSearchResult(state => {
              return [
                ...state,
                ...(res.data.places as SearchTextPlacesProps[]),
              ];
            });
          } else {
            setSearchResult(res.data.places);
            setSearchStatus(!res.data.places ? 'ZERO_RESULTS' : 'OK');
          }
          if (res.data.nextPageToken) {
            timeoutReFetchApi.current = setTimeout(() => {
              fetchSearchPlaces(signal, res.data.nextPageToken);
            }, 2000);
          }
          setIsSearching(false);
        } else {
          throw new Error('Failed to retrieve places');
        }
      } catch (e) {
        if (
          (e instanceof Error && e.message !== 'canceled') ||
          (e as ApiError).message
        ) {
          setSearchError((e as ApiError | Error).message);
        }
        setIsSearching(false);
      }
    },
    [initialLocation, searchInput],
  );

  useEffect(() => {
    if (searchInput) {
      fetchSearchPlaces();
      return () => {
        if (timeoutReFetchApi.current) {
          clearTimeout(timeoutReFetchApi.current);
        }
      };
    }
  }, [fetchSearchPlaces, searchInput]);

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
    } else if (controller?.field.value) {
      const [latitude, longitude] = (controller?.field.value as string)
        .split(',')
        .map(s => Number(s.trim()));
      setInitialLocation({latitude, longitude});
      setSelectedLocation({latitude, longitude});
    } else {
      if (permissionAndroid === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(pos => {
          const {latitude, longitude} = pos.coords;
          setInitialLocation({latitude, longitude});
        });
      }
    }
  }, [permissionAndroid, defaultValue, controller?.field.value]);

  const handleSelectPlace = (place: SearchTextPlacesProps) => {
    if (place.location) {
      console.log(place.location);
      const {latitude, longitude} = place.location;
      setInitialLocation({latitude, longitude});
      setSelectedLocation({latitude, longitude});
      setIsSearchModalOpened(false);
      if (onSelectPlace) {
        onSelectPlace(place);
      }
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
              height:
                frame.width < frame.height
                  ? frame.height - 500
                  : frame.width - 100,
              borderRadius: 16,
              paddingTop: SPACING.md,
            }}>
            {isSearching && searchResult.length < 1 ? (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: SPACING.sm,
                }}>
                <LoadingState />
              </View>
            ) : searchError ? (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: SPACING.sm,
                }}>
                <IconState appearance="danger" />
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Typography category="large">Oops!!</Typography>
                  <Typography category="small">{searchError}</Typography>
                </View>
              </View>
            ) : searchResult.length < 1 ? (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: SPACING.sm,
                }}>
                <IconState appearance="info" />

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
                  gap: SPACING.sm,
                }}>
                <IconState appearance="warning" />

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
                            size={TYPOGRAPHY.textStyle.large.lineHeight}
                          />
                          <View style={{flexGrow: 1}}>
                            <Typography category="large">
                              {place.displayName.text}
                            </Typography>
                            <Typography
                              category="small"
                              color={theme['secondary-text']}
                              numberOfLines={1}>
                              {place.formattedAddress}
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
          <KeyboardHeightView />
        </View>
      </EModal>
    </View>
  );
}
