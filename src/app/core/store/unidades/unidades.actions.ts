import { createAction, props } from '@ngrx/store';
import { Unidade } from '../../models/Unidade';
import { FiltroStoreUnidades } from './unidades.reducer';

const fetch = createAction('[Unidades] Fetch');
const sucesso = createAction(
  '[Unidades] Sucesso',
  props<{ lista: Unidade[] | undefined }>()
);
const erro = createAction('[Unidades] erro');
const seleciona = createAction(
  '[Unidades] seleciona',
  props<{ cgc: number | undefined }>()
);
const filtra = createAction(
  '[Unidades] filtra',
  props<{ filtro: FiltroStoreUnidades }>()
);

const alteraListaFiltrada = createAction(
  '[Unidades] alteraListaFiltrada',
  props<{ lista: Unidade[] }>()
);

const setUnidadeLotacao = createAction(
  '[Unidades] setUnidadeLotacao',
  props<{ cgc: number }>()
);
export const unidadesActions = {
  fetch,
  sucesso,
  erro,
  seleciona,
  filtra,
  alteraListaFiltrada,
  setUnidadeLotacao,
};
