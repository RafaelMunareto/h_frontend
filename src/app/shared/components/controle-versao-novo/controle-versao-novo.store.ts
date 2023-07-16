import { catchError, filter, switchMap, takeUntil } from 'rxjs/operators';

import { ComponentStore } from '@ngrx/component-store';
import { Status } from 'src/app/shared/types/store/Status';

import { EMPTY, of, tap } from 'rxjs';
import { InformacoesState } from 'src/app/core/store/informacoes/informacoes.reducer';
import { Store } from '@ngrx/store';

import { Injectable } from '@angular/core';
import { ControleVersaoService } from 'src/app/shared/services/controle-versao.service';
import { ControleVersao } from 'src/app/shared/model/administrativo/ControleVersao';
import { fromInformacoes } from 'src/app/core/store/informacoes/informacoes.selectors';

export interface ControleVersaoNovoState {
  lista: ControleVersao[];
  status: Status;
}

const controleVersaoStoreInitialState: ControleVersaoNovoState = {
  lista: [],
  status: 'INICIALIZADO',
};

@Injectable({
  providedIn: 'root',
})
export class ControleVersaoStore extends ComponentStore<ControleVersaoNovoState> {
  constructor(
    private controleVersaoService: ControleVersaoService,
    private informacoesStore: Store<InformacoesState>
  ) {
    super(controleVersaoStoreInitialState);
  }

  // actions

  setStatus = this.updater((state, status: Status) => {
    return { ...state, status };
  });

  setLista = this.updater((state, lista: ControleVersao[]) => {
    return { ...state, lista, status: 'SUCESSO' };
  });

  // variables

  sistemaSelecionado = 'RedeVarejo';
  listaSalva: ControleVersao[] = [];

  // selectors

  lista$ = this.select((state) =>
    this.sistemaSelecionado == 'RedeVarejo'
      ? state.lista.filter(
          (item) => !(item.sistema != 'RedeVarejo' && item.tipo === 1)
        )
      : state.lista.filter((item) => item.sistema == this.sistemaSelecionado)
  );
  maisRecente$ = this.select((state) =>
    state.lista
      .sort((a, b) => b.created_at.localeCompare(a.created_at))
      .find((item: any) => item.tipo === 1 && item.sistema == 'RedeVarejo')
  );
  status$ = this.select((state) => state.status);

  tagVersaoMaisRecente$ = this.select(this.maisRecente$, (versao) =>
    versao
      ? `${versao?.nr_versao}.${versao?.nr_implementacao}.${versao?.nr_bug}`
      : undefined
  );

  listaOrdenada$ = this.select(this.lista$, (lista) =>
    lista.sort((a, b) => b.created_at.localeCompare(a.created_at))
  );
  versoes$ = this.select(this.listaOrdenada$, (lista) =>
    [
      ...new Set(
        lista
          .filter((item) => item.tipo === 1)
          .map((item) =>
            JSON.stringify({
              tag_versao: item.tag_versao,
              no_descricao: item.no_descricao,
              created_at: item.created_at,
              build: item.nr_build,
            })
          )
      ),
    ].map((item) => JSON.parse(item))
  );
  listaAgrupada$ = this.select(
    this.versoes$,
    this.listaOrdenada$,
    (versoes, lista) =>
      versoes.map((versao) => ({
        ...versao,
        lista: lista
          .filter((item) => item.nr_build === versao.build && item.tipo !== 1)
          .sort((a, b) => b.created_at.localeCompare(a.created_at)),
      }))
  );

  // effects

  fetch = this.effect(($) =>
    $.pipe(
      takeUntil(this.destroy$),
      // filter((rede) => Boolean(rede)),
      switchMap((rede) =>
        this.controleVersaoService.getListaComBuild('varejo')
      ),
      tap((lista) => {
        this.setLista(lista);
        this.listaSalva = lista;
      }),
      catchError((error) => {
        console.error(error);
        this.setStatus('ERRO');
        return EMPTY;
      })
    )
  );

  atualizaLista() {
    this.setLista(this.listaSalva);
  }
}
