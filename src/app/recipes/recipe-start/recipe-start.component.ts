import { Component } from '@angular/core'

@Component({
  selector: 'app-recipe-start',
  template: `
     <ngb-alert [dismissible]="false" type="info">Please select a Recipe!</ngb-alert>
  `
})
export class RecipeStartComponent {}
