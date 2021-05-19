import { Component } from '@angular/core'
import { AuthService } from '@auth/auth.service'
import { Store } from '@ngrx/store'
import { AppState } from 'src/app/store'
import { FetchRecipes, StoreRecipes } from '@recipes/store'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(public authService: AuthService,
              private _store: Store<AppState>) {}

  onSaveData(): void {
    this._store.dispatch(new StoreRecipes())
  }

  onFetchData(): void {
    this._store.dispatch(new FetchRecipes())
  }

  onLogout(): void {
    this.authService.logout()
  }
}
