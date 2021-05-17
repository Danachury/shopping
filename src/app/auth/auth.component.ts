import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { NgForm } from '@angular/forms'
import { LoginContext } from '@auth/auth.model'
import { Subscription } from 'rxjs'
import { DialogAlertComponent } from '@shared/components'
import { PlaceholderDirective } from '@shared/directives'
import { Store } from '@ngrx/store'
import { AppState } from 'src/app/store'
import * as AuthActions from '@auth/store'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy {

  @ViewChild(PlaceholderDirective)
  private _alertHost: PlaceholderDirective

  isLoading = false
  isLoginMode = true
  error: string = null

  private _authSubs: Subscription
  private _alertSubs: Subscription

  constructor(private _store: Store<AppState>,
              private _compFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    this._authSubs = this._store
      .select('auth')
      .subscribe(state => {
        this.isLoading = state.isLoading
        this.error = state.authError
      })
  }

  ngOnDestroy(): void {
    this._authSubs?.unsubscribe()
    this._alertSubs?.unsubscribe()
  }

  onSubmit(form: NgForm): void {
    if (form.invalid)
      return

    const loginContext = form.value as LoginContext

    if (this.isLoginMode)
      this._store.dispatch(new AuthActions.LoginStart(loginContext))
    else
      this._store.dispatch(new AuthActions.SignupStart(loginContext))

    form.reset()
  }

  resetError(): void {
    this._store.dispatch(new AuthActions.ClearError())
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
