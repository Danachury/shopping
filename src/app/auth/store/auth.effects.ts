import { Actions, createEffect, ofType } from '@ngrx/effects'
import {
  AUTHENTICATE_SUCCESS,
  AuthenticateFail,
  AuthenticateSuccess,
  AUTO_LOGIN,
  LOGIN_START,
  LoginStart,
  Logout,
  LOGOUT,
  SIGNUP_START,
  SignupStart
} from './auth.actions'
import { catchError, map, switchMap, tap } from 'rxjs/operators'
import { AuthResponseData, LoginContext, RequestBody } from '@auth/auth.model'
import { environment } from '@env/environment'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { User } from '@shared/models'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Logger } from '@core/logging'
import { AuthService } from '../auth.service'

const logger = new Logger('AuthEffects')
const USER_DATA_KEY = 'userData'

// noinspection JSUnusedGlobalSymbols
@Injectable()
export class AuthEffects {

  login$ = createEffect(() =>
    this._actions$
      .pipe(
        ofType(LOGIN_START),
        switchMap(this.login.bind(this))
      )
  )

  signup$ = createEffect(() =>
    this._actions$
      .pipe(
        ofType(SIGNUP_START),
        switchMap(this.signup.bind(this))
      )
  )

  redirect$ = createEffect(
    () => this._actions$
      .pipe(
        ofType(AUTHENTICATE_SUCCESS),
        tap((action: AuthenticateSuccess) => {
          if (!!action.payload.redirect)
            this._router.navigate(['/'])
        })
      ),
    { dispatch: false }
  )

  autoLogin$ = createEffect(
    // @ts-ignore. Use this suppress to avoid compilation error
    () => this._actions$
      .pipe(
        ofType(AUTO_LOGIN),
        map(this.autoLogin.bind(this))
      )
  )

  logout$ = createEffect(
    () => this._actions$
      .pipe(
        ofType(LOGOUT),
        tap(this.logout.bind(this))
      ),
    { dispatch: false }
  )

  constructor(private _http: HttpClient,
              private _actions$: Actions,
              private _router: Router,
              private _authService: AuthService) { }

  login(start: LoginStart): Observable<AuthenticateSuccess | AuthenticateFail> {
    // @ts-ignore. Use this suppress to avoid compilation error
    return this._http
      .post<AuthResponseData>(
        `${environment.firebaseHost}accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
        AuthEffects.requestBody(start.payload)
      )
      .pipe(
        map(this.handleAuthentication.bind(this)),
        catchError(AuthEffects.handleError)
      )
  }

  signup(start: SignupStart): Observable<AuthenticateSuccess | AuthenticateFail> {
    // @ts-ignore. Use this suppress to avoid compilation error
    return this._http
      .post<AuthResponseData>(
        `${environment.firebaseHost}accounts:signUp?key=${environment.firebaseAPIKey}`,
        AuthEffects.requestBody(start.payload)
      )
      .pipe(
        map(this.handleAuthentication.bind(this)),
        catchError(AuthEffects.handleError)
      )
  }

  autoLogin(): AuthenticateSuccess | Logout {
    const storedData = sessionStorage.getItem(USER_DATA_KEY) || localStorage.getItem(USER_DATA_KEY)
    if (!storedData)
      return new Logout()
    const data = JSON.parse(atob(storedData))
    const loggedUser = new User(data.email, data.id, data._token, new Date(data._tokenExpirationDate))
    const expiresIn = new Date(data._tokenExpirationDate).getTime() - new Date().getTime()
    this._authService.setLogoutTimer(expiresIn)
    logger.debug(`Auto logging in User : ${loggedUser.email}`)
    return new AuthenticateSuccess({ user: loggedUser })
  }

  logout(): void {
    localStorage.removeItem(USER_DATA_KEY)
    this._authService.clearLogoutTimer()
    this._router.navigate(['/auth'])
  }

  private handleAuthentication(authData: AuthResponseData): AuthenticateSuccess {
    const expiresIn = +authData.expiresIn * 1000
    const expirationDate = new Date(new Date().getTime() + expiresIn)
    const loggedUser = new User(authData.email, authData.localId, authData.idToken, expirationDate)
    localStorage.setItem(USER_DATA_KEY, btoa(JSON.stringify(loggedUser)))
    this._authService.setLogoutTimer(expiresIn)
    return new AuthenticateSuccess({ user: loggedUser, redirect: true })
  }

  private static requestBody(loginContext: LoginContext): RequestBody {
    return {
      email: loginContext.email,
      password: loginContext.password,
      returnSecureToken: true
    }
  }

  private static handleError(response: HttpErrorResponse): Observable<AuthenticateFail> {
    let errorMsg = 'An unknown error occurred!'
    if (!response.error || !response.error.error)
      return of(new AuthenticateFail(errorMsg))
    switch (response.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMsg = 'Email already exists!'
        break
      case 'EMAIL_NOT_FOUND':
        errorMsg = 'Email does not exist.'
        break
      case 'INVALID_PASSWORD':
        errorMsg = 'Password is not correct.'
        break
      case 'USER_DISABLED':
        errorMsg = 'User does not has permissions to access.'
        break
      default:
        break
    }
    return of(new AuthenticateFail(errorMsg))
  }
}
