import { Component } from '@angular/core'
import { RecipesService } from '../recipes.service'

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.sass']
})
export class RecipeListComponent {

  constructor(public recipesService: RecipesService) { }
}
