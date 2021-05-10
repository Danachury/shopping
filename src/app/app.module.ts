import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { HeaderComponent } from './header'
import { SharedModule } from '@shared/shared.module'
import { AppRoutingModule } from './app-routing.module'
import { CoreModule } from '@core/core.module'
import { BrowserModule } from '@angular/platform-browser'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    SharedModule,
    CoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
