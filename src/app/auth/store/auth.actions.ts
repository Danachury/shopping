import { Action } from '@ngrx/store'
import { User } from '@shared/models'
import { LoginContext } from '@auth/auth.model'

export const AUTHENTICATE_SUCCESS = '[Auth] Authenticate Success'
export const AUTHENTICATE_FAIL = '[Auth] Authenticate Fail'
export const SIGNUP_START = '[Auth] Signup Start'
export const LOGIN_START = '[Auth] Login Start'
export const CLEAR_ERROR = '[Auth] Clear Error'
export const AUTO_LOGIN = '[Auth] Auto Login'
export const LOGOUT = '[Auth] Logout'

export class AuthenticateSuccess implements Action {
  readonly type: string = AUTHENTICATE_SUCCESS

  constructor(public payload: { user: User, redirect?: boolean }) { }
}

export class AuthenticateFail implements Action {
  readonly type: string = AUTHENTICATE_FAIL

  constructor(public payload: string) {}
}

export class SignupStart implements Action {
  readonly type: string = SIGNUP_START

  constructor(public payload: LoginContext) {}
}

export class LoginStart implements Action {
  readonly type: string = LOGIN_START

  constructor(public payload: LoginContext) {}
}

export class ClearError implements Action {
  readonly type: string = CLEAR_ERROR
}

export class AutoLogin implements Action {
  readonly type: string = AUTO_LOGIN
}

export class Logout implements Action {
  readonly type: string = LOGOUT
}

export type AuthActions =
  | AuthenticateSuccess
  | AuthenticateFail
  | SignupStart
  | LoginStart
  | ClearError
  | AutoLogin
  | Logout
