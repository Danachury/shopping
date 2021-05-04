import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DropdownDirective, HighlightDirective, UnlessDirective } from './directives'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  declarations: [HighlightDirective, UnlessDirective, DropdownDirective],
  exports: [
    HighlightDirective,
    UnlessDirective,
    DropdownDirective,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ]
})
export class SharedModule {}
