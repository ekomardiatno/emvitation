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
import persistedAuthReducer, { logout } from '../reducers/auth.reducer';
import persitedProfileReducer, {
  resetProfile,
} from '../reducers/profile.reducer';
import persistedTemplateReducer, {
  resetTemplates,
} from '../reducers/template.reducer';
import persistedWeddingReducer, {
  resetWeddings,
} from '../reducers/wedding.reducer';
import persistedEventReducer, { resetEvents } from '../reducers/event.reducer';
import persistedGuestReducer, { resetGuests } from '../reducers/guest.reducer';
import persistedVendorReducer, { resetVendors } from '../reducers/vendor.reducer';
import persistedGiftInfoReducer, {
  resetGiftInfos,
} from '../reducers/gift-info.reducer';
import persistedRsvpReducer, { resetRsvp } from '../reducers/rsvp.reducer';
import persistedWishReducer, { resetWishes } from '../reducers/wish.reducer';

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    profile: persitedProfileReducer,
    template: persistedTemplateReducer,
    wedding: persistedWeddingReducer,
    event: persistedEventReducer,
    guest: persistedGuestReducer,
    vendor: persistedVendorReducer,
    giftInfo: persistedGiftInfoReducer,
    rsvp: persistedRsvpReducer,
    wish: persistedWishReducer,
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

export function resetAppState(dispatch: AppDispatch) {
  dispatch(logout());
  dispatch(resetEvents());
  dispatch(resetGiftInfos());
  dispatch(resetGuests());
  dispatch(resetProfile());
  dispatch(resetTemplates());
  dispatch(resetVendors());
  dispatch(resetWeddings());
  dispatch(resetWishes());
  dispatch(resetRsvp());
}

export const persistor = persistStore(store);
