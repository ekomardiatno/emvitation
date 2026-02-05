import ScreenLayout from '../../components/core/ScreenLayout';
import { ActivityIndicator, View } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import {
  AppStackNavigationProp,
  AppStackParamList,
} from '../../types/navigation-type';
import useAppNavigation from '../../hooks/useAppNavigation';
import useAppSelector from '../../hooks/useAppSelector';
import TemplateCoverCard from './TemplateCoverCard';
import { useEffect } from 'react';
import useAppDispatch from '../../hooks/useAppDispatch';
import { loadingTemplates } from '../../redux/reducers/template.reducer';
import { useTheme } from '../../components/core/AppProvider';
import { TYPOGRAPHY } from '../../constants';
import { ErrorState } from '../../components/ErrorState';

type TemplateRouteProp = RouteProp<AppStackParamList, 'Template'>;

export default function Template({route}: {route?: TemplateRouteProp}) {
  const navigation = useAppNavigation<AppStackNavigationProp>();
  const {isLoading, templates, error} = useAppSelector(state => state.template);
  const dispatch = useAppDispatch();
  const theme = useTheme();

  useEffect(() => {
    dispatch(loadingTemplates());
  }, [dispatch]);

  return (
    <ScreenLayout
      title={`${route?.params?.action === 'select' ? 'Pilih ' : ''} Template`}>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator
            color={theme['primary-bg']}
            size={TYPOGRAPHY.textStyle.h1.lineHeight}
          />
        </View>
      ) : error ? (
        <ErrorState
          message={error}
          onRetry={() => dispatch(loadingTemplates())}
        />
      ) : (
        <View style={{flexDirection: 'row', gap: 10, flexWrap: 'wrap'}}>
          {templates.map(template => {
            return (
              <TemplateCoverCard
                key={template.id}
                onPress={() => {
                  if (route?.params?.action === 'select') {
                    const id = template.id;
                    navigation.goBack();
                    if (route.params.from === 'WeddingForm') {
                      navigation.navigate(
                        route.params.from,
                        {
                          selectedTemplate: id,
                        },
                        {
                          merge: true,
                        },
                      );
                    }
                  }
                }}
                imageUri={template.previewImagePath}
                selected={route?.params?.selectedTemplate === template.id}
              />
            );
          })}
        </View>
      )}
    </ScreenLayout>
  );
}
