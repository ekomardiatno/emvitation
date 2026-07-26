import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/redux/store';
import AppProvider from './src/components/core/AppProvider';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ToastProvider from './src/components/ToastProvider';
import { syncTokensFromStore } from './src/redux/store/rehydrate';
import RootNavigator from './src/RootNavigator';
import { finishAuthCheck } from './src/redux/reducers/auth.reducer';
import ProfileProvider from './src/components/ProfileProvider';
import moment from 'moment';
import 'moment/locale/id';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { APP_GOOGLE_WEB_CLIENT_ID } from './src/config';

GoogleSignin.configure({
  webClientId: APP_GOOGLE_WEB_CLIENT_ID,
});

function App() {
  useEffect(() => {
    moment.locale('id');
  }, []);

  return (
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}
        onBeforeLift={() => {
          syncTokensFromStore();
          store.dispatch(finishAuthCheck());
        }}>
        <SafeAreaProvider>
          <AppProvider>
            <ToastProvider>
              <ProfileProvider>
                <RootNavigator />
              </ProfileProvider>
            </ToastProvider>
          </AppProvider>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
