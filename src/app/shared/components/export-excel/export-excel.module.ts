import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportExcelComponent } from './export-excel.component';

import {ButtonModule} from 'primeng/button';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule
  ],
  declarations: [ExportExcelComponent],
  exports:[ExportExcelComponent]
})
export class ExportExcelModule { }
