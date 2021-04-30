import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { HeaderComponent } from './header'
import { RecipeListComponent } from '@recipes/recipe-list'
import { RecipeDetailComponent } from '@recipes/recipe-detail'
import { RecipeItemComponent } from '@recipes/recipe-list/recipe-item'
import { ShoppingListComponent } from '@shopping/shopping-list'
import { ShoppingEditComponent } from '@shopping/shopping-list/shopping-edit'
import { RecipesComponent, RecipesService } from './recipes'
import { SharedModule } from '@shared/shared.module'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { AppRoutingModule } from './app-routing.module'
import { RecipeStartComponent } from '@recipes/recipe-start'
import { RecipeEditComponent } from '@recipes/recipe-edit'

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
    RecipeEditComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    SharedModule,
    NgbModule
  ],
  providers: [RecipesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
