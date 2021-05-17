import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { HeaderComponent } from './header'
import { SharedModule } from '@shared/shared.module'
import { AppRoutingModule } from './app-routing.module'
import { CoreModule } from '@core/core.module'
import { BrowserModule } from '@angular/platform-browser'
import { StoreModule } from '@ngrx/store'
import { appReducer } from 'src/app/store'
import { EffectsModule } from '@ngrx/effects'
import { AuthEffects } from '@auth/store'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    SharedModule,
    EffectsModule.forRoot([AuthEffects]),
    StoreModule.forRoot(appReducer),
    CoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
