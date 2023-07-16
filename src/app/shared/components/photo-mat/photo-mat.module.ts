import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoMatComponent } from './photo-mat.component';
import { DirectiveModule } from '../../directive/directive.module';


@NgModule({
  declarations: [PhotoMatComponent],
  imports: [
    CommonModule, DirectiveModule
  ],

  exports:[
    PhotoMatComponent
  ]
})
export class PhotoMatModule { }
