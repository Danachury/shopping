import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuardService } from 'src/app/auth'
import { ShoppingListComponent } from './shopping-list.component'

const routes: Routes = [
  { path: 'shopping-list', component: ShoppingListComponent, canActivate: [AuthGuardService] }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingListRoutingModule {}
