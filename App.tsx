/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import Navigation from './src/Navigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/redux/store';
import AppProvider from './src/components/core/AppProvider';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ToastProvider from './src/components/ToastProvider';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppProvider>
          <SafeAreaProvider>
            <ToastProvider>
              <Navigation />
            </ToastProvider>
          </SafeAreaProvider>
        </AppProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
