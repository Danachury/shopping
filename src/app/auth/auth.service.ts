import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { AuthResponseData, LoginContext, RequestBody } from './auth.model'
import { catchError, tap } from 'rxjs/operators'
import { User } from '@shared/models'

const USER_DATA_KEY = 'userData'
const API_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:'
const API_KEY = 'AIzaSyDNDqTuTaK7kaW_Sp1FDK4wPtfGgYc0aF4'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User = null

  constructor(private _http: HttpClient) {
    const storedData = sessionStorage.getItem(USER_DATA_KEY) || localStorage.getItem(USER_DATA_KEY)
    if (!!storedData) {
      const data = JSON.parse(atob(storedData))
      this.user = new User(data.email, data.id, data._token, new Date(data._tokenExpirationDate))
    }
  }

  login(loginContext: LoginContext): Observable<AuthResponseData> {
    return this._http
      .post<AuthResponseData>(
        `${API_URL}signInWithPassword?key=${API_KEY}`,
        AuthService.requestBody(loginContext))
      .pipe(
        catchError(AuthService.handleError),
        tap(this.handleAuthentication.bind(this))
      )
  }

  signup(loginContext: LoginContext): Observable<AuthResponseData> {
    return this._http
      .post<AuthResponseData>(
        `${API_URL}signUp?key=${API_KEY}`,
        AuthService.requestBody(loginContext))
      .pipe(
        catchError(AuthService.handleError),
        tap(this.handleAuthentication.bind(this))
      )
  }

  logout(): boolean {
    this.user = null
    localStorage.removeItem(USER_DATA_KEY)
    return !this.user
  }

  /**
   * Checks if user is authenticated.
   * @return boolean True if the user is authenticated.
   */
  get isAuthenticated(): boolean {
    return !!this.user && !!this.user.token
  }

  private handleAuthentication(authData: AuthResponseData): void {
    const expirationDate = new Date(new Date().getTime() + +authData.expiresIn * 1000)
    const user = new User(authData.email, authData.localId, authData.idToken, expirationDate)
    localStorage.setItem(USER_DATA_KEY, btoa(JSON.stringify(user)))
    this.user = user
  }

  private static requestBody(loginContext: LoginContext): RequestBody {
    return {
      email: loginContext.email,
      password: loginContext.password,
      returnSecureToken: true
    }
  }

  private static handleError(response: HttpErrorResponse): Observable<never> {
    let errorMsg = 'An unknown error occurred!'
    if (!response.error || !response.error.error)
      return throwError(errorMsg)
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
    }
    return throwError(errorMsg)
  }
}
