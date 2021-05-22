import { Component, OnInit } from '@angular/core'
import { ShoppingListService } from './shopping-list.service'
import { Store } from '@ngrx/store'
import { Ingredient } from '@shared/models'
import { Observable } from 'rxjs'
import * as Actions from '@shopping-list/store/shopping-list.actions'
import { AppState } from 'src/app/store'
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.sass']
})
export class ShoppingListComponent implements OnInit {

  ingredientsObs: Observable<Ingredient[]>

  constructor(public shoppingListService: ShoppingListService,
              private _store: Store<AppState>) { }

  ngOnInit(): void {
    this.ingredientsObs = this._store
      .select('shoppingList')
      .pipe(map(state => state.ingredients))
  }

  onDeleteIngredient(index: number): void {
    this._store.dispatch(new Actions.DeleteIngredient(index))
    this.shoppingListService.deleteItem$.next(index)
  }

  onEdit(index: number): void {
    this._store.dispatch(new Actions.StartEdit(index))
  }
}
