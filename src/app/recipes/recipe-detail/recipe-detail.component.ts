import { Component, OnDestroy, OnInit } from '@angular/core'
import { Recipe } from '../recipe.model'
import { RecipesService } from '../recipes.service'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.sass']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {

  recipe: Recipe

  private _paramsSubscription: Subscription

  constructor(private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private _recipeService: RecipesService) { }

  ngOnInit(): void {
    this._paramsSubscription = this._activatedRoute.params
      .subscribe(params => {
        const id = +params.id
        this.recipe = this._recipeService.getRecipe(id)
      })
  }

  ngOnDestroy(): void {
    this._paramsSubscription.unsubscribe()
  }

  onAddToShoppingList(): void {
    this._recipeService.addIngredients = this.recipe.ingredients
  }

  onRemoveRecipe(): void {
    this._recipeService.deleteRecipe(this.recipe.id)
    this._router.navigate(['/recipes'])
  }
}
