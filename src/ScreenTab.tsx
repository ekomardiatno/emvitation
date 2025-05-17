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
import Typography from "./components/core/Typography"
import { MasterialIconsType } from "./types/material-icons"
import { GUTTER_SPACE } from "./constants"

const Tab = createBottomTabNavigator()

function MyTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const theme = useTheme()
  const { buildHref } = useLinkBuilder()

  return (
    <View style={{ flexDirection: 'row', backgroundColor: theme.backgroundBasicColor1, gap: 5, paddingHorizontal: GUTTER_SPACE, borderTopWidth: 1, borderTopColor: theme.borderBasicColor2 }}>
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
            iconName = 'account-balance-wallet'
            break
          case 2:
            iconName = 'account-circle'
        }

        return (
          <PlatformPressable
            key={index}
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, paddingVertical: 8, flexDirection: 'column', alignItems: 'center', borderTopWidth: 2, marginTop: -1, borderTopColor: isFocused ? theme.colorPrimaryDefault : 'transparent', borderBottomColor: 'transparent', gap: 3 }}
          >
            <Icon name={iconName} color={isFocused ? theme.colorPrimaryDefault : theme.textHintColor} size={20} />
            {
              typeof label === 'string' ?
                <Typography numberOfLines={1} size={11} style={{ color: isFocused ? theme.colorPrimaryDefault : theme.textHintColor, textAlign: 'center' }}>
                  {label}
                </Typography>
                : null
            }
          </PlatformPressable>
        )
      })}
    </View>
  )
}

export default function ScreenTab(): JSX.Element {
  return (
    <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />} screenOptions={{
      headerShown: false,
    }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Wallet" component={Wallet} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  )
}