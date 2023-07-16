import { Component, Input, OnInit } from '@angular/core';
import { take, finalize } from 'rxjs/operators';
import { Arquivo } from 'src/app/shared/model/administrativo/arquivo';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-upload-files-admin',
  templateUrl: './upload-files-admin.component.html',
  styleUrls: ['./upload-files-admin.component.sass'],
})
export class UploadFilesAdminComponent implements OnInit {
  dados_upload?: Arquivo[];
  showArquivos = false;

  @Input() tipo = 'overlay';
  @Input() sistema?: string;
  @Input() subsistema?: string;

  @Input() id_arquivo = 0;

  @Input() titulo = 'Arquivos para Download';
  @Input() showTransition = '500ms';
  @Input() hideTransition = '500ms';
  @Input() icon = 'fas fa-download';
  @Input() iColor = '#0F7BB4';

  constructor(
    private uploadService: UploadService
  ) { }

  ngOnInit(): void { }

  carregaArquivos(overlay: any): void {
    this.showArquivos = false;
    const { sistema, subsistema } = this;
    if (overlay.overlayVisible) {
      this.uploadService
        .getList({ sistema, subsistema, admin: true, ativo: true })
        .pipe(
          take(1),
          finalize(() => {
            this.showArquivos = true;
          })
        )
        .subscribe((res) => {
          this.dados_upload = res;

        });
    }
  }

  abrirArquivo(id: number): void {
    window.open(this.uploadService.getUrl(id));
  }
}
