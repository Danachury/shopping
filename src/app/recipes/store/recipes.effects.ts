import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { FETCH_RECIPES, SetRecipes, STORE_RECIPES } from '@recipes/store/recipes.actions'
import { map, switchMap, withLatestFrom } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { Recipe } from '@recipes/recipe.model'
import { HttpClient } from '@angular/common/http'
import { Store } from '@ngrx/store'
import { AppState } from 'src/app/store'

const SERVICE_URL = 'https://shopping-10bbc-default-rtdb.firebaseio.com/recipes.json'

// noinspection JSUnusedGlobalSymbols
@Injectable()
export class RecipesEffects {

  fetchRecipes$ = createEffect(() =>
    this._actions$
      .pipe(
        ofType(FETCH_RECIPES),
        switchMap(this.fetchRecipes.bind(this))
      )
  )

  storeRecipes$ = createEffect(
    () =>
      this._actions$
        .pipe(
          ofType(STORE_RECIPES),
          withLatestFrom(this._store.select('recipes')),
          map(([_, recipesState]) => recipesState.recipes),
          switchMap(this.storeRecipes.bind(this))
        ),
    { dispatch: false }
  )

  constructor(private _http: HttpClient,
              private _actions$: Actions,
              private _store: Store<AppState>) {}

  fetchRecipes(): Observable<SetRecipes> {
    const mapRecipes = (recipes: Recipe[]): Recipe[] =>
      recipes.map(recipe => ({ ...recipe, ingredients: recipe.ingredients || [] }))
    const setRecipes = (recipes: Recipe[]) => new SetRecipes(recipes)
    return this._http
      .get<Recipe[]>(SERVICE_URL)
      .pipe(
        map(mapRecipes),
        map(setRecipes)
      )
  }

  storeRecipes(recipes: Recipe[]): Observable<Recipe[]> {
    return this._http
      .put<Recipe[]>(SERVICE_URL, recipes)
  }

}
