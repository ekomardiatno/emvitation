import { configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import persistedAuthReducer from '../reducers/auth.reducer';
import persitedProfileReducer from '../reducers/profile.reducer';
import persistedTemplateReducer from '../reducers/template.reducer';
import persistedWeddingReducer from '../reducers/wedding.reducer';
import persistedEventReducer from '../reducers/event.reducer';
import persistedGuestReducer from '../reducers/guest.reducer';
import persistedVendorReducer from '../reducers/vendor.reducer';

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    profile: persitedProfileReducer,
    template: persistedTemplateReducer,
    wedding: persistedWeddingReducer,
    event: persistedEventReducer,
    guest: persistedGuestReducer,
    vendor: persistedVendorReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      immutableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
