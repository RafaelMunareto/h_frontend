import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[widgetsHost]',
})
export class WidgetsDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}