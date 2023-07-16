import { Directive, HostListener, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[hover-add-class]',
  standalone: true,
})
export class HoverAddClassDirective {
  constructor(public elementRef: ElementRef) {}
  @Input('hover-add-class') hoverAddClass: any;

  @HostListener('mouseenter') onMouseEnter() {
    this.elementRef.nativeElement.classList.add(this.hoverAddClass);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.elementRef.nativeElement.classList.remove(this.hoverAddClass);
  }
}
