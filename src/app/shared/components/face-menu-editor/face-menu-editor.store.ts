import { mergeMap } from 'rxjs/operators';
import { MenuState } from 'src/app/core/store/menu/menu.reducer';
import { FaceMenuEditorService } from './face-menu-editor.service';
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Status } from 'src/app/shared/types/store/Status';
import {
  Decoracao,
  Exibicao,
  Grupo,
  Item,
} from '../../../core/store/menu/menu.reducer';
import {
  catchError,
  tap,
  EMPTY,
  Observable,
  filter,
  switchMap,
  map,
  withLatestFrom,
} from 'rxjs';
import { Store } from '@ngrx/store';
import { menuActions } from 'src/app/core/store/menu/menu.actions';

export interface State {
  itens: {
    lista: Item[];
    status: Status;
    idSelecionado?: number;
  };
  grupos: {
    lista: Grupo[];
    status: Status;
    idSelecionado?: number;
  };
  exibicoes: {
    lista: Exibicao[];
    status: Status;
    idSelecionado?: number;
  };
  decoracoes: {
    lista: Decoracao[];
    status: Status;
  };
}

const initialState: State = {
  itens: {
    lista: [],
    status: 'INICIALIZADO',
  },
  grupos: {
    lista: [],
    status: 'INICIALIZADO',
  },
  exibicoes: {
    lista: [],
    status: 'INICIALIZADO',
  },
  decoracoes: {
    lista: [],
    status: 'INICIALIZADO',
  },
};

@Injectable()
export class FaceMenuEditorStore extends ComponentStore<State> {
  constructor(
    private faceMenuEditorService: FaceMenuEditorService,
    private menuStore: Store<MenuState>
  ) {
    super(initialState);
  }

  // seletores

  itens$ = this.select((state) => state.itens.lista);
  itensCarregando$ = this.select(
    (state) => state.itens.status === 'CARREGANDO'
  );
  itensErro$ = this.select((state) => state.itens.status === 'ERRO');
  itensSucesso$ = this.select((state) => state.itens.status === 'SUCESSO');
  itensSalvando$ = this.select((state) => state.itens.status === 'SALVANDO');

  grupos$ = this.select((state) => state.grupos.lista);
  gruposCarregando$ = this.select(
    (state) => state.grupos.status === 'CARREGANDO'
  );
  gruposErro$ = this.select((state) => state.grupos.status === 'ERRO');
  gruposSucesso$ = this.select((state) => state.grupos.status === 'SUCESSO');
  gruposSalvando$ = this.select((state) => state.grupos.status === 'SALVANDO');

  exibicoes$ = this.select((state) => state.exibicoes.lista);
  exibicoesCarregando$ = this.select(
    (state) => state.exibicoes.status === 'CARREGANDO'
  );
  exibicoesErro$ = this.select((state) => state.exibicoes.status === 'ERRO');
  exibicoesSucesso$ = this.select(
    (state) => state.exibicoes.status === 'SUCESSO'
  );
  exibicoesSalvando$ = this.select(
    (state) => state.exibicoes.status === 'SALVANDO'
  );

  decoracoes$ = this.select((state) => state.decoracoes.lista);
  decoracoesCarregando$ = this.select(
    (state) => state.decoracoes.status === 'CARREGANDO'
  );
  decoracoesErro$ = this.select((state) => state.decoracoes.status === 'ERRO');
  decoracoesSucesso$ = this.select(
    (state) => state.decoracoes.status === 'SUCESSO'
  );
  decoracoesSalvando$ = this.select(
    (state) => state.decoracoes.status === 'SALVANDO'
  );

  grupoSelecionado$ = this.select((state) =>
    state.grupos.lista.find((grupo) => grupo.id === state.grupos.idSelecionado)
  );

  itemSelecionado$ = this.select((state) =>
    state.itens.lista.find((item) => item.id === state.itens.idSelecionado)
  );
  exibicaoSelecionada$ = this.select((state) =>
    state.exibicoes.lista.find(
      (exibicao) => exibicao.id === state.exibicoes.idSelecionado
    )
  );

  itensGrupoSelecionado$ = this.select(
    this.grupoSelecionado$,
    (grupo) => grupo?.itens
  );
  itensDisponiveis$ = this.select(
    this.grupoSelecionado$,
    this.itens$,
    (grupo, itens) => {
      const ids = grupo?.itens?.map((item) => item.id) ?? [];
      if (!ids.length) {
        return itens;
      }
      return itens.filter((item) => !ids.includes(item.id));
    }
  );

  listaGrupos$ = this.select((state) => {
    if (!state.exibicoes.idSelecionado) {
      return state.grupos.lista;
    }
    return state.grupos.lista.filter(
      (grupo) => grupo.exibicao_id === state.exibicoes.idSelecionado
    );
  });

  // actions

  setStatusItens = this.updater((state, status: Status) => ({
    ...state,
    itens: { ...state.itens, status },
  }));

  setIdGrupoSelecionado = this.updater((state, id: number) => ({
    ...state,
    grupos: { ...state.grupos, idSelecionado: id },
  }));
  unsetIdGrupoSelecionado = this.updater((state) => ({
    ...state,
    grupos: { ...state.grupos, idSelecionado: undefined },
  }));

  setIdExibicaoSelecionada = this.updater((state, id: number) => ({
    ...state,
    exibicoes: { ...state.exibicoes, idSelecionado: id },
  }));
  unsetIdExibicaoSelecionada = this.updater((state) => ({
    ...state,
    exibicoes: { ...state.exibicoes, idSelecionado: undefined },
  }));

  setIdItemSelecionado = this.updater((state, id: number) => ({
    ...state,
    itens: { ...state.itens, idSelecionado: id },
  }));
  unsetIdItemSelecionado = this.updater((state) => ({
    ...state,
    itens: { ...state.itens, idSelecionado: undefined },
  }));

  setItens = this.updater((state, lista: Item[]) => ({
    ...state,
    itens: { ...state.itens, lista },
  }));

  setStatusGrupos = this.updater((state, status: Status) => ({
    ...state,
    grupos: { ...state.grupos, status },
  }));
  setGrupos = this.updater((state, lista: Grupo[]) => ({
    ...state,
    grupos: { ...state.grupos, lista },
  }));

  setStatusExibicoes = this.updater((state, status: Status) => ({
    ...state,
    exibicoes: { ...state.exibicoes, status },
  }));
  setExibicoes = this.updater((state, lista: Exibicao[]) => ({
    ...state,
    exibicoes: { ...state.exibicoes, lista },
  }));

  setStatusDecoracoes = this.updater((state, status: Status) => ({
    ...state,
    decoracoes: { ...state.decoracoes, status },
  }));
  setDecoracoes = this.updater((state, lista: Decoracao[]) => ({
    ...state,
    decoracoes: { ...state.decoracoes, lista },
  }));

  addItemGrupo = this.updater((state, item: Item) => {
    if (state.grupos.idSelecionado) {
      return {
        ...state,
        grupos: {
          ...state.grupos,
          lista: state.grupos.lista.map((grupo) => {
            if (grupo.id !== state.grupos.idSelecionado) {
              return grupo;
            }
            return {
              ...grupo,
              itens: [
                ...grupo.itens,
                {
                  ...item,
                  pivot: {
                    ordem: String(new Date().getTime()),
                    item_id: String(item.id),
                    categoria_id: String(grupo.id),
                  },
                },
              ],
            };
          }),
        },
      };
    }
    return {
      ...state,
    };
  });

  replaceGrupo = this.updater((state, grupo: Grupo) => ({
    ...state,
    grupos: {
      ...state.grupos,
      lista: state.grupos.lista.map((grupoLista) =>
        grupoLista.id !== grupo.id ? grupoLista : grupo
      ),
    },
  }));

  removeItemGrupo = this.updater((state, item: Item) => {
    if (state.grupos.idSelecionado) {
      return {
        ...state,
        grupos: {
          ...state.grupos,
          lista: state.grupos.lista.map((grupo) => {
            if (grupo.id !== state.grupos.idSelecionado) {
              return grupo;
            }
            return {
              ...grupo,
              itens: [
                ...grupo.itens.filter((itemGrupo) => itemGrupo.id !== item.id),
              ],
            };
          }),
        },
      };
    }
    return { ...state };
  });

  // effects

  getItens = this.effect(() => {
    this.setStatusItens('CARREGANDO');
    return this.faceMenuEditorService.getItens().pipe(
      tap((lista) => this.setItens(lista)),
      tap(() => this.setStatusItens('SUCESSO')),
      catchError(() => {
        this.setStatusItens('ERRO');
        return EMPTY;
      })
    );
  });

  getGrupos = this.effect(() => {
    this.setStatusGrupos('CARREGANDO');
    return this.faceMenuEditorService.getGrupos().pipe(
      tap((lista) => this.setGrupos(lista)),
      tap(() => this.setStatusGrupos('SUCESSO')),
      catchError(() => {
        this.setStatusGrupos('ERRO');
        return EMPTY;
      })
    );
  });

  getExibicoes = this.effect(() => {
    this.setStatusExibicoes('CARREGANDO');
    return this.faceMenuEditorService.getExibicoes().pipe(
      tap((lista) => this.setExibicoes(lista)),
      tap((lista) => this.setIdExibicaoSelecionada(lista[0].id)),
      tap(() => this.setStatusExibicoes('SUCESSO')),
      catchError(() => {
        this.setStatusExibicoes('ERRO');
        return EMPTY;
      })
    );
  });

  getDecoracoes = this.effect(() => {
    this.setStatusDecoracoes('CARREGANDO');
    return this.faceMenuEditorService.getDecoracoes().pipe(
      tap((lista) => this.setDecoracoes(lista)),
      tap(() => this.setStatusDecoracoes('SUCESSO')),
      catchError(() => {
        this.setStatusDecoracoes('ERRO');
        return EMPTY;
      })
    );
  });

  createGrupo = this.effect((nome$: Observable<string>) =>
    nome$.pipe(
      tap(() => this.setStatusGrupos('SALVANDO')),
      filter((nome) => Boolean(nome)),
      withLatestFrom(this.exibicaoSelecionada$),
      map(([nome, exibicao]) => {
        const grupo: Grupo = {
          id: -1,
          exibicao_id: exibicao?.id ?? 2,
          decoracao_id: 2,
          nome,
          validade_inicio: new Date().toISOString().slice(0, 10),
          acesso_restrito: false,
          icone: '',
          itens: [],
        };
        return grupo;
      }),
      switchMap((grupo) => this.faceMenuEditorService.postGrupo(grupo)),
      withLatestFrom(this.state$),
      tap(([grupo, state]) => {
        this.patchState({
          grupos: {
            ...state.grupos,
            lista: [...state.grupos.lista, grupo],
          },
        });
        // this.menuStore.dispatch(menuActions.addGrupo({ grupo }));
      }),
      tap(() => this.setStatusGrupos('SUCESSO')),
      catchError(() => {
        this.setStatusGrupos('ERRO');
        return EMPTY;
      })
    )
  );

  updateGrupo = this.effect((grupo$: Observable<Grupo>) =>
    grupo$.pipe(
      filter((grupo) => Boolean(grupo)),
      tap(() => this.setStatusGrupos('SALVANDO')),
      switchMap((grupo) => this.faceMenuEditorService.postGrupo(grupo)),
      tap((grupo: Grupo) => this.replaceGrupo(grupo)),
      tap((grupo: Grupo) =>
        this.menuStore.dispatch(menuActions.updateGrupo({ grupo }))
      ),
      tap(() => this.setStatusGrupos('SUCESSO')),
      catchError(() => {
        this.setStatusGrupos('ERRO');
        return EMPTY;
      })
    )
  );

  deleteGrupo = this.effect((id$: Observable<number>) =>
    id$.pipe(
      tap(() => this.setStatusGrupos('SALVANDO')),
      filter((id) => Boolean(id)),
      switchMap((id) =>
        this.faceMenuEditorService.deleteGrupo(id).pipe(map(() => id))
      ),
      withLatestFrom(this.state$),
      tap(([id, state]) => {
        this.patchState({
          grupos: {
            ...state.grupos,
            lista: state.grupos.lista.filter((grupo) => grupo.id !== id),
          },
        });
        this.menuStore.dispatch(menuActions.deleteGrupo({ id }));
      }),
      tap(() => this.setStatusGrupos('SUCESSO')),
      catchError(() => {
        this.setStatusGrupos('ERRO');
        return EMPTY;
      })
    )
  );
}
