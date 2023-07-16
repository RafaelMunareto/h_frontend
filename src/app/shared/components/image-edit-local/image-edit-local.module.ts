import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageEditLocalComponent } from './image-edit-local.component';
import { ButtonModule } from 'primeng/button';
import { ImageEditLocalService } from './image-edit-local.service';


@NgModule({
  declarations: [ImageEditLocalComponent],
  imports: [
    CommonModule,
    ButtonModule
  ],
  exports:[
    ImageEditLocalComponent
  ],
  providers:[
    ImageEditLocalService
  ]
})
export class ImageEditLocalModule { }
