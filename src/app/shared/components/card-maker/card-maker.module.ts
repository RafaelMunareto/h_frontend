import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardMakerComponent } from './card-maker.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [
    CardMakerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule,
    ButtonModule
  ],
  exports:[
    CardMakerComponent
  ]
})
export class CardMakerModule { }
