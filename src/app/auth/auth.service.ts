import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map, take } from 'rxjs/operators'
import { User } from '@shared/models'
import { Store } from '@ngrx/store'
import { AppState } from 'src/app/store'
import { Logout } from '@auth/store/auth.actions'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // @ts-ignore
  private _tokenExpirationTimer: NodeJS.Timeout = null

  constructor(private _store: Store<AppState>) { }

  setLogoutTimer(expiresIn: number): void {
    this._tokenExpirationTimer = setTimeout(this.logout.bind(this), expiresIn)
  }

  clearLogoutTimer(): void {
    if (!!this._tokenExpirationTimer) {
      clearTimeout(this._tokenExpirationTimer)
      this._tokenExpirationTimer = null
    }
  }

  logout(): void {
    this._store.dispatch(new Logout())
  }

  get loggedUser(): Observable<User> {
    return this._store
      .select('auth')
      .pipe(
        take(1),
        map(authState => authState.user)
      )
  }

  /**
   * Checks if user is authenticated.
   * @return Observable with True if the user is authenticated.
   */
  get isAuthenticated(): Observable<boolean> {
    return this.loggedUser
      .pipe(map(user => !!user && !!user.token))
  }
}
