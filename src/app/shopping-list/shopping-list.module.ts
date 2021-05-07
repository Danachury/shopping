import { NgModule } from '@angular/core'

import { ShoppingListRoutingModule } from './shopping-list-routing.module'
import { ShoppingEditComponent } from 'src/app/shopping-list/shopping-edit'
import { ShoppingListComponent } from 'src/app/shopping-list/shopping-list.component'
import { SharedModule } from '@shared/shared.module'

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent
  ],
  imports: [
    ShoppingListRoutingModule,
    SharedModule
  ]
})
export class ShoppingListModule {}
