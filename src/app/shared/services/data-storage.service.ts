import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { RecipesService } from '@recipes/recipes.service'
import { Recipe } from '@recipes/recipe.model'
import { map } from 'rxjs/operators'

const SERVICE = 'https://shopping-10bbc-default-rtdb.firebaseio.com'

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private _http: HttpClient,
              private _recipeService: RecipesService) { }

  storeRecipe(): Observable<any> {
    return this._http
      .put(`${SERVICE}/recipes.json`, this._recipeService.recipes)
  }

  fetchRecipes(): void {
    const mapRecipes = (recipes: Recipe[]): Recipe[] =>
      recipes.map(recipe => ({...recipe, ingredients: recipe.ingredients || []}))
    this._http
      .get<Recipe[]>(`${SERVICE}/recipes.json`)
      .pipe(map(mapRecipes))
      .subscribe(recipes => this._recipeService.recipes = recipes)
  }
}
