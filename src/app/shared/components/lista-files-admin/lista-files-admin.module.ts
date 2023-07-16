import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaFilesAdminComponent } from './lista-files-admin.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TimelineModule } from 'primeng/timeline';
import { UploadService } from '../../services/upload.service';

@NgModule({
  declarations: [ListaFilesAdminComponent],
  imports: [CommonModule, OverlayPanelModule, TimelineModule],
  providers: [UploadService],
  exports: [ListaFilesAdminComponent],
})
export class ListaFilesAdminModule {}
