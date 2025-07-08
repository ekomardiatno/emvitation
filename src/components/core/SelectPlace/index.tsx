import { JSX, useEffect, useRef, useState } from "react"
import { PermissionsAndroid, PermissionStatus, ScrollView, TouchableHighlight, View } from "react-native"
import MapView, { Marker } from "react-native-maps"
import { useTheme } from "../AppProvider"
import { GUTTER_SPACE } from "../../../constants"
import Geolocation from "@react-native-community/geolocation"
import Icon from "@react-native-vector-icons/material-icons"
import Button from "../Button"
import FieldLabel from "../FieldLabel"
import EModal from "../EModal"
import Input from "../Input"
import * as yup from 'yup'
import { Control, FieldValue, useController, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useSafeAreaFrame, useSafeAreaInsets } from "react-native-safe-area-context"
import Typography from "../Typography"
import ControlProps from "../ControlProps"
import capitalizeFirstText from "../../../utils/capitalizeFirstText"
import { PlacesSearchStatusType, PlacesTextSearchResponseType, PlaceType } from "../../../types/google-place-type"
import useWindowHeightOnKeyboard from "../../../hooks/useWindowHeightOnKeyboard"

const searchSchema = yup.object({
  search_input: yup.string()
})

const LATITUDE_DELTA = 0.01
const LONGITUDE_DELTA = 0.01

export default function SelectPlace({ label, required, name, defaultValue, control, placeholderSearch }: Omit<ControlProps, 'control' | 'name'> & {
  control?: Control<FieldValue<any>, any, FieldValue<any>>
  name?: string
  placeholderSearch?: string
}): JSX.Element {
  const { control: searchControl, handleSubmit, getValues, setValue } = useForm({
    resolver: yupResolver(searchSchema)
  })
  const controller = (name && control) ? useController({
    control,
    defaultValue,
    name
  }) : null
  let prevDefaultValue = useRef<string | null | undefined>(defaultValue).current
  const mapRef = useRef<MapView>(null)
  const { keyboardHeight } = useWindowHeightOnKeyboard()

  const theme = useTheme()
  const [initialLocation, setInitialLocation] = useState<{
    latitude: number
    longitude: number
  } | null>(null)
  const [permissionAndroid, setPermissionAndroid] = useState<PermissionStatus | null>(null)
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number
    longitude: number
  } | null>(null)
  const [searchInput, setSearchInput] = useState<string>('')
  const [isSearchModalOpened, setIsSearchModalOpened] = useState<boolean>(false)
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [searchResult, setSearchResult] = useState<null | PlaceType[]>(null)
  const [searchStatus, setSearchStatus] = useState<PlacesSearchStatusType | null>(null)
  const [searchError, setSearchError] = useState<TypeError | Error | null>(null)
  const [isLoadingMap, setIsLoadingMap] = useState<boolean>(false)
  const frame = useSafeAreaFrame()
  const insets = useSafeAreaInsets()

  useEffect(() => {
    const requestPermission = async () => {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      )
      setPermissionAndroid(granted)
    }
    requestPermission()
  }, [])

  let timeoutSearch = useRef<ReturnType<typeof setTimeout> | null>(null).current
  const handleChangeSearchText = (str: string) => {
    if (timeoutSearch) clearTimeout(timeoutSearch)
    timeoutSearch = setTimeout(() => {
      setSearchInput(str)
    }, 800)
  }

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null
    const fetchApi = async (pageToken?: string) => {
      if (!pageToken) {
        setIsSearching(true)
        setSearchResult(null)
      }
      setSearchError(null)
      try {
        const search = new URLSearchParams()
        if (pageToken) {
          search.append('pagetoken', pageToken)
        } else {
          search.append('query', searchInput)
          if (initialLocation) {
            search.append('location', `${initialLocation.latitude},${initialLocation.longitude}`)
          }
        }
        const result = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?${search}`)
        if (result.status === 200) {
          const json = (await result.json()) as PlacesTextSearchResponseType
          setSearchStatus(json.status)
          if (json.status === 'OK' || json.status === 'ZERO_RESULTS') {
            if (pageToken) {
              setSearchResult(state => {
                if (state) return [...state, ...json.results]
                return json.results
              })
            } else {
              setSearchResult(json.results)
            }
            if (json.next_page_token) {
              timeout = setTimeout(() => {
                fetchApi(json.next_page_token)
                console.log('triggered')
              }, 2000)
            }
          } else if (json.status === 'INVALID_REQUEST' && pageToken) {
            timeout = setTimeout(() => {
              fetchApi(pageToken)
            }, 2000)
          } else {
            throw new Error(json.status)
          }
        } else {
          throw new Error(result.statusText)
        }
      } catch (e) {
        if (e instanceof TypeError) {
          setSearchError(e)
        } else if (e instanceof Error) {
          setSearchError(e)
        }
      } finally {
        setIsSearching(false)
      }
    }
    if (searchInput) {
      fetchApi()
      return () => {
        if (timeout) clearTimeout(timeout)
      }
    }
  }, [searchInput, initialLocation])

  useEffect(() => {
    if (defaultValue && /^[-+]?([1-8]?\d(?:\.\d+)?|90(?:\.0+)?),\s*[-+]?((1[0-7]\d|0?\d{1,2})(?:\.\d+)?|180(?:\.0+)?)$/.test(defaultValue)) {
      const [latitude, longitude] = defaultValue.split(',').map(s => Number(s.trim()))
      setInitialLocation({ latitude, longitude })
      setSelectedLocation({ latitude, longitude })
      mapRef.current?.animateToRegion({
        latitude,
        longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      })
    } else {
      if (permissionAndroid === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(pos => {
          const { latitude, longitude } = pos.coords
          setInitialLocation({ latitude, longitude })
          mapRef.current?.animateToRegion({
            latitude,
            longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          })
        })
      }
    }
  }, [permissionAndroid, defaultValue])

  const handleSelectPlace = (place: PlaceType) => {
    if (place.geometry?.location) {
      const { lat, lng } = place.geometry?.location
      mapRef.current?.animateToRegion({
        latitude: lat,
        longitude: lng,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      })
      setInitialLocation({ latitude: lat, longitude: lng })
      setSelectedLocation({ latitude: lat, longitude: lng })
      setIsSearchModalOpened(false)
    }
  }

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null
    if (isLoadingMap) {
      timeout = setTimeout(() => {
        setIsLoadingMap(false)
      }, 0)
      return () => {
        if (timeout) clearTimeout(timeout)
      }
    }
  }, [isLoadingMap])

  useEffect(() => {
    if (theme.googleMapStyle) {
      setIsLoadingMap(true)
    }
  }, [theme.googleMapStyle])

  useEffect(() => {
    if (selectedLocation) {
      controller?.field.onChange(`${selectedLocation.latitude}, ${selectedLocation.longitude}`)
    }
  }, [selectedLocation])

  return (
    <View>
      {
        label &&
        <FieldLabel label={label} required={required} />
      }
      <View style={{ position: 'relative', borderWidth: 1, borderColor: controller?.formState.errors && name && controller.formState.errors[name] ? theme.borderDangerColor4 : theme.borderBasicColor1, borderRadius: GUTTER_SPACE, overflow: 'hidden', width: '100%', height: 300 }}>
        {
          (!isLoadingMap && initialLocation) && (
            <MapView
              ref={mapRef}
              style={{ width: '100%', height: '100%' }}
              initialRegion={{
                latitude: initialLocation.latitude,
                longitude: initialLocation.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LATITUDE_DELTA
              }}
              onRegionChange={e => {
                setInitialLocation({
                  latitude: e.latitude,
                  longitude: e.longitude
                })
              }}
              onPress={e => {
                const { latitude, longitude } = e.nativeEvent.coordinate
                setSelectedLocation({ latitude, longitude })
              }}
              onPoiClick={e => {
                const { latitude, longitude } = e.nativeEvent.coordinate
                setSelectedLocation({ latitude, longitude })
              }}
              customMapStyle={theme.googleMapStyle}
            >
              {
                selectedLocation && (
                  <Marker draggable onDragEnd={e => {
                    const { latitude, longitude } = e.nativeEvent.coordinate
                    setSelectedLocation({ latitude, longitude })
                  }} coordinate={selectedLocation} />
                )
              }
            </MapView>
          )
        }
        <View style={{ position: 'absolute', right: GUTTER_SPACE / 2, top: GUTTER_SPACE / 2, zIndex: 1 }}>
          <Button onPress={() => {
            setIsSearchModalOpened(true)
          }} style={{ backgroundColor: theme.backgroundPrimaryColor1, paddingVertical: 5, paddingHorizontal: 5, borderRadius: GUTTER_SPACE - GUTTER_SPACE / 2 }} appearance="transparent">
            <Icon color={theme.textBasicColor} size={20} name="search" />
          </Button>
        </View>
      </View>
      {
        (controller?.formState.errors && name) && (
          (controller?.formState.errors[name] && typeof controller?.formState.errors[name].message === 'string') &&
          <Typography category='c1' style={{ marginTop: 5, textAlign: 'center' }} color={theme.textDangerColor}>{capitalizeFirstText(controller?.formState.errors[name].message)}</Typography>
        )
      }
      <EModal visible={isSearchModalOpened} onClose={() => setIsSearchModalOpened(false)}>
        <View style={{ backgroundColor: theme.backgroundBasicColor1, width: '100%', height: frame.width < frame.height ? 500 - keyboardHeight / 2 : frame.width - 100, paddingHorizontal: GUTTER_SPACE, paddingVertical: GUTTER_SPACE, borderTopLeftRadius: GUTTER_SPACE, borderTopRightRadius: GUTTER_SPACE }}>
          <View style={{ position: 'relative' }}>
            <Input name="search_input" placeholder={placeholderSearch ?? "Cari Tempat"} control={searchControl} onChangeText={handleChangeSearchText} inputStyle={{ paddingRight: 40 }} />
            <View style={{ position: 'absolute', top: 0, right: 0, height: '100%', alignItems: 'center', justifyContent: 'center', width: 40 }}>
              <Icon name="search" color={theme.textBasicColor} size={20} />
            </View>
          </View>
          <View style={{ overflow: 'hidden', flex: 1, borderRadius: 16, paddingTop: GUTTER_SPACE }}>
            {
              isSearching ?
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <Icon name="location-searching" color={theme.backgroundPrimaryColor4} size={80} />
                  <View style={{ alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                    <Typography style={{ fontWeight: '600' }}>Mencari...</Typography>
                  </View>
                </View>
                :
                searchError ?
                  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                    <Icon name="error" color={theme.backgroundDangerColor4} size={80} />
                    <View style={{ alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                      <Typography style={{ fontWeight: '600' }}>Ada kesalahan</Typography>
                      <Typography color={theme.textSecondaryColor}>Silakan coba lagi nanti</Typography>
                    </View>
                  </View>
                  :
                  !searchResult ?
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                      <Icon name="location-city" color={theme.backgroundPrimaryColor4} size={80} />
                      <View style={{ alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                        <Typography style={{ fontWeight: '600' }}>Temukan lokasi</Typography>
                        <Typography color={theme.textSecondaryColor}>Cari tempat familiar di sekitar lokasi</Typography>
                      </View>
                    </View>
                    :
                    (searchStatus === 'ZERO_RESULTS') ?
                      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                        <Icon name="wrong-location" color={theme.textHintColor} size={80} />
                        <View style={{ alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                          <Typography style={{ fontWeight: '600' }}>Tempat tidak ditemukan</Typography>
                          <Typography color={theme.textSecondaryColor}>Coba gunakan kata kunci lain</Typography>
                        </View>
                      </View>
                      :
                      <ScrollView>
                        <View style={{ gap: GUTTER_SPACE }}>
                          {
                            searchResult?.map((place, i) => {
                              return (
                                <TouchableHighlight key={i} underlayColor={theme.backgroundBasicColor3} style={{ borderRadius: 16, backgroundColor: theme.backgroundBasicColor2 }} onPress={() => { handleSelectPlace(place) }}>
                                  <View style={{ padding: GUTTER_SPACE, borderRadius: 16, backgroundColor: theme.backgroundBasicColor2, flexDirection: 'row', gap: 8 }}>
                                    <Icon name="place" color={theme.textHintColor} size={26} />
                                    <View style={{ flex: 1 }}>
                                      <Typography category="h6">{place.name}</Typography>
                                      <Typography color={theme.textSecondaryColor} numberOfLines={1}>{place.formatted_address}</Typography>
                                    </View>
                                  </View>
                                </TouchableHighlight>
                              )
                            })
                          }
                        </View>
                      </ScrollView>
            }
          </View>
        </View>
      </EModal>
    </View>
  )
}