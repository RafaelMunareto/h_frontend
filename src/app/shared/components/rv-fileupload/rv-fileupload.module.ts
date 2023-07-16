import { NgModule } from '@angular/core';

import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';

import { RVFileUploadComponent } from './rv-fileupload.component';

@NgModule({
  declarations: [RVFileUploadComponent],
  imports: [FileUploadModule, ToastModule],
  exports: [RVFileUploadComponent],
  providers: [],
  bootstrap: [RVFileUploadComponent],
})
export class RVFileUploadModule {}
