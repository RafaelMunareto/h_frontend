import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PieChartPrimengComponent } from './pie-chart-primeng.component';
import { ChartModule } from 'primeng/chart';


@NgModule({
  declarations: [
    PieChartPrimengComponent
  ],
  imports: [
    CommonModule,
    ChartModule  
  ],
  exports:[
    PieChartPrimengComponent
  ]
})
export class PieChartPrimengModule { }
