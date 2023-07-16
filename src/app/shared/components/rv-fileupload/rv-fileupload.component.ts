import { MessageService } from 'primeng/api';
import { Component } from '@angular/core';

@Component({
  selector: 'app-rv-fileupload',
  templateUrl: './rv-fileupload.component.html',
  styleUrls: ['./rv-fileupload.component.scss'],
})
export class RVFileUploadComponent {
  uploadedFiles: any[] = [];
  multiple: any;

  constructor(private messageService: MessageService) {}

  onUpload(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.messageService.add({
      severity: 'info',
      summary: 'File Uploaded',
      detail: '',
    });
  }
}
