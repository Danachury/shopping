import { Injectable } from '@angular/core'
import { Recipe } from './recipe.model'
import { Ingredient } from '@shared/models'
import { ShoppingListService } from '../shopping-list'

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  private _recipes: Recipe[] = []

  constructor(private _shoppingListService: ShoppingListService) { }

  getRecipe(id: number): Recipe {
    return this.recipes
      .find(recipe => recipe.id === id)
  }

  updateRecipe(id: number, recipe: Recipe): boolean {
    const updateRecipe = this.recipes.find(rc => rc.id === id)
    if (!!updateRecipe) {
      updateRecipe.name = recipe.name
      updateRecipe.description = recipe.description
      updateRecipe.imagePath = recipe.imagePath
      updateRecipe.ingredients = recipe.ingredients
      return true
    }
    return false
  }

  deleteRecipe(id: number): boolean {
    const filter = (i: Recipe) => i.id !== id
    this.recipes = this.recipes.filter(filter)
    return !this.recipes.some(filter)
  }

  get recipes(): Recipe[] {
    return this._recipes
  }

  set recipes(recipes: Recipe[]) {
    this._recipes = recipes
  }

  set addRecipes(recipes: Recipe | Recipe[]) {
    const filtered = (Array.isArray(recipes) ? recipes : [recipes])
      .filter(r => !this.recipes.find(recipe => recipe.id === r.id && recipe.name === r.name))
    this._recipes.push(...filtered)
  }

  set addIngredients(ingredients: Ingredient | Ingredient[]) {
    this._shoppingListService.addIngredients = ingredients
  }
}
