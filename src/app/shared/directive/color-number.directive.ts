import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[ColorNumber]'
})
export class ColorNumberDirective implements OnInit{

  @Input('ColorNumber') dados!: any;

  constructor(private el: ElementRef) { }


  ngOnInit(): void {
    this.color(this.dados);
  }

  color(dados:number):string
  {
    if(dados === null) return '';

    if(dados >= 100){
      return this.el.nativeElement.style.color = '#2196F3';
    }else if(dados >= 90 && dados < 100){
      return this.el.nativeElement.style.color = 'green';
    }else if(dados >= 70 && dados < 90){
      return this.el.nativeElement.style.color = 'orange';
    }else{
      return this.el.nativeElement.style.color = 'red';
    }

  }

}
