import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core'

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {

  @Input('appUnless')
  set unless(condition: boolean) {
    if (!condition)
      this._viewContainerRef.createEmbeddedView(this._templateRef)
    else
      this._viewContainerRef.clear()
  }

  constructor(private _templateRef: TemplateRef<any>, private _viewContainerRef: ViewContainerRef) { }

}
