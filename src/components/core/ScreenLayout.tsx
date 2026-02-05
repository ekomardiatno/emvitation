import { useCallback, useEffect } from 'react';
import { BackHandler, ScrollView, TouchableOpacity, View } from 'react-native';
import { useTheme } from './AppProvider';
import Typography from './Typography';
import { useNavigation } from '@react-navigation/native';
import Icon from '@react-native-vector-icons/material-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SPACING } from '../../constants';

export const HEADER_HEIGHT = 70; // Default header height

const TitleComponent = ({title}: {title?: string | React.ReactNode}) => {
  if (!title) {
    return <></>;
  }
  if (typeof title !== 'string') {
    return title;
  }

  return (
    <Typography
      numberOfLines={1}
      style={{
        fontWeight: '600',
      }}
      category="large">
      {title}
    </Typography>
  );
};

export default function ScreenLayout({
  children,
  headerEnabled = true,
  title,
  rightControl,
  onBackPress,
  footer,
  footerContainerNoStyle,
  backButtonDisabled,
  contentVerticalAlign = 'start',
}: {
  children: React.ReactNode;
  headerEnabled?: boolean;
  title?: string | React.ReactNode;
  rightControl?: React.ReactNode;
  onBackPress?: (fnc: () => void) => void;
  footer?: React.ReactNode;
  footerContainerNoStyle?: boolean;
  backButtonDisabled?: boolean;
  contentVerticalAlign?: 'center' | 'start' | 'end';
}) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const goBack = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }, [navigation]);

  useEffect(() => {
    const backAction = () => {
      if (onBackPress && goBack) {
        onBackPress(goBack);
        return true;
      }
    };
    if (onBackPress) {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );
      return () => {
        backHandler.remove();
      };
    }
  }, [goBack, onBackPress]);

  const theme = useTheme();

  return (
    <View
      style={{
        flex: 1,
        // backgroundColor: theme['bg-app'],
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}>
      {headerEnabled && (
        <View>
          <View
            style={{
              height: HEADER_HEIGHT,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingRight: SPACING.md,
            }}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              {navigation.canGoBack() && !backButtonDisabled ? (
                <TouchableOpacity
                  onPress={onBackPress ? () => onBackPress(goBack) : goBack}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      overflow: 'hidden',
                      minWidth: 45,
                      paddingVertical: SPACING.md,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 45,
                      }}>
                      <Icon
                        size={32}
                        name="chevron-left"
                        color={theme['text-primary']}
                      />
                    </View>
                    <View>
                      <TitleComponent title={title} />
                    </View>
                  </View>
                </TouchableOpacity>
              ) : (
                <View style={{paddingLeft: SPACING.md}}>
                  <TitleComponent title={title} />
                </View>
              )}
            </View>
            {rightControl}
          </View>
        </View>
      )}
      <ScrollView
        style={{
          paddingHorizontal: SPACING.md,
          flex: 1,
        }}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: SPACING.md,
          marginTop: !headerEnabled ? SPACING.md : 0,
          justifyContent:
            contentVerticalAlign === 'center'
              ? 'center'
              : contentVerticalAlign === 'end'
              ? 'flex-end'
              : undefined,
        }}>
        {children}
      </ScrollView>
      {footer && (
        <>
          {footerContainerNoStyle ? (
            footer
          ) : (
            <View
              style={{
                backgroundColor: theme['bg-surface'],
                padding: SPACING.md,
              }}>
              {footer}
            </View>
          )}
        </>
      )}
    </View>
  );
}
