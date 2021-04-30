import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2 } from '@angular/core'

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnInit {

  @Input() defaultColor = 'yellow'
  @Input('appHighlight') highlightColor = 'yellow'

  @HostBinding('style.backgroundColor') backgroundColor

  constructor(private _renderer: Renderer2, private _elementRef: ElementRef) { }

  ngOnInit(): void {
    this.backgroundColor = this.defaultColor
  }

  @HostListener('mouseover')
  mouseover(): void {
    this.backgroundColor = this.highlightColor
  }

  @HostListener('mouseleave')
  mouseleave(): void {
    this.backgroundColor = this.defaultColor
  }
}
