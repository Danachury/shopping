import { Recipe } from '@recipes/recipe.model'
import {
  ADD_RECIPE,
  AddRecipe,
  DELETE_RECIPE,
  DeleteRecipe,
  RecipesActions,
  SET_RECIPES,
  SetRecipes,
  UPDATE_RECIPE,
  UpdateRecipe
} from '@recipes/store/recipes.actions'

export interface State {
  recipes: Recipe[]
}

const initialState = {
  recipes: []
}

export const recipesReducer = (state: State = initialState, action: RecipesActions) => {
  switch (action.type) {
    case SET_RECIPES:
      return {
        ...state,
        recipes: [...(action as SetRecipes).payload]
      }
    case UPDATE_RECIPE:
      const act = action as UpdateRecipe
      const updatedRecipe = {
        ...state.recipes[act.payload.id],
        ...act.payload.recipe
      }
      const updatedRecipes = [...state.recipes]
      updatedRecipes[act.payload.id] = updatedRecipe
      return {
        ...state,
        recipes: updatedRecipes
      }
    case DELETE_RECIPE:
      const newRecipes = state.recipes.filter(r => r.id !== (action as DeleteRecipe).payload)
      return {
        ...state,
        recipes: newRecipes
      }
    case ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, (action as AddRecipe).payload]
      }
    default:
      return state
  }
}
