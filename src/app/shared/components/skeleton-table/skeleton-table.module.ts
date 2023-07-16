import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonTableComponent } from './skeleton-table.component';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';



@NgModule({
  declarations: [
    SkeletonTableComponent
  ],
  imports: [
    CommonModule,
    SkeletonModule,
    TableModule
  ],
  exports:[
    SkeletonTableComponent
  ]
})
export class SkeletonTableModule { }
