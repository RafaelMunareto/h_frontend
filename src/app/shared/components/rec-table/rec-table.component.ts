import { AfterViewInit, Component, EventEmitter, Injector, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-rec-table',
  templateUrl: './rec-table.component.html',
  styleUrls: ['./rec-table.component.sass'],
})
export class RecTableComponent implements OnChanges
{
  
  @Input() data: any = [];
  @Input() loadingTable: boolean = true;

  @Output() carregaSubordinada: EventEmitter<any> = new EventEmitter();
  @Output() carregaAnalitico: EventEmitter<number> = new EventEmitter();
  

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['data']){
      if(this.data?.tdFields?.length > 0)
        this.calculateCols();
    }
  }
  
  calculateCols(){
    let procData = this.data;
    procData.headGroups.forEach((hg:any) => {
      
      let headersLen = this.data.headers.filter((h:any)=>{return h.group == hg.group}).length;
      hg.colspan = headersLen ?? "";
      
      hg.rowspan = "";
      if(headersLen == 0){
        hg.rowspan = 2;
      }

    });
    this.data = [];
    this.data = procData;
  }

  eventoCarregaSubordinada(event: any) {
    this.carregaSubordinada.emit(event);
  }

  eventoCarregaAnalitico(evt: any) {
    this.carregaAnalitico.emit(evt);
  }
  
}
