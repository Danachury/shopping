import { Component, OnDestroy, OnInit } from '@angular/core'
import { Ingredient } from '@shared/models'
import { ShoppingListService } from '../shopping-list.service'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Observable, Subscription } from 'rxjs'
import { Store } from '@ngrx/store'
import * as Actions from '../store/shopping-list.actions'
import { State } from '@shopping-list/store'
import { map } from 'rxjs/operators'
import { AppState } from 'src/app/store'

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html'
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  shoppingForm: FormGroup
  editItemId: number = null

  private _editingSubscription: Subscription
  private _deleteSubscription: Subscription

  constructor(private _shoppingListService: ShoppingListService,
              private _store: Store<AppState>) { }

  ngOnInit(): void {
    this.shoppingForm = new FormGroup({
      name: new FormControl('', Validators.required, this.repeatedNameValidator.bind(this)),
      amount: new FormControl('', [Validators.required, Validators.min(1), Validators.max(4)])
    })
    this._editingSubscription = this._store
      .select('shoppingList')
      .subscribe(this._onEditItem.bind(this))
    this._deleteSubscription = this._shoppingListService
      .deleteItem$
      .subscribe(this._onDeleteItem.bind(this))
  }

  ngOnDestroy(): void {
    this._store.dispatch(new Actions.StopEdit())
    this._editingSubscription.unsubscribe()
    this._deleteSubscription.unsubscribe()
  }

  onSubmit(): void {
    const formValue = this.shoppingForm.value
    const ingredient = new Ingredient(formValue.name, formValue.amount)
    if (this.editItemId !== null)
      this._store.dispatch(new Actions.UpdateIngredient(ingredient))
    else
      this._store.dispatch(new Actions.AddIngredient(ingredient))
    this.onClear()
  }

  onClear(): void {
    this.editItemId = null
    this.shoppingForm.reset()
    this._store.dispatch(new Actions.StopEdit())
  }

  repeatedNameValidator(control: FormControl): Observable<any> {
    return this._store
      .select('shoppingList')
      .pipe(map(state => {
        if (this.editItemId !== null)
          return null
        const controlValue = (control.value as string).toLowerCase()
        const predicate = (ing: Ingredient) => ing.name.toLowerCase() === controlValue
        if (state.ingredients.some(predicate))
          return { nameIsRepeated: true }
        else
          return null
      }))
  }

  controlHasError(controlName: string, errors: string | string[] = 'required'): boolean {
    const hasError = (err: string) => this.shoppingForm.get(controlName).hasError(err)
    const touched = this.shoppingForm.get(controlName).touched
    if (!Array.isArray(errors))
      return touched && hasError(errors)
    const hasSomeError = errors.reduce((acc, next) => acc || hasError(next), false)
    return touched && hasSomeError
  }

  private _onEditItem(state: State): void {
    if (!state.editedIngredient)
      return
    this.editItemId = state.editedIngredientIndex
    const editedIngredient = state.editedIngredient
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
