import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MarcaUnidadeModule } from '../face-marca-unidade/face-marca-unidade.module';
import { AnsComponent } from './ans.component';
import { AnsService } from './ans.service';
import { AnsRoutingModule } from './ans-routing.module';
import { CardModule } from 'primeng/card';
import { AccordionModule } from 'primeng/accordion';
import { LoadingCaixaModule } from '../loading-caixa/loading-caixa.module';


@NgModule({
  declarations: [
    AnsComponent
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
    MarcaUnidadeModule,
    AnsRoutingModule,
    CardModule,
    AccordionModule,
    LoadingCaixaModule
  ],
  providers: [
    AnsService,
  ],
  exports: [
    AnsComponent
  ]

})
export class AnsModule { }
