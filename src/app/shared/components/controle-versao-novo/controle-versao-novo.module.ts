import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ControleVersaoNovoComponent } from './controle-versao-novo.component';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [ControleVersaoNovoComponent],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    DialogModule,
    DropdownModule,
  ],
  exports: [ControleVersaoNovoComponent],
})
export class ControleVersaoNovoModule {}
