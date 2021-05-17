import { Ingredient } from '@shared/models'
import {
  ADD_INGREDIENT,
  ADD_INGREDIENTS,
  DELETE_INGREDIENT,
  SLActions,
  START_EDIT,
  STOP_EDIT,
  UPDATE_INGREDIENT
} from './shopping-list.actions'

export interface State {
  ingredients: Ingredient[],
  editedIngredient?: Ingredient,
  editedIngredientIndex?: number
}

const initialState: State = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
}

export const shoppingListReducer = (state: State = initialState, action: SLActions) => {
  const payload = action['payload']
  switch (action.type) {
    case ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, payload]
      }
    case ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...payload]
      }
    case UPDATE_INGREDIENT:
      const updated = {
        ...state.ingredients[state.editedIngredientIndex],
        ...payload
      }
      const updatedIngredients = [...state.ingredients]
      updatedIngredients[state.editedIngredientIndex] = updated
      return {
        ...state,
        ingredients: updatedIngredients,
        editedIngredientIndex: -1,
        editedIngredient: null
      }
    case DELETE_INGREDIENT:
      const filteredIg = state.ingredients.filter((ig, i) => i !== payload)
      return {
        ...state,
        ingredients: filteredIg
      }
    case START_EDIT:
      return {
        ...state,
        editedIngredientIndex: payload,
        editedIngredient: { ...state.ingredients[payload] }
      }
    case STOP_EDIT:
      return {
        ...state,
        editedIngredientIndex: -1,
        editedIngredient: null
      }
    default:
      return state
  }
}
