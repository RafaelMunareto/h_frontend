import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingCaixaComponent } from './loading-caixa.component';



@NgModule({
  declarations: [LoadingCaixaComponent],
  imports: [
    CommonModule
  ],
  exports:[
    LoadingCaixaComponent
  ]
})
export class LoadingCaixaModule { }
