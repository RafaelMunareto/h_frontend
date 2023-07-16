import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BingoApComponent } from './bingo-ap.component';
import { DialogModule } from 'primeng/dialog';
import { SkeletonModule } from 'primeng/skeleton';
import { CompartilharModule } from '../compartilhar/compartilhar.module';

@NgModule({
  declarations: [BingoApComponent],
  imports: [CommonModule, DialogModule, CompartilharModule, SkeletonModule],
  exports: [BingoApComponent],
})
export class BingoApModule {}
