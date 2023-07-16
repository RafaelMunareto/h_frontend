import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFieldErrorComponent } from './form-field-error.component';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';

@NgModule({
  declarations: [FormFieldErrorComponent],
  imports: [
    CommonModule,
    MessageModule,
    MessagesModule
  ],
  exports:[FormFieldErrorComponent]
})
export class FormFieldErrorModule { }
