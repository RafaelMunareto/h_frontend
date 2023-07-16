import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadFilesAdminComponent } from './upload-files-admin.component';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {TimelineModule} from 'primeng/timeline';

@NgModule({
  declarations: [
    UploadFilesAdminComponent
  ],
  imports: [
    CommonModule,
    OverlayPanelModule,
    TimelineModule
  ],
  providers:[    
  ],
  exports: [UploadFilesAdminComponent]
})

export class UploadFilesAdminModule { }
