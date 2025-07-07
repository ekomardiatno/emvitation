import { JSX } from "react"
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from "./screens/Home"
import Wallet from "./screens/Wallet"
import Profile from "./screens/Profile"
import { useTheme } from "./components/core/AppProvider"
import { View } from "react-native"
import { PlatformPressable } from "@react-navigation/elements"
import { useLinkBuilder } from "@react-navigation/native"
import Icon from "@react-native-vector-icons/material-icons"
import { MasterialIconsType } from "./types/material-icons"
import { GUTTER_SPACE } from "./constants"
import Bill from "./screens/Bill"
import { useSafeAreaInsets } from "react-native-safe-area-context"

const Tab = createBottomTabNavigator()

function MyTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const theme = useTheme()
  const { buildHref } = useLinkBuilder()
  const insets = useSafeAreaInsets()

  return (
    <View style={{ flexDirection: 'row', backgroundColor: theme.backgroundBasicColor1, paddingHorizontal: GUTTER_SPACE, borderTopWidth: 1, borderTopColor: theme.borderBasicColor2, paddingBottom: insets.bottom }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name

        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params)
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          })
        }

        let iconName: MasterialIconsType = 'home-filled'
        switch(index) {
          case 1:
            iconName = 'receipt'
            break
          case 2:
            iconName = 'account-balance-wallet'
            break
          case 3:
            iconName = 'account-circle'
        }

        return (
          <PlatformPressable
            key={index}
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            pressColor={theme.backgroundBasicColor2}
            pressOpacity={1}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, paddingVertical: 6, flexDirection: 'column', alignItems: 'center', borderTopWidth: 2, marginTop: -1, borderTopColor: isFocused ? theme.colorPrimaryDefault : 'transparent', borderBottomColor: 'transparent', gap: 3 }}
          >
            <View style={{ width: 50, height: 50, borderRadius: 50, backgroundColor: isFocused ? theme.backgroundPrimaryColor3 : theme.backgroundBasicColor3, alignItems: 'center', justifyContent: 'center' }}>
              <Icon name={iconName} color={isFocused ? theme.backgroundPrimaryColor6 : theme.textHintColor} size={22} />
            </View>
            {/* {
              typeof label === 'string' ?
                <Typography numberOfLines={1} size={11} style={{ color: isFocused ? theme.colorPrimaryDefault : theme.textHintColor, textAlign: 'center' }}>
                  {label}
                </Typography>
                : null
            } */}
          </PlatformPressable>
        )
      })}
    </View>
  )
}

export default function ScreenTab(): JSX.Element {
  const insets = useSafeAreaInsets()
  const theme = useTheme()
  return (
    <View style={{ flex: 1, paddingTop: insets.top, backgroundColor: theme.backgroundBasicColor0 }}>
      <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />} screenOptions={{
        headerShown: false,
        animation: 'shift'
      }}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Bill" component={Bill} />
        <Tab.Screen name="Wallet" component={Wallet} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </View>
  )
}