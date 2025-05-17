import { SET_APPEARANCE_TYPE, SET_AMOUNT_VISIBLE, SET_AUTO_SELECT_APPEARANCE } from "../types"
import { APP_APPEARANCE_TYPE } from "../../constants"
import { PayloadAction } from "@reduxjs/toolkit"
import persistReducer from "redux-persist/es/persistReducer"
import persistConfig from "../persistConfig"

const initialState = {
  appearanceType: APP_APPEARANCE_TYPE.LIGHT,
  amountVisibility: true,
  autoSelectAppearance: true
}

const appReducer = (state = initialState, action: PayloadAction<string | boolean>) => {
  const { type, payload } = action
  switch (type) {
    case SET_APPEARANCE_TYPE:
      if(typeof payload === 'string') {
        return {
          ...state,
          appearanceType: payload
        }
      }
    case SET_AUTO_SELECT_APPEARANCE:
      if(typeof payload === 'boolean') {
        return {
          ...state,
          autoSelectAppearance: payload
        }
      }
    case SET_AMOUNT_VISIBLE:
      if(typeof payload === 'boolean') {
        return {
          ...state,
          amountVisibility: payload
        }
      }
    default:
      return state
  }
}

export default persistReducer(persistConfig, appReducer)