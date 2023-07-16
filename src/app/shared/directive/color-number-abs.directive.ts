import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[ColorNumberAbs]',
})
export class ColorNumberAbsDirective implements OnInit {
  @Input('ColorNumberAbs') dados!: any;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.color(this.dados);
  }

  color(dados: any): string {

    if(dados === null) return '';
    
    if (dados > 0) {
      return (this.el.nativeElement.style.color = '#2196F3');
    } else if (dados == 0) {
      return (this.el.nativeElement.style.color = '#2196F3');
    } else {
      return (this.el.nativeElement.style.color = '#FF0000');
    }
  }
}
