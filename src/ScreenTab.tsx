import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Home from './screens/Home';
import Profile from './screens/Profile';
import { useTheme } from './components/core/AppProvider';
import { View } from 'react-native';
import { PlatformPressable } from '@react-navigation/elements';
import { useLinkBuilder } from '@react-navigation/native';
import Icon from '@react-native-vector-icons/material-icons';
import { MaterialIconsType } from './types/material-icons';
import { SPACING } from './constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

function MyTabBar({state, descriptors, navigation}: BottomTabBarProps) {
  const theme = useTheme();
  const {buildHref} = useLinkBuilder();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: theme['bg-surface'],
        paddingHorizontal: SPACING.md,
        paddingBottom: insets.bottom,
        borderTopColor: theme.divider,
        borderTopWidth: 1,
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        let iconName: MaterialIconsType = 'home-filled';
        switch (route.name.replace('Tab', '')) {
          case 'Home':
            iconName = 'home-filled';
            break;
          case 'Bill':
            iconName = 'receipt';
            break;
          case 'Wallet':
            iconName = 'account-balance-wallet';
            break;
          case 'Profile':
            iconName = 'account-circle';
        }

        return (
          <PlatformPressable
            key={index}
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            pressColor={'rgba(0,0,0,0)'}
            pressOpacity={1}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              flexDirection: 'column',
              alignItems: 'center',
              borderBottomColor: 'transparent',
              gap: 3,
            }}>
            <View
              style={{
                width: 50,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon
                name={iconName}
                color={isFocused ? theme['primary-bg'] : theme['text-primary']}
                size={22}
              />
            </View>
          </PlatformPressable>
        );
      })}
    </View>
  );
}

export default function ScreenTab() {
  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme['bg-surface'],
      }}>
      <Tab.Navigator
        tabBar={props => <MyTabBar {...props} />}
        screenOptions={{
          headerShown: false,
          animation: 'shift',
        }}>
        <Tab.Screen name="HomeTab" component={Home} />
        {/* <Tab.Screen name="BillTab" component={Bill} />
        <Tab.Screen name="WalletTab" component={Wallet} /> */}
        <Tab.Screen name="ProfileTab" component={Profile} />
      </Tab.Navigator>
    </View>
  );
}
