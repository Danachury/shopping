import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { environment } from '@env/environment'
import { AppModule } from './app/app.module'
import { Logger } from '@core/logging'

const logger = new Logger('Main')

if (environment.production)
  enableProdMode()

document.addEventListener('DOMContentLoaded', () => {
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => logger.error(err))
})
