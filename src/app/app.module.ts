import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { HeaderComponent } from './header'
import { RecipeListComponent } from '@recipes/recipe-list'
import { RecipeDetailComponent } from '@recipes/recipe-detail'
import { RecipeItemComponent } from '@recipes/recipe-list/recipe-item'
import { ShoppingListComponent } from '@shopping/shopping-list'
import { ShoppingEditComponent } from '@shopping/shopping-list/shopping-edit'
import { RecipesComponent } from './recipes'
import { SharedModule } from '@shared/shared.module'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { AppRoutingModule } from './app-routing.module'
import { RecipeStartComponent } from '@recipes/recipe-start'
import { RecipeEditComponent } from '@recipes/recipe-edit'
import { AuthComponent } from 'src/app/auth'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { AuthInterceptorService } from 'src/app/auth/auth-interceptor.service'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    RecipesComponent,
    RecipeStartComponent,
    RecipeEditComponent,
    AuthComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    SharedModule,
    NgbModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {}
