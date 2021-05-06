import { Injectable } from '@angular/core'
import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http'
import { Observable } from 'rxjs'
import { AuthService } from './auth.service'

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private _authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this._authService.isAuthenticated)
      return next.handle(req)
    const clone = req.clone({ params: new HttpParams().set('auth', this._authService.user.token) })
    return next.handle(clone)
  }
}
