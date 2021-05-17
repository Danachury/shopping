import * as shoppingList from '@shopping-list/store'
import * as auth from '@auth/store'
import { ActionReducerMap } from '@ngrx/store'

export interface AppState {
  shoppingList: shoppingList.State
  auth: auth.State
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: shoppingList.shoppingListReducer,
  auth: auth.authReducer
}
