import { Component, OnDestroy, OnInit } from '@angular/core'
import { Ingredient } from '@shared/models'
import { ShoppingListService } from '@shopping/shopping-list'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Observable, Subscription } from 'rxjs'

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html'
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  shoppingForm: FormGroup
  editItemId: number = null

  private _editingSubscription: Subscription
  private _deleteSubscription: Subscription

  constructor(private _shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.shoppingForm = new FormGroup({
      name: new FormControl('', Validators.required, this.repeatedNameValidator.bind(this)),
      amount: new FormControl('', [Validators.min(1), Validators.max(4)])
    })
    this._editingSubscription = this._shoppingListService
      .editingItem$
      .subscribe(this._onEditItem.bind(this))
    this._deleteSubscription = this._shoppingListService
      .deleteItem$
      .subscribe(this._onDeleteItem.bind(this))
  }

  ngOnDestroy(): void {
    this._editingSubscription.unsubscribe()
    this._deleteSubscription.unsubscribe()
  }

  onSubmit(): void {
    const formValue = this.shoppingForm.value
    const ingredient = new Ingredient(formValue.name, formValue.amount)
    if (this.editItemId !== null) {
      this._shoppingListService.updateIngredient(this.editItemId, ingredient)
      this.editItemId = null
    } else
      this._shoppingListService.addIngredients = ingredient
    this.shoppingForm.reset()
  }

  onClear(): void {
    this.editItemId = null
    this.shoppingForm.reset()
  }

  repeatedNameValidator(control: FormControl): Observable<any> {
    return new Observable(subscriber => {
      const controlValue = (control.value as string).toLowerCase()
      const includes = (ing: Ingredient) => ing.name.toLowerCase() === controlValue
      if (this.editItemId === null && this._shoppingListService.ingredients.some(includes))
        subscriber.next({ nameIsRepeated: true })
      else
        subscriber.next(null)
      subscriber.complete()
    })
  }

  private _onEditItem(index: number): void {
    this.editItemId = index
    const editedIngredient = this._shoppingListService.ingredients[index]
    this.shoppingForm.setValue({
      name: editedIngredient.name,
      amount: editedIngredient.amount
    })
  }

  private _onDeleteItem(): void {
    if (this.editItemId !== null)
      this.shoppingForm.reset()
  }
}
