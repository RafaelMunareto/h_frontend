import { FaceMenuEditorStore } from './../../face-menu-editor.store';
import { UploadService } from './../../../../services/upload.service';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Item } from '../../face-menu-editor.model';

@Component({
  selector: 'app-template-item',
  templateUrl: './template-item.component.html',
  styleUrls: ['./template-item.component.sass'],
})
export class TemplateItemComponent implements OnInit {
  @Input() item?: Item;
  @Input() tamanho = 26;
  @Input() podeDeletar = false;
  @Input() selecionado = false;
  @Output() onDeleteItem = new EventEmitter<Item>()
   constructor(
    private uploadService: UploadService,
  ) {}

  ngOnInit(): void {}

  tipoPreview(item: Item) {
    if (item.imagem_id) {
      return 'img';
    }
    if (item.thumbnail_id) {
      return 'thumb';
    }
    if (item.icone) {
      return 'icon';
    }
    return '';
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
