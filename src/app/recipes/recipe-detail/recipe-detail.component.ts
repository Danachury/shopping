import { Component, OnInit } from '@angular/core'
import { Recipe } from '../recipe.model'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store'
import { AppState } from 'src/app/store'
import { map, switchMap } from 'rxjs/operators'
import { DeleteRecipe } from '@recipes/store'
import { AddIngredients } from '@shopping-list/store'

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.sass']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe

  constructor(private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private _store: Store<AppState>) { }

  ngOnInit(): void {
    const findRecipe = (id: number): Observable<Recipe> =>
      this._store
        .select('recipes')
        .pipe(map(state => state.recipes.find(recipe => recipe.id === id)))
    this._activatedRoute
      .params
      .pipe(
        map(params => +params.id),
        switchMap(findRecipe)
      )
      .subscribe(recipe => this.recipe = recipe)
  }

  onAddToShoppingList(): void {
    this._store.dispatch(new AddIngredients(this.recipe.ingredients))
  }

  onRemoveRecipe(): void {
    this._store.dispatch(new DeleteRecipe(this.recipe.id))
    this._router.navigate(['/recipes'])
  }
}
