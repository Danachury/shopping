import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DropdownDirective, HighlightDirective, UnlessDirective } from './directives'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { DialogAlertComponent, LoadingSpinnerComponent } from './components'

@NgModule({
  declarations: [HighlightDirective, UnlessDirective, DropdownDirective, LoadingSpinnerComponent, DialogAlertComponent],
  exports: [
    HighlightDirective,
    UnlessDirective,
    DropdownDirective,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    LoadingSpinnerComponent,
    DialogAlertComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ]
})
export class SharedModule {}
