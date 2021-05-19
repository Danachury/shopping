import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { AppState } from 'src/app/store'
import { Subscription } from 'rxjs'
import { map } from 'rxjs/operators'
import { Recipe } from '@recipes/recipe.model'

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.sass']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[]

  private _recipesSubs: Subscription

  constructor(private _store: Store<AppState>) { }

  ngOnInit(): void {
    this._recipesSubs = this._store
      .select('recipes')
      .pipe(map(state => state.recipes))
      .subscribe(recipes => this.recipes = recipes)
  }
}
