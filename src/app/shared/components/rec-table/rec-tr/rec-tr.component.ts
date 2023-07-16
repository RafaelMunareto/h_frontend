import { DecimalPipe } from '@angular/common';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-rec-tr',
  templateUrl: './rec-tr.component.html',
  styleUrls: ['./rec-tr.component.sass'],
  providers: [DecimalPipe]
})
export class RecTrComponent implements OnInit {
  @Input() dados: any;
  @Input() nivel: number = 1;
  @Input() showAll: boolean = true;
  @Input() tdFields: any = [];
  @Output() carregaSubordinada: EventEmitter<any> = new EventEmitter();
  @Output() carregaAnalitico: EventEmitter<any> = new EventEmitter();

  btnClicked: boolean = false;
  currTR!: HTMLTableRowElement;

  constructor() {}

  ngOnInit(): void {}

  eventoCarregaSubordinada(event: any) {
    if((event.tipo == 'AG' || event.tipo == 'PA') && event.pdAcessar){
      this.eventoCarregaAnalitico(event);
      event?.evt?.stopPropagation();
    } else {
      this.carregaSubordinada.emit(event);
      event?.evt?.stopPropagation();
    }
  }

  eventoCarregaAnalitico(dt:any) {
    if (this.currTR) this.currTR.classList.remove('highlight');
    this.selectTr(dt.trRef);
    this.carregaAnalitico.emit(dt);
    dt?.evt?.stopPropagation();
  }

  selectTr(t:HTMLTableRowElement){
    this.currTR = t;
    t?.classList?.add('highlight');
  }
}
