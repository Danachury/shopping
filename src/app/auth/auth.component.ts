import { Component, OnDestroy } from '@angular/core'
import { NgForm } from '@angular/forms'
import { AuthService } from 'src/app/auth/auth.service'
import { AuthResponseData, LoginContext } from 'src/app/auth/auth.model'
import { Logger } from 'src/app/core/logging'
import { Observable, Subscription } from 'rxjs'
import { Router } from '@angular/router'

const logger = new Logger('AuthComponent')

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy {

  isLoading = false
  isLoginMode = true
  error: string = null

  private _authSubs: Subscription

  constructor(private _authService: AuthService,
              private _router: Router) { }

  ngOnDestroy(): void {
    this._authSubs.unsubscribe()
  }

  onSubmit(form: NgForm): void {
    if (form.invalid)
      return

    this.isLoading = true

    let authObs: Observable<AuthResponseData>
    const loginContext = form.value as LoginContext

    if (this.isLoginMode) authObs = this._authService.login(loginContext)
    else authObs = this._authService.signup(loginContext)

    this._authSubs = authObs.subscribe(
      response => {
        logger.debug(response)
        this.isLoading = false
        this._router.navigate(['/recipes'])
      },
      errorMsg => {
        this.error = errorMsg
        this.isLoading = false
      }
    )

    form.reset()
  }

  resetError(): void {
    this.error = null
  }

  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode
  }
}
