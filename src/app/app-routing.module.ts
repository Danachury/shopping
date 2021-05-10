import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('@auth/auth.module').then(imp => imp.AuthModule) },
  { path: 'recipes', loadChildren: () => import('@recipes/recipes.module').then(imp => imp.RecipesModule) },
  {
    path: 'shopping-list',
    loadChildren: () => import('@shopping-list/shopping-list.module').then(imp => imp.ShoppingListModule)
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
