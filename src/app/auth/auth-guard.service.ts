import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router'
import { Injectable } from '@angular/core'
import { Logger } from 'src/app/core/logging'
import { AuthService } from 'src/app/auth/auth.service'

const logger = new Logger('AppComponent')

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private _authService: AuthService,
              private _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): UrlTree | boolean {
    if (!this._authService.isAuthenticated) {
      logger.info('Not authenticated. Redirecting to /auth..')
      this._authService.logout()
      return this._router.createUrlTree(['/auth'])
    }
    return true
  }
}
