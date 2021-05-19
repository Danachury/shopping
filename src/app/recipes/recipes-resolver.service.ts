import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router'
import { Recipe } from '@recipes/recipe.model'
import { Observable, of } from 'rxjs'
import { Store } from '@ngrx/store'
import { AppState } from 'src/app/store'
import { FetchRecipes, SET_RECIPES } from '@recipes/store'
import { Actions, ofType } from '@ngrx/effects'
import { map, switchMap, take } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {

  constructor(private _store: Store<AppState>,
              private _actions: Actions) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> | Recipe[] {
    const fetchData = (recipes: Recipe[]): Observable<Recipe[]> => {
      if (recipes.length > 0)
        return of(recipes)
      this._store.dispatch(new FetchRecipes())
      return this._actions
        .pipe(
          ofType(SET_RECIPES),
          take(1)
        )
    }
    return this._store
      .select('recipes')
      .pipe(
        take(1),
        map(recipesState => recipesState.recipes),
        switchMap(fetchData)
      )
  }
}
