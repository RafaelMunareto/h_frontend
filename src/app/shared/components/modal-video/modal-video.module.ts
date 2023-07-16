import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ModalVideoComponent } from './modal-video.component';
import { ModalVideoService } from './modal-video.service';


@NgModule({
  declarations: [
    ModalVideoComponent
  ],
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    ToastModule
  ],
  providers:[
    ModalVideoService,
  ],
  exports:[
    ModalVideoComponent
  ]

})
export class ModalVideoModule { }
