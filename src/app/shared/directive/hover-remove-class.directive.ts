import { Directive, HostListener, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[hover-remove-class]',
  standalone: true,
})
export class HoverRemoveClassDirective {
  constructor(public elementRef: ElementRef) {}
  @Input('hover-remove-class') hoverRemoveClass: any;

  @HostListener('mouseleave') onMouseEnter() {
    this.elementRef.nativeElement.classList.add(this.hoverRemoveClass);
  }

  @HostListener('mouseenter') onMouseLeave() {
    this.elementRef.nativeElement.classList.remove(this.hoverRemoveClass);
  }
}
