import { NgModule } from '@angular/core'
import { RecipeListComponent } from '@recipes/recipe-list'
import { RecipeDetailComponent } from '@recipes/recipe-detail'
import { RecipeItemComponent } from '@recipes/recipe-list/recipe-item'
import { RecipesComponent } from '@recipes/recipes.component'
import { RecipeStartComponent } from '@recipes/recipe-start'
import { RecipeEditComponent } from '@recipes/recipe-edit'
import { RecipesRoutingModule } from '@recipes/recipes-routing.module'
import { SharedModule } from '@shared/shared.module'

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeItemComponent,
    RecipeListComponent,
    RecipeEditComponent,
    RecipeStartComponent,
    RecipeDetailComponent
  ],
  imports: [
    RecipesRoutingModule,
    SharedModule
  ]
})
export class RecipesModule {}
