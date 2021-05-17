import { Component } from '@angular/core'
import { DataStorageService } from '@shared/services/data-storage.service'
import { Logger } from '@core/logging'
import { AuthService } from '@auth/auth.service'
import { Router } from '@angular/router'

const logger = new Logger('HeaderComponent')

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(public authService: AuthService,
              private _dataStorageService: DataStorageService,
              private _router: Router) {}

  onSaveData(): void {
    this._dataStorageService
      .storeRecipe()
      .subscribe(recipes =>
        logger.info(`Stored data ${recipes.length} items`)
      )
  }

  onFetchData(): void {
    this._dataStorageService
      .fetchRecipes()
      .subscribe()
  }

  onLogout(): void {
    this.authService.logout()
  }
}
