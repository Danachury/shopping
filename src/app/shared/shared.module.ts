import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DropdownDirective, HighlightDirective, PlaceholderDirective, UnlessDirective } from './directives'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { DialogAlertComponent, LoadingSpinnerComponent } from './components'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { BrowserModule } from '@angular/platform-browser'

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
    // Modules
    NgbModule,
    FormsModule,
    CommonModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,

    // Directives
    HighlightDirective,
    UnlessDirective,
    DropdownDirective,
    PlaceholderDirective,

    // Components
    LoadingSpinnerComponent,
    DialogAlertComponent
  ],
  imports: [
    NgbModule,
    FormsModule,
    CommonModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class SharedModule {}
