import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { RecipesComponent } from '@recipes/recipes.component'
import { ShoppingListComponent } from '@shopping/shopping-list'
import { RecipeStartComponent } from '@recipes/recipe-start'
import { RecipeDetailComponent } from '@recipes/recipe-detail'
import { RecipeEditComponent } from '@recipes/recipe-edit/recipe-edit.component'
import { RecipesResolverService } from '@recipes/recipes-resolver.service'
import { AuthComponent } from 'src/app/auth/auth.component'
import { AuthGuardService } from 'src/app/auth'

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    component: RecipesComponent,
    resolve: [RecipesResolverService],
    canActivate: [AuthGuardService],
    children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipeEditComponent },
      { path: ':id', component: RecipeDetailComponent },
      { path: ':id/edit', component: RecipeEditComponent }
    ]
  },
  { path: 'shopping-list', component: ShoppingListComponent, canActivate: [AuthGuardService] },
  { path: 'auth', component: AuthComponent }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
