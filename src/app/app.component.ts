import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core'
import { Logger } from '@core/logging'
import { environment } from '@env/index'
import { Store } from '@ngrx/store'
import { AppState } from 'src/app/store'
import { AutoLogin } from '@auth/store'
import { isPlatformBrowser } from '@angular/common'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  title = 'Shopping'

  constructor(private _store: Store<AppState>,
              @Inject(PLATFORM_ID) private _platformId: any) { }

  ngOnInit(): void {
    if (environment.production)
      Logger.enableProductionMode()
    if (isPlatformBrowser(this._platformId))
      this._store.dispatch(new AutoLogin())
  }
}
