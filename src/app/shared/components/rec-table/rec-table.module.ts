import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecTableComponent } from './rec-table.component';
import { LoadingCaixaModule } from '../loading-caixa/loading-caixa.module';
import { RecTrComponent } from './rec-tr/rec-tr.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { PipeModule } from '../../pipe/pipe.module';

@NgModule({
  declarations: [RecTableComponent, RecTrComponent],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    LoadingCaixaModule,
    TableModule,
    PipeModule
  ],
  exports:[
    RecTableComponent, RecTrComponent
  ]
})
export class RecTableModule { }
