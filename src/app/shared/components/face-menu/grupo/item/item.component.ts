import {
  Component,
  ElementRef,
  EventEmitter,
  Input,

  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Item } from 'src/app/core/store/menu/menu.reducer';
import { UploadService } from 'src/app/shared/services/upload.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.sass'],
})
export class ItemComponent implements OnInit {
  @Input() item?: Item;
  @Input() favoritos: Item[] = [];
  @Input() ehFavoritos = false;
  @Input() ehDestaques = false;
  @Input() iconMode = true;

  @Output() addToFavorites = new EventEmitter<number>();
  @Output() removeFromFavorites = new EventEmitter<number>();
  @ViewChild('container') container?: ElementRef;

  menu: MenuItem[] = [];
  hover = false;

  constructor(private uploadService: UploadService) {}

  ngOnInit(): void {}

  get ehFavoritado() {
    if (!this.item || !this.favoritos.length) {
      return false;
    }
    return this.favoritos.map((item) => item?.id).includes(this.item?.id ?? -1);
  }
  get iconSrc() {
    if (!this.item?.imagem_id) {
      return '';
    }
    return this.uploadService.getUrl(this.item.imagem_id);
  }

  get podeAdicionarAosFavoritos(): boolean {
    return !this.ehFavoritado && !this.ehFavoritos;
  }

  get podeRetirarDosFavoritos(): boolean {
    return this.ehFavoritos;
  }

  atualizaMenu(): MenuItem[] {
    if (!this.item) {
      return [];
    }
    const id = this.item.id;
    if (this.ehFavoritado && !this.ehFavoritos) {
      return [
        {
          id: 'remove',
          label: 'Remover dos favoritos',
          icon: 'pi pi-times',
          command: () => this.removeFromFavorites.emit(id),
        },
      ];
    }
    return [
      {
        id: 'add',
        label: 'Adicionar aos favoritos',
        icon: 'fas fa-start',
        command: () => this.addToFavorites.emit(id),
      },
    ];
  }

  get nome() {
    if (!this.item?.nome) {
      return '';
    }
    return this.item.nome.replace('#', '');
  }

  get novo() {
    if (!this.item?.eh_novo) {
      return false;
    }
    return this.item.eh_novo;
  }

  adicionaFavorito() {
    if (!this.item?.id) {
      return;
    }
    this.addToFavorites.emit(this.item.id);
  }

  removeFavorito() {
    if (!this.item?.id) {
      return;
    }
    this.removeFromFavorites.emit(this.item.id);
  }
}
