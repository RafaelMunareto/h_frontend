import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-caixa',
  templateUrl: './loading-caixa.component.html',
  styleUrls: ['./loading-caixa.component.sass'],
  animations: [
    trigger('animateLoading', [
      state('true', style({
        opacity: '0'
      })),
      state('false', style({
        opacity: '1'
      })),
      transition('* => *', [
        animate('0.7s')
      ])
    ]),
  ]
})
export class LoadingCaixaComponent implements OnInit {

  @Input('width') inWidth:string = '100%';
  @Input('height') inHeight:string = '100px';
  @Input('texto') inText:string='Carregando...';
  @Input('borda') inBorda:string='none';
  @Input('class') inClass:string = '';

  isLoading:boolean = false;

  constructor() { }

  ngOnInit(): void {
    setInterval(()=>{
      this.isLoading = !this.isLoading;
    },700);
  }

}
