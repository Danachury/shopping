import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DropdownDirective, HighlightDirective, PlaceholderDirective, UnlessDirective } from './directives'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { DialogAlertComponent, LoadingSpinnerComponent } from './components'

@NgModule({
  declarations: [
    HighlightDirective,
    UnlessDirective,
    DropdownDirective,
    LoadingSpinnerComponent,
    DialogAlertComponent,
    PlaceholderDirective
  ],
  exports: [
    HighlightDirective,
    UnlessDirective,
    DropdownDirective,
    PlaceholderDirective,
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
