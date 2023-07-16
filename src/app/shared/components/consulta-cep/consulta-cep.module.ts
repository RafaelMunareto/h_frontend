import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultaCepComponent } from './consulta-cep.component';
import { FormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [ConsultaCepComponent],
  imports: [
    CommonModule,
    FormsModule,
    InputMaskModule,
    ButtonModule,
    InputTextModule,
    NgxMaskModule.forRoot(),
  ],
  exports: [ConsultaCepComponent],
})
export class ConsultaCepModule {}
