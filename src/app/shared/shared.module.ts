import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DropdownDirective, HighlightDirective, UnlessDirective } from './directives'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component'

@NgModule({
  declarations: [HighlightDirective, UnlessDirective, DropdownDirective, LoadingSpinnerComponent],
  exports: [
    HighlightDirective,
    UnlessDirective,
    DropdownDirective,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    LoadingSpinnerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ]
})
export class SharedModule {}
