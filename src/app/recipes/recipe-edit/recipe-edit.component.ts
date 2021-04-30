import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { Logger } from '../../core/logging'
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms'
import { RecipesService } from '@recipes/recipes.service'
import { Recipe } from '@recipes/recipe.model'

const logger = new Logger('RecipeEditComponent')

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html'
})
export class RecipeEditComponent implements OnInit, OnDestroy {

  recipeForm: FormGroup
  editItemId: number = null

  private _paramsSubscription: Subscription

  constructor(private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private _recipeService: RecipesService) { }

  ngOnInit(): void {
    this._paramsSubscription = this._activatedRoute.params
      .subscribe(params => {
        this.editItemId = +params.id
        logger.debug(`In edit mode: ${!isNaN(this.editItemId)}`)
        this._initForm()
      })
  }

  ngOnDestroy(): void {
    this._paramsSubscription.unsubscribe()
  }

  onSubmit(): void {
    const formValue = this.recipeForm.value
    const id = Math.max(...this._recipeService.recipes.map(rc => rc.id)) + 1
    const recipe = new Recipe(
      id,
      formValue.name,
      formValue.description,
      formValue.imagePath,
      formValue.ingredients
    )
    if (!isNaN(this.editItemId)) {
      this._recipeService.updateRecipe(this.editItemId, recipe)
      this.editItemId = null
    } else
      this._recipeService.addRecipes = recipe
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
    const recipe = this._recipeService.getRecipe(this.editItemId)
    const ingredientsControls: FormGroup[] = !recipe ? [] : recipe.ingredients
      .map(ingredient => RecipeEditComponent._initIngredientsFormGroup(ingredient.name, ingredient.amount))
    this.recipeForm = new FormGroup({
      name: new FormControl(recipe?.name, Validators.required),
      imagePath: new FormControl(recipe?.imagePath, Validators.required),
      description: new FormControl(recipe?.description, Validators.required),
      ingredients: new FormArray(ingredientsControls)
    })
  }

  private static _initIngredientsFormGroup(nameState?: any, amountState?: any): FormGroup {
    return new FormGroup({
      name: new FormControl(nameState, Validators.required),
      amount: new FormControl(amountState, [Validators.required, Validators.min(1), Validators.max(100)])
    })
  }
}
