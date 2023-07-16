import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WgtScrollerComponent } from './wgt-scroller.component';
import { DirectiveModule } from '../../directive/directive.module';
import { LoadingCaixaModule } from '../loading-caixa/loading-caixa.module';
import { CarouselModule } from 'primeng/carousel';

@NgModule({
  declarations: [WgtScrollerComponent],
  imports: [
    CommonModule,
    DirectiveModule,
    LoadingCaixaModule,
    CarouselModule
  ],
  exports:[
    WgtScrollerComponent
  ]
})
export class WgtScrollerModule { }
