import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DropdownDirective, HighlightDirective, PlaceholderDirective, UnlessDirective } from './directives'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { DialogAlertComponent, LoadingSpinnerComponent } from './components'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

@NgModule({
  declarations: [
    // Directives
    UnlessDirective,
    DropdownDirective,
    HighlightDirective,
    PlaceholderDirective,

    // Components
    DialogAlertComponent,
    LoadingSpinnerComponent
  ],
  exports: [
    // Modules
    NgbModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,

    // Directives
    UnlessDirective,
    DropdownDirective,
    HighlightDirective,
    PlaceholderDirective,

    // Components
    DialogAlertComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    NgbModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class SharedModule {}
