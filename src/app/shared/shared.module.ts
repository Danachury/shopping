import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DropdownDirective, HighlightDirective, UnlessDirective } from './directives'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [HighlightDirective, UnlessDirective, DropdownDirective],
  exports: [
    HighlightDirective,
    UnlessDirective,
    DropdownDirective,
    ReactiveFormsModule,
    FormsModule
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule {}
