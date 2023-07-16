import { Action, createReducer, on } from '@ngrx/store';
import { Status } from 'src/app/shared/types/store/Status';
import { Unidade } from '../../models/Unidade';
import { unidadesActions } from './unidades.actions';

export type FiltroStoreUnidades =
  | 'rv'
  | 'rv_matriz'
  | 'rva'
  | 'rva_matriz'
  | 'rvd'
  | 'rvd_matriz'
  | 'subordinadas'
  | 'todas';
export interface UnidadesState {
  lista: Unidade[] | undefined;
  listaFiltrada: Unidade[];
  selecionada?: number;
  unidadeSelecionada?: Unidade;
  status: Status;
  filtro: FiltroStoreUnidades;
  lotacao?: number;
}

export const unidadesFeatureKey = 'unidades';

const initialState: UnidadesState = {
  lista: [],
  listaFiltrada: [],
  status: 'INICIALIZADO',
  filtro: 'rv',
};

const reducer = createReducer<UnidadesState>(
  initialState,
  on(unidadesActions.fetch, (state) => ({
    ...state,
    status: 'CARREGANDO',
  })),
  on(unidadesActions.sucesso, (state, { lista }) => {
    return {
      ...state,
      lista,
      unidadeSelecionada: lista?.find(
        (u) => u.nu_unidade === state.selecionada
      ),
      status: 'SUCESSO',
    };
  }),

  on(unidadesActions.erro, (state) => ({
    ...state,
    status: 'ERRO',
  })),
  on(unidadesActions.seleciona, (state, { cgc }) => {
    return {
      ...state,
      selecionada: cgc,
      unidadeSelecionada: state.lista?.find(
        (unidade) => unidade.nu_unidade === cgc
      ),
    };
  }),
  on(unidadesActions.filtra, (state, { filtro }) => {
    return {
      ...state,
      filtro,
    };
  }),
  on(unidadesActions.setUnidadeLotacao, (state, { cgc }) => ({
    ...state,
    lotacao: cgc,
  }))
);

export function unidadesReducer(
  state: UnidadesState | undefined,
  action: Action
) {
  return reducer(state, action);
}
