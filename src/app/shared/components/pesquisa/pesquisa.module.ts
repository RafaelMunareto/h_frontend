import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PesquisaComponent } from './pesquisa.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { PesquisasService } from './pesquisa.service';

@NgModule({
  declarations: [PesquisaComponent],
  imports: [
    CommonModule,
    RadioButtonModule,
    ButtonModule,
    FormsModule
  ],
  exports:[
    PesquisaComponent
  ],
  providers:[PesquisasService]
})
export class PesquisaModule { }
