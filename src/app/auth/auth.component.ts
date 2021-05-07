import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from '@angular/core'
import { NgForm } from '@angular/forms'
import { AuthService } from 'src/app/auth/auth.service'
import { AuthResponseData, LoginContext } from 'src/app/auth/auth.model'
import { Logger } from 'src/app/core/logging'
import { Observable, Subscription } from 'rxjs'
import { Router } from '@angular/router'
import { DialogAlertComponent } from '@shared/components'
import { PlaceholderDirective } from '@shared/directives'

const logger = new Logger('AuthComponent')

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy {

  @ViewChild(PlaceholderDirective)
  private _alertHost: PlaceholderDirective

  isLoading = false
  isLoginMode = true
  error: string = null

  private _authSubs: Subscription
  private _alertSubs: Subscription

  constructor(private _authService: AuthService,
              private _router: Router,
              private _compFactoryResolver: ComponentFactoryResolver) { }

  ngOnDestroy(): void {
    this._authSubs?.unsubscribe()
    this._alertSubs?.unsubscribe()
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
        // this.showErrorAlert(errorMsg)
        this.isLoading = false
      }
    )

    form.reset()
  }

  resetError(): void {
    this.error = null
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * Create programmatically error alert
   * @param errorMsg message to be shown
   */
  showErrorAlert(errorMsg: string): void {
    const alertCompFactory = this._compFactoryResolver.resolveComponentFactory(DialogAlertComponent)
    const hostViewContainerRef = this._alertHost.viewContainerRef
    hostViewContainerRef.clear()
    const componentRef = hostViewContainerRef.createComponent(alertCompFactory)
    componentRef.instance.message = errorMsg
    this._alertSubs = componentRef.instance.closed
      .subscribe(() => {
        this.resetError()
        hostViewContainerRef.clear()
        this._alertSubs.unsubscribe()
      })
  }

  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode
  }
}
