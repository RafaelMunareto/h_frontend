import { map } from 'rxjs/operators';
import { Subject, takeUntil, withLatestFrom } from 'rxjs';
import { FaceMenuEditorStore } from './../face-menu-editor.store';
import { Component, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { Exibicao, Grupo, Item } from '../face-menu-editor.model';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-tabela-grupos',
  templateUrl: './tabela-grupos.component.html',
  styleUrls: ['./tabela-grupos.component.sass'],
})
export class TabelaGruposComponent implements OnInit, OnChanges {
  grupos$ = this.faceMenuEditorStore.grupos$;
  grupoSelecionado$ = this.faceMenuEditorStore.grupoSelecionado$;
  itensDisponiveis$ = this.faceMenuEditorStore.itensDisponiveis$;
  itensGrupoSelecionado$ = this.faceMenuEditorStore.itensGrupoSelecionado$;
  listaGrupos$ = this.faceMenuEditorStore.listaGrupos$;
  itens$ = this.faceMenuEditorStore.itens$;
  exibicoes$ = this.faceMenuEditorStore.exibicoes$;
  carregando$ = this.faceMenuEditorStore.gruposCarregando$;
  salvando$ = this.faceMenuEditorStore.gruposSalvando$.pipe(
    withLatestFrom(this.faceMenuEditorStore.itensSalvando$),
    map(([grupos, itens]) => grupos || itens)
  );

  destroy$ = new Subject();

  idExibicaoSelecionada?: number;
  _grupoSelecionado?: Grupo;
  _exibicaoSelecionada?: Exibicao;
  _itemSelecionado?: Item;
  temAlteracao = false;
  temGrupoSelecionado = false;

  colunas = [
    { field: 'id', header: '# ' },
    { field: 'nome', header: 'Nome' },
  ];

  constructor(
    private faceMenuEditorStore: FaceMenuEditorStore,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.faceMenuEditorStore.grupoSelecionado$
      .pipe(takeUntil(this.destroy$))
      .subscribe((grupo) => (this._grupoSelecionado = grupo));
    this.faceMenuEditorStore.exibicaoSelecionada$
      .pipe(takeUntil(this.destroy$))
      .subscribe((exibicao) => (this._exibicaoSelecionada = exibicao));
    this.faceMenuEditorStore.itemSelecionado$
      .pipe(takeUntil(this.destroy$))
      .subscribe((item) => (this._itemSelecionado = item));
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['exibicoes']?.currentValue) {
      this.idExibicaoSelecionada = changes['exibicoes'].currentValue[0].id;
    }
  }

  adicionaItemGrupo(item: Item) {
    this.faceMenuEditorStore.addItemGrupo(item);
  }

  get itemSelecionado() {
    return this._itemSelecionado;
  }

  set itemSelecionado(item) {
    const id = item?.id;
    if (id) {
      this.faceMenuEditorStore.setIdItemSelecionado(id);
    } else {
      this.faceMenuEditorStore.unsetIdItemSelecionado();
    }
  }

  get grupoSelecionado() {
    return [this._grupoSelecionado];
  }

  set grupoSelecionado(grupo) {
    const grupoSelecionado = grupo[0]
    this.temGrupoSelecionado = Boolean(grupoSelecionado)
    if (this.temAlteracao) {
      this.confirmationService.confirm({
        message:
          'Há alterações não salvas. Confirma alteração de grupo selecionado ? (as alterações serão perdidas)',
        accept: () => {
          const id = grupoSelecionado?.id;
          if (id) {
            this.faceMenuEditorStore.setIdGrupoSelecionado(id);
          } else {
            this.faceMenuEditorStore.unsetIdGrupoSelecionado();
          }
          this.temAlteracao = false;
        },
        rejectButtonStyleClass: 'p-button-warning',
      });
    } else {
      const id = grupoSelecionado?.id;
      if (id) {
        this.faceMenuEditorStore.setIdGrupoSelecionado(id);
      } else {
        this.faceMenuEditorStore.unsetIdGrupoSelecionado();
      }
      this.temAlteracao = false;
    }
  }

  get exibicaoSelecionada() {
    return this._exibicaoSelecionada;
  }

  set exibicaoSelecionada(exibicao) {
    if (this.temAlteracao) {
      this.confirmationService.confirm({
        header: 'Atenção',
        message:
          'Há alterações não salvas. Confirma alteração de tipo ? (as alterações serão perdidas)',
        accept: () => {
          const id = exibicao?.id;
          if (id) {
            this.faceMenuEditorStore.setIdExibicaoSelecionada(id);
          } else {
            this.faceMenuEditorStore.unsetIdExibicaoSelecionada();
          }
          this.temAlteracao = false;
        },
        rejectButtonStyleClass: 'p-button-warning',
      });
    } else {
      const id = exibicao?.id;
      if (id) {
        this.faceMenuEditorStore.setIdExibicaoSelecionada(id);
      } else {
        this.faceMenuEditorStore.unsetIdExibicaoSelecionada();
      }
      this.temAlteracao = false;
    }
  }

  adicionaItem() {
    if (!this.grupoSelecionado || !this.itemSelecionado) {
      return;
    }
    this.temAlteracao = true;
    this.faceMenuEditorStore.addItemGrupo(this.itemSelecionado);
  }

  deleteItem(item: Item) {
    this.temAlteracao = true;
    this.faceMenuEditorStore.removeItemGrupo(item);
  }

  deleteGrupo(grupo: Grupo) {}

  trackByGrupo(index: number, grupo: Grupo): number {
    return grupo.id;
  }


  ehGrupoSelecionado(id:number) {
    if (!this.grupoSelecionado.length) { return false }
    return this.grupoSelecionado[0]?.id === id
  }

}
