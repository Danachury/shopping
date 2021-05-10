import { NgModule } from '@angular/core'

import { RouterModule, Routes } from '@angular/router'
import { RecipesComponent } from '@recipes/recipes.component'
import { RecipesResolverService } from '@recipes/recipes-resolver.service'
import { AuthGuardService } from '../auth'
import { RecipeStartComponent } from '@recipes/recipe-start'
import { RecipeEditComponent } from '@recipes/recipe-edit'
import { RecipeDetailComponent } from '@recipes/recipe-detail'

const routes: Routes = [
  {
    path: '',
    component: RecipesComponent,
    resolve: [RecipesResolverService],
    canActivate: [AuthGuardService],
    children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipeEditComponent },
      { path: ':id', component: RecipeDetailComponent },
      { path: ':id/edit', component: RecipeEditComponent }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule {}
