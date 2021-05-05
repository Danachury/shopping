import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { RecipesService } from '@recipes/recipes.service'
import { Recipe } from '@recipes/recipe.model'
import { map, tap } from 'rxjs/operators'

const SERVICE_URL = 'https://shopping-10bbc-default-rtdb.firebaseio.com'

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private _http: HttpClient,
              private _recipeService: RecipesService) { }

  storeRecipe(): Observable<Recipe[]> {
    return this._http
      .put<Recipe[]>(`${SERVICE_URL}/recipes.json`, this._recipeService.recipes)
  }

  fetchRecipes(): Observable<Recipe[]> {
    const mapRecipes = (recipes: Recipe[]): Recipe[] =>
      recipes.map(recipe => ({ ...recipe, ingredients: recipe.ingredients || [] }))
    const setRecipes = (recipes: Recipe[]) =>
      this._recipeService.recipes = recipes

    return this._http
      .get<Recipe[]>(`${SERVICE_URL}/recipes.json`)
      .pipe(map(mapRecipes), tap(setRecipes))
  }
}
