import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router'
import { Recipe } from '@recipes/recipe.model'
import { Observable } from 'rxjs'
import { DataStorageService } from '@shared/services/data-storage.service'
import { RecipesService } from '@recipes/recipes.service'
import { Logger } from 'src/app/core/logging'

const logger = new Logger('RecipesResolverService')

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {

  constructor(private _dataStorageService: DataStorageService,
              private _recipeService: RecipesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> | Recipe[] {
    const recipes = this._recipeService.recipes
    if (recipes.length === 0) {
      logger.info('Fetching recipes..')
      return this._dataStorageService.fetchRecipes()
    }
    return recipes
  }
}
