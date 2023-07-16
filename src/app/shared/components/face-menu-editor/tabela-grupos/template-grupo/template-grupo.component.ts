import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UploadService } from 'src/app/shared/services/upload.service';
import { Grupo } from '../../face-menu-editor.model';

@Component({
  selector: 'app-template-grupo',
  templateUrl: './template-grupo.component.html',
  styleUrls: ['./template-grupo.component.sass'],
})
export class TemplateGrupoComponent implements OnInit {
  @Input() grupo?: Grupo;
  @Input() tamanho = 26;
  @Input() podeDeletar = false;
  @Output() onDeleteItem = new EventEmitter<Grupo>();
  constructor(private uploadService: UploadService) {}

  ngOnInit(): void {}

  tipoPreview(grupo:Grupo) {
    // if (grupo.decoracao_id) {
    //   return 'img';
    // }
    // if (grupo.icone) {
      return 'icon';
    // }
    // return '';
  }

  linkImagem(id?: number) {
    if (!id) {
      return '';
    }
    return this.uploadService.getUrl(id);
  }

  get estiloImagem() {
    return {
      objectFit: 'cover',
      height: `${this.tamanho}px`,
      width: `${this.tamanho}px`,
    };
  }

  get estiloIcone() {
    return {
      fontSize: `${this.tamanho}px`,
    };
  }
}
