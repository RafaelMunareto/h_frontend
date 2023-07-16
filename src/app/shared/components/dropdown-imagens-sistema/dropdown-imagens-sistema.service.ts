import { UploadService } from 'src/app/shared/services/upload.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DropdownImagensSistemaService {
  httpClient = inject(HttpClient);
  uploadService = inject(UploadService);

  constructor() {}

  get(sistema: string) {
    return this.uploadService.getList({ sistema, admin: true });
  }

  upload(file: File, sistema: string) {
    return this.uploadService.upload(
      sistema,
      file,
      null,
      file.name,
      true,
      null,
      null,
      file.name
    );
  }
}
