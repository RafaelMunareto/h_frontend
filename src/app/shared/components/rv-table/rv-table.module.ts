import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RouterModule } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { SliderModule } from 'primeng/slider';
import { NgModule } from '@angular/core';
import { RVTableComponent } from './rv-table.component';

@NgModule({
  declarations: [RVTableComponent],
  imports: [
    TableModule,
    MultiSelectModule,
    DropdownModule,
    SliderModule,
    RouterModule,
    ProgressBarModule,
    InputTextModule,
    ButtonModule,
  ],
  exports: [RVTableComponent],
  providers: [],
  bootstrap: [RVTableComponent],
})
export class RVTableModule {}
