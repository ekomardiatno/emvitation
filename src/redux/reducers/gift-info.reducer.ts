import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GiftInfoDataType } from '../../types/gift-info-type';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState: {
  giftInfos: GiftInfoDataType[];
} = {
  giftInfos: [],
};

const giftInfoSlice = createSlice({
  name: 'giftInfo',
  initialState,
  reducers: {
    patchGiftInfo: (state, action: PayloadAction<GiftInfoDataType>) => {
      state.giftInfos = state.giftInfos.map(w => {
        if (w.id === action.payload.id) {
          return {
            ...w,
            ...action.payload,
          };
        }
        return w;
      });
    },
    pushGiftInfo: (state, action: PayloadAction<GiftInfoDataType>) => {
      if (state.giftInfos.findIndex(g => g.id === action.payload.id) > -1) {
        state.giftInfos = state.giftInfos.map(g => {
          if (g.id === action.payload.id) {
            return {
              ...g,
              ...action.payload,
            };
          }
          return g;
        });
      } else {
        state.giftInfos.push(action.payload);
      }
    },
    pushGiftInfos: (state, action: PayloadAction<GiftInfoDataType[]>) => {
      action.payload.forEach(giftInfo => {
        if (state.giftInfos.findIndex(g => g.id === giftInfo.id) === -1) {
          state.giftInfos.push(giftInfo);
        } else {
          state.giftInfos = state.giftInfos.map(g => {
            if (g.id === giftInfo.id) {
              return {
                ...g,
                ...giftInfo,
              };
            }
            return g;
          });
        }
      });
    },
    removeGiftInfo: (state, action: PayloadAction<string>) => {
      state.giftInfos = state.giftInfos.filter(g => g.id !== action.payload);
    },
    resetGiftInfos: state => {
      state.giftInfos = [];
    },
  },
});

const giftInfoReducer = giftInfoSlice.reducer;
const persistedGiftInfoReducer = persistReducer(
  {
    key: 'giftInfo',
    storage: AsyncStorage,
    whitelist: ['giftInfos'],
  },
  giftInfoReducer,
);

export const {
  patchGiftInfo,
  pushGiftInfo,
  pushGiftInfos,
  resetGiftInfos,
  removeGiftInfo,
} = giftInfoSlice.actions;

export default persistedGiftInfoReducer;
