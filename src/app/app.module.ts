import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { HeaderComponent } from './header'
import { SharedModule } from '@shared/shared.module'
import { AppRoutingModule } from './app-routing.module'
import { AuthComponent } from 'src/app/auth'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { AuthInterceptorService } from 'src/app/auth/auth-interceptor.service'
import { RecipesModule } from '@recipes/recipes.module'
import { ShoppingListModule } from 'src/app/shopping-list/shopping-list.module'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent
  ],
  imports: [
    ShoppingListModule,
    AppRoutingModule,
    RecipesModule,
    SharedModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {}
