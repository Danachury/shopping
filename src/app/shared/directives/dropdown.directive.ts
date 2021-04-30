import { Directive, HostBinding, HostListener } from '@angular/core'

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  @HostBinding('class.show') show = false

  @HostListener('click')
  toggle(): void {
    this.show = !this.show
  }
}
