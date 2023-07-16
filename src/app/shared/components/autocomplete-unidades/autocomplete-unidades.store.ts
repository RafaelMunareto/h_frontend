import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { debounceTime, filter, map, tap, withLatestFrom } from 'rxjs';
import { Unidade } from 'src/app/core/models/Unidade';
import { UnidadesState as UnidadesRootState } from 'src/app/core/store/unidades/unidades.reducer';
import { fromUnidades } from 'src/app/core/store/unidades/unidades.selector';

export type Status = 'IDLE' | 'LOADING' | 'SUCCESS' | 'ERROR';

export interface UnidadesState {
  unidadeSelecionada?: Unidade;
  pesquisa: string;
  lista: Unidade[];
  listaFiltrada: Unidade[];
  status: Status;
}

const initialState: UnidadesState = {
  lista: [],
  pesquisa: '',
  status: 'IDLE',
  listaFiltrada: [],
};

@Injectable()
export class AutocompleteUnidadesStore extends ComponentStore<UnidadesState> {
  constructor(private unidadesStore: Store<UnidadesRootState>) {
    super(initialState);
  }

  // ACTIONS
  setPesquisa = this.updater((state, pesquisa: string) => ({
    ...state,
    pesquisa,
  }));

  setStatus = this.updater((state, status: Status) => ({
    ...state,
    status,
  }));

  setUnidadeSelecionada = this.updater(
    (state, unidadeSelecionada: Unidade) => ({
      ...state,
      unidadeSelecionada,
    })
  );

  putUnidadeSelecionada = this.updater((state, nuUnidade: number) => ({
    ...state,
    unidadeSelecionada: state.lista.find(
      (unidade) => unidade.nu_unidade == nuUnidade
    ),
  }));

  // SELECTORS
  readonly listaRoot$ = this.unidadesStore.select(fromUnidades.lista);
  readonly lista$ = this.select((state) => state.lista);
  readonly pesquisa$ = this.select((state) => state.pesquisa);
  readonly unidadeSelecionada$ = this.select(
    (state) => state.unidadeSelecionada
  );
  readonly listaFiltrada$ = this.select((state) => state.listaFiltrada);

  selectUnidade(cgcUnidade: number) {
    return this.select((state) =>
      state.lista.find((unidade) => unidade.nu_unidade === cgcUnidade)
    );
  }
  // EFFECT
  observeListaUnidades$ = this.effect(() => {
    return this.listaRoot$.pipe(tap((lista) => this.patchState({ lista })));
  });

  observePesquisa$ = this.effect(() => {
    return this.pesquisa$.pipe(
      debounceTime(200),
      filter((pesquisa) => !!pesquisa && typeof pesquisa === 'string'),
      filter((value) => value.length >= 4),
      withLatestFrom(this.lista$),
      map(([pesquisa, lista]) =>
        lista.filter(
          (item) =>
            item.no_unidade.toUpperCase().indexOf(pesquisa.toUpperCase()) >= 0
        )
      ),
      tap((lista) => this.patchState({ listaFiltrada: lista }))
    );
  });
}
