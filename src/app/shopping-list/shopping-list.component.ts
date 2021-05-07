import { Component } from '@angular/core'
import { ShoppingListService } from './shopping-list.service'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.sass']
})
export class ShoppingListComponent {

  constructor(public shoppingListService: ShoppingListService) { }

  onDeleteIngredient(name: string): void {
    this.shoppingListService.deleteIngredient(name)
    this.shoppingListService.deleteItem$.next()
  }

  onEdit(index: number): void {
    this.shoppingListService.editingItem$.next(index)
  }
}
