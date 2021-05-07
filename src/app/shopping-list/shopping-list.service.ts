import { Injectable } from '@angular/core'
import { Ingredient } from '@shared/models'
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  editingItem$ = new Subject<number>()
  deleteItem$ = new Subject()

  private _ingredients: Ingredient[] = []

  constructor() {
    this.ingredients = []
  }

  deleteIngredient(name: string): boolean {
    const filter = (i: Ingredient) => i.name !== name
    this.ingredients = this.ingredients.filter(filter)
    return !this.ingredients.some(filter)
  }

  updateIngredient(index: number, ingredient: Ingredient): boolean {
    this.ingredients[index] = ingredient
    return true
  }

  get ingredients(): Ingredient[] {
    return this._ingredients
  }

  set ingredients(ingredients: Ingredient[]) {
    this._ingredients = ingredients
  }

  set addIngredients(ingredients: Ingredient | Ingredient[]) {
    const filtered = (Array.isArray(ingredients) ? ingredients : [ingredients])
      .filter(ing => !this.ingredients.find(i => i.name === ing.name))
    this._ingredients.push(...filtered)
  }
}
