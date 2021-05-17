import { Injectable } from '@angular/core'
import { Ingredient } from '@shared/models'
import { Subject } from 'rxjs'
import { Store } from '@ngrx/store'
import * as Actions from '@shopping-list/store/shopping-list.actions'
import { AppState } from 'src/app/store'

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  deleteItem$ = new Subject()

  private _ingredients: Ingredient[] = []

  constructor(private _store: Store<AppState>) { }

  get ingredients(): Ingredient[] {
    return this._ingredients
  }

  set addIngredients(ingredients: Ingredient | Ingredient[]) {
    const filtered = (Array.isArray(ingredients) ? ingredients : [ingredients])
      .filter(ing => !this.ingredients.find(i => i.name === ing.name))
    this._store.dispatch(new Actions.AddIngredients(filtered))
  }
}
