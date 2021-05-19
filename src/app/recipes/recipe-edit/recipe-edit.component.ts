import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { Logger } from '@core/logging'
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms'
import { Recipe } from '@recipes/recipe.model'
import { Store } from '@ngrx/store'
import { AppState } from 'src/app/store'
import { map } from 'rxjs/operators'
import { AddRecipe, UpdateRecipe } from '@recipes/store'

const logger = new Logger('RecipeEditComponent')

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html'
})
export class RecipeEditComponent implements OnInit, OnDestroy {

  recipeForm: FormGroup
  editItemId: number = null

  private _maxId: number
  private _storeSubs: Subscription

  constructor(private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private _store: Store<AppState>) { }

  ngOnInit(): void {
    this._activatedRoute.params
      .subscribe(params => {
        this.editItemId = +params.id
        logger.debug(`In edit mode: ${!isNaN(this.editItemId)}`)
        this._initForm()
      })
  }

  ngOnDestroy(): void {
    this._storeSubs?.unsubscribe()
  }

  onSubmit(): void {
    const formValue = this.recipeForm.value
    const id = !isNaN(this.editItemId) ? this.editItemId : this._maxId + 1
    const recipe = new Recipe(
      id,
      formValue.name,
      formValue.description,
      formValue.imagePath,
      formValue.ingredients
    )
    if (!isNaN(this.editItemId)) {
      this._store.dispatch(new UpdateRecipe({ id: this.editItemId, recipe }))
      this.editItemId = null
    } else
      this._store.dispatch(new AddRecipe(recipe))
    this.onCancel()
  }

  onAddIngredient(): void {
    this.ingredientsControl
      .push(RecipeEditComponent._initIngredientsFormGroup())
  }

  onCancel(): void {
    this._router.navigate(['../'], { relativeTo: this._activatedRoute })
  }

  onRemoveIngredient(index: number): void {
    this.ingredientsControl.removeAt(index)
  }

  get ingredientsControl(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray
  }

  get ingredientControls(): FormControl[] {
    return this.ingredientsControl.controls as FormControl[]
  }

  private _initForm(): void {
    const findRecipe = (recipes: Recipe[]): Recipe => {
      this._maxId = Math.max(...recipes.map(recipe => recipe.id))
      return recipes.find(recipe => recipe.id === this.editItemId)
    }
    const createForm = (recipe: Recipe) => {
      const ingredientsControls: FormGroup[] = !recipe ? [] : recipe.ingredients
        .map(ingredient => RecipeEditComponent._initIngredientsFormGroup(ingredient.name, ingredient.amount))
      this.recipeForm = new FormGroup({
        name: new FormControl(recipe?.name, Validators.required),
        imagePath: new FormControl(recipe?.imagePath, Validators.required),
        description: new FormControl(recipe?.description, Validators.required),
        ingredients: new FormArray(ingredientsControls)
      })
    }
    this._storeSubs = this._store
      .select('recipes')
      .pipe(
        map(state => state.recipes),
        map(findRecipe)
      )
      .subscribe(createForm)
  }

  private static _initIngredientsFormGroup(nameState?: any, amountState?: any): FormGroup {
    return new FormGroup({
      name: new FormControl(nameState, Validators.required),
      amount: new FormControl(amountState, [Validators.required, Validators.min(1), Validators.max(100)])
    })
  }
}
