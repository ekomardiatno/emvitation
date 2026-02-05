import { PlatformPressable } from '@react-navigation/elements';
import { Image, useWindowDimensions, View } from 'react-native';
import { RADIUS, SPACING, TYPOGRAPHY } from '../../constants';
import { useTheme } from '../../components/core/AppProvider';
import { APP_API_URL } from '../../config';
import MaterialIcons from '@react-native-vector-icons/material-icons';

export default function TemplateCoverCard({
  onPress,
  imageUri,
  selected,
}: {
  onPress: () => void;
  imageUri: string;
  selected?: boolean;
}) {
  const theme = useTheme();
  const {width} = useWindowDimensions();

  return (
    <View
      style={{
        height: ((width - SPACING.md * 2 - 10) / 2 / 3) * 4,
        width: (width - SPACING.md * 2 - 10) / 2,
        borderRadius: RADIUS.lg,
        borderWidth: selected ? 3 : 1,
        overflow: 'hidden',
        borderColor: selected ? theme['primary-bg'] : theme['border-default'],
      }}>
      <PlatformPressable
        onPress={onPress}
        style={{
          backgroundColor: theme['bg-surface'],
          width: '100%',
          height: '100%',
        }}>
        <Image
          source={{
            uri: APP_API_URL + '/file?filePath=' + imageUri,
          }}
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            zIndex: 1,
          }}
          resizeMode="cover"
        />
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <MaterialIcons
            name="hide-image"
            size={TYPOGRAPHY.textStyle.h1.lineHeight}
            color={theme['text-disabled']}
          />
        </View>
      </PlatformPressable>
    </View>
  );
}
