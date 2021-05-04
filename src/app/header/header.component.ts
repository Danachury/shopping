import { Component } from '@angular/core'
import { DataStorageService } from '@shared/services/data-storage.service'
import { Logger } from 'src/app/core/logging'

const logger = new Logger('HeaderComponent')

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(private _dataStorageService: DataStorageService) {}

  onSaveData(): void {
    this._dataStorageService
      .storeRecipe()
      .subscribe(response => {
        logger.info(response)
      })
  }

  onFetchData(): void {
    this._dataStorageService.fetchRecipes()
  }
}
