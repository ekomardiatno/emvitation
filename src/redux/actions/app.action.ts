import { APP_APPEARANCE_TYPE } from "../../constants"
import { SET_APPEARANCE_TYPE, SET_AMOUNT_VISIBLE, SET_AUTO_SELECT_APPEARANCE } from "../types"

export const setLightAppearance = () => ({
  type: SET_APPEARANCE_TYPE,
  payload: APP_APPEARANCE_TYPE.LIGHT
})

export const setDarkAppearance = () => ({
  type: SET_APPEARANCE_TYPE,
  payload: APP_APPEARANCE_TYPE.DARK
})

export const setHideAmount = () => ({
  type: SET_AMOUNT_VISIBLE,
  payload: false
})

export const setShowAmount = () => ({
  type: SET_AMOUNT_VISIBLE,
  payload: true
})

export const setAutoSelectAppearance = () => {
  return ({
    type: SET_AUTO_SELECT_APPEARANCE,
    payload: true
  })
}

export const setManualSelectAppearance = () => ({
  type: SET_AUTO_SELECT_APPEARANCE,
  payload: false
})