import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { CompartilharComponent } from './compartilhar.component';
import { CompartilharService } from './compartilhar.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MarcaUnidadeModule } from '../face-marca-unidade/face-marca-unidade.module';


@NgModule({
  declarations: [
    CompartilharComponent
  ],
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    ToastModule,
    FormsModule,
    ProgressSpinnerModule,
    InputTextModule,
    InputTextareaModule,
    MarcaUnidadeModule
  ],
  providers: [
    CompartilharService,
  ],
  exports: [
    CompartilharComponent
  ]

})
export class CompartilharModule { }
