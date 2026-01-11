import ScreenLayout from '../components/core/ScreenLayout';
import { RADIUS, SPACING } from '../constants';
import { useWindowDimensions, View } from 'react-native';
import { useTheme } from '../components/core/AppProvider';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { PlatformPressable } from '@react-navigation/elements';
import {
  NavigationProp,
  RouteNavigationParamList,
} from '../types/navigation-props';
import Icon from '@react-native-vector-icons/material-icons';

type TemplateRouteProp = RouteProp<RouteNavigationParamList, 'Template'>;

export default function Template({
  route,
}: {
  route?: TemplateRouteProp;
}) {
  const theme = useTheme();
  const {width} = useWindowDimensions();
  const navigation = useNavigation<NavigationProp>();

  return (
    <ScreenLayout
      title={`${route?.params?.action === 'select' ? 'Pilih ' : ''} Template`}>
      <View style={{flexDirection: 'row', gap: 10, flexWrap: 'wrap'}}>
        <View
          style={{
            height: ((width - SPACING.md * 2 - 10) / 2 / 3) * 4,
            width: (width - SPACING.md * 2 - 10) / 2,
            borderRadius: RADIUS.lg,
            borderWidth: 1,
            overflow: 'hidden',
            borderColor: theme['border-default'],
          }}>
          <PlatformPressable
            onPress={() => {
              if (route?.params?.action === 'select') {
                const id = 1;
                if (route?.params?.onSelected) {
                  route.params.onSelected(id);
                }
                navigation.goBack();
              }
            }}
            style={{
              backgroundColor: theme['bg-surface'],
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
            }}>
            <Icon
              name="hide-image"
              color={theme['text-secondary']}
              size={(width - SPACING.md * 2 - 10) / 4}
            />
          </PlatformPressable>
        </View>
      </View>
    </ScreenLayout>
  );
}
