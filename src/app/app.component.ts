import { Component, OnInit } from '@angular/core'
import { Logger } from '@core/logging'
import { environment } from '@env/index'
import { Store } from '@ngrx/store'
import { AppState } from 'src/app/store'
import { AutoLogin } from '@auth/store'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  title = 'Shopping'

  constructor(private _store: Store<AppState>) { }

  ngOnInit(): void {
    if (environment.production)
      Logger.enableProductionMode()
    this._store.dispatch(new AutoLogin())
  }
}
