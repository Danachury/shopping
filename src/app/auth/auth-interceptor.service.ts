import { Injectable } from '@angular/core'
import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http'
import { Observable } from 'rxjs'
import { AuthService } from './auth.service'
import { exhaustMap, mergeMap } from 'rxjs/operators'

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private _authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const handleHeadersRequest = () => this._authService
      .loggedUser
      .pipe(
        exhaustMap(user => {
          const update = { params: new HttpParams().set('auth', user.token) }
          return next.handle(req.clone(update))
        })
      )
    return this._authService
      .isAuthenticated
      .pipe(mergeMap(isAuthenticated => isAuthenticated ? handleHeadersRequest() : next.handle(req)))
  }
}
