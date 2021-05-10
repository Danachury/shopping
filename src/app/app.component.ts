import { Component, OnInit } from '@angular/core'
import { Logger } from '@core/logging'
import { environment } from '@env/index'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  title = 'Shopping'

  constructor() { }

  ngOnInit(): void {
    if (environment.production)
      Logger.enableProductionMode()
  }
}
