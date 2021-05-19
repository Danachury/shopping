import { User } from '@shared/models'
import {
  AuthActions,
  AUTHENTICATE_FAIL,
  AUTHENTICATE_SUCCESS,
  AuthenticateFail,
  AuthenticateSuccess,
  CLEAR_ERROR,
  LOGIN_START,
  LOGOUT,
  SIGNUP_START
} from './auth.actions'

export interface State {
  user: User
  authError?: string
  isLoading?: boolean
}

const initialState: State = {
  user: null
}

export const authReducer = (state: State = initialState, action: AuthActions) => {
  switch (action.type) {
    case AUTHENTICATE_SUCCESS:
      return {
        ...state,
        user: (action as AuthenticateSuccess).payload.user,
        isLoading: false
      }
    case AUTHENTICATE_FAIL:
      return {
        ...state,
        user: null,
        authError: (action as AuthenticateFail).payload,
        isLoading: false
      }
    case SIGNUP_START:
      return {
        ...state,
        authError: null,
        isLoading: true
      }
    case LOGIN_START:
      return {
        ...state,
        authError: null,
        isLoading: true
      }
    case CLEAR_ERROR:
      return {
        ...state,
        authError: null
      }
    case LOGOUT:
      return {
        ...state,
        user: null
      }
    default:
      return state
  }
}
