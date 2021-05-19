import * as shoppingList from '@shopping-list/store'
import * as auth from '@auth/store'
import * as recipes from '@recipes/store'
import { ActionReducerMap } from '@ngrx/store'

export interface AppState {
  shoppingList: shoppingList.State,
  recipes: recipes.State,
  auth: auth.State
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: shoppingList.shoppingListReducer,
  recipes: recipes.recipesReducer,
  auth: auth.authReducer
}