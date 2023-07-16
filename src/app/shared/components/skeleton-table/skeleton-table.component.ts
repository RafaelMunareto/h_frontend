import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-skeleton-table',
  templateUrl: './skeleton-table.component.html',
  styleUrls: ['./skeleton-table.component.sass'],
})
export class SkeletonTableComponent implements OnInit, OnChanges {

  @Input() linhas:number = 8
  valor = [0,1,2,3,4,5,6,7]
  skeleton:boolean = true;
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['linhas']?.currentValue) {
      this.valor = Array(this.linhas).fill(null).map((_: any, i: number) => i)
    }
  }
  ngOnInit(): void {
  }

  


  

}
