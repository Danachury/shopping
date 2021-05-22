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
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { environment } from '@env/environment'
import { StoreRouterConnectingModule } from '@ngrx/router-store'
import { RecipesEffects } from '@recipes/store'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([AuthEffects, RecipesEffects]),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot(),
    AppRoutingModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    SharedModule,
    CoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
