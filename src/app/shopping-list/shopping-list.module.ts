import { NgModule } from '@angular/core'

import { ShoppingListRoutingModule } from './shopping-list-routing.module'
import { ShoppingEditComponent } from '@shopping-list/shopping-edit'
import { ShoppingListComponent } from '@shopping-list/shopping-list.component'
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
