import { Unidade } from 'src/app/core/models/Unidade';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { unidadesFeatureKey, UnidadesState } from './unidades.reducer';

const state = createFeatureSelector<UnidadesState>(unidadesFeatureKey);

const filtro = createSelector(state, (state) => state.filtro);

const lista = createSelector(state, (state) => state.lista ?? []);

const unidadesVired = createSelector(lista, (lista) =>
  lista.filter(
    (unidade) => unidade.nu_sup3x === 5819 && unidade.nu_unidade !== 5819
  )
);

const unidadeLotacao = createSelector(state, (state) => state.lotacao);

const cgcSelecionado = createSelector(state, (state) => state.selecionada);

const agencias = createSelector(unidadesVired, (state) =>
  state.filter((unidade) => ['PA', 'AG'].includes(unidade.tipo_unidade))
);

const srs = createSelector(unidadesVired, (state) =>
  state.filter((unidade) => unidade.tipo_unidade === 'SR')
);

const sevs = createSelector(unidadesVired, (state) =>
  state.filter((unidade) => unidade.tipo_unidade === 'SEV')
);

const redeFisica = createSelector(unidadesVired, (state) =>
  state.filter((unidade) => {
    return unidade.tipo_rede === 'REDE FISICA' && unidade.nu_unidade != 5819;
  })
);

const redeDigital = createSelector(unidadesVired, (state) =>
  state.filter(
    (unidade) =>
      unidade.tipo_rede === 'REDE DIGITAL' && unidade.nu_unidade != 5819
  )
);

const redePrivate = createSelector(unidadesVired, (state) =>
  state.filter(
    (unidade) =>
      unidade.tipo_rede === 'REDE PRIVATE' && unidade.nu_unidade != 5819
  )
);

const redeSingular = createSelector(unidadesVired, (state) =>
  state.filter(
    (unidade) =>
      unidade.tipo_rede === 'REDE SINGULAR' && unidade.nu_unidade != 5819
  )
);

const redeAgro = unidadesVired;

const redeAgroSelVarejo = createSelector(unidadesVired, (state) =>
  state.filter(
    (unidade) =>
      unidade.tipo_rede === 'REDE AGRONEGOCIOS' && unidade.nu_unidade != 5819
  )
);

const redeHabitacao = createSelector(unidadesVired, (state) =>
  state.filter(
    (unidade) =>
      unidade.tipo_rede === 'REDE HABITACAO' && unidade.nu_unidade != 5819
  )
);

const redeGoverno = createSelector(unidadesVired, (state) =>
  state.filter(
    (unidade) =>
      unidade.tipo_rede === 'REDE GOVERNO' && unidade.nu_unidade != 5819
  )
);

const tiposUnidade = createSelector(unidadesVired, (state) =>
  [...new Set(state.map((unidade) => unidade.tipo_unidade))].sort((a, b) =>
    a.localeCompare(b)
  )
);

const vired = createSelector(lista, (state) =>
  state.find((unidade) => Number(unidade.nu_unidade) === 5819)
);

const snsVired = createSelector(unidadesVired, (lista) =>
  lista.filter(
    (unidade) => unidade.nu_sup3x === 5819 && unidade.tipo_unidade == 'SN'
  )
);

const gnsVired = createSelector(unidadesVired, (lista) => {
  return lista.filter(
    (unidade) => unidade.nu_sup3x === 5819 && unidade.tipo_unidade == 'GN'
  );
});

const redeVarejo = createSelector(
  vired,
  redeFisica,
  redeDigital,
  redeAgroSelVarejo,
  redePrivate,
  redeSingular,
  redeHabitacao,
  redeGoverno,
  (
    vired,
    redeFisica,
    redeDigital,
    redeAgroSelVarejo,
    redePrivate,
    redeSingular,
    redeHabitacao,
    redeGoverno
  ) =>
    (vired
      ? [
          vired,
          ...redeFisica,
          ...redeDigital,
          ...redeAgroSelVarejo,
          ...redePrivate,
          ...redeSingular,
          ...redeHabitacao,
          ...redeGoverno,
        ]
      : [
          ...redeFisica,
          ...redeDigital,
          ...redeAgroSelVarejo,
          ...redePrivate,
          ...redeSingular,
          ...redeHabitacao,
          ...redeGoverno,
        ]
    ).sort((a, b) => a.nu_unidade - b.nu_unidade)
);

const redeVarejoEspecializada = createSelector(
  vired,
  redeAgro,
  redeDigital,
  (vired, redeAgro, redeDigital) =>
    (vired
      ? [vired, ...redeAgro, ...redeDigital]
      : [...redeAgro, ...redeDigital]
    ).sort((a, b) => a.nu_unidade - b.nu_unidade)
);

const status = createSelector(state, (state) => state.status);

const carregando = createSelector(status, (state) => state === 'CARREGANDO');

const sucesso = createSelector(status, (state) => state === 'SUCESSO');

const erro = createSelector(status, (state) => state === 'ERRO');

const tiposRede = createSelector(lista, (state) =>
  [...new Set(state.map((unidade) => unidade.tipo_rede))]
    .filter((tipo) => tipo)
    .sort((a, b) => (a ?? '').localeCompare(b ?? ''))
);

const subordinadas = createSelector(
  lista,
  unidadeLotacao,
  vired,
  (lista, unidadeLotacao, vired) => {
    let unidade = lista.find((l) => l.nu_unidade === unidadeLotacao);
    if (!['AG', 'PA', 'SR', 'SEV'].includes(unidade?.tipo_unidade ?? '')) {
      unidade = vired;
    }
    // SR AGRO
    if (unidade?.nu_unidade === 5250) {
      return lista.filter(
        (l) =>
          (['AG', 'PA'].includes(l.tipo_unidade) &&
            l.tipo_rede?.includes('AGRO')) ||
          l.nu_unidade === 5250
      );
    }
    // SR DIGITAL
    if (unidade?.nu_unidade === 6989) {
      return lista.filter(
        (l) =>
          (['AG', 'PA'].includes(l.tipo_unidade) &&
            l.tipo_rede?.includes('DIGITAL')) ||
          l.nu_unidade === 6989
      );
    }
    // DEMAIS UNIDADES
    // console.log(unidade);

    return lista
      .filter((l) => ['AG', 'PA', 'SR', 'SEV', 'VP'].includes(l.tipo_unidade))
      .filter(
        (l) =>
          l.nu_unidade === unidade?.nu_unidade ||
          l.nu_sup === unidade?.nu_unidade ||
          l.nu_sup2x === unidade?.nu_unidade ||
          l.nu_sup3x === unidade?.nu_unidade
      );
  }
);

const listaFiltrada = createSelector(
  lista,
  filtro,
  redeVarejo,
  redeDigital,
  redeAgro,
  snsVired,
  gnsVired,
  subordinadas,
  vired,
  (
    listaTodos,
    filtro,
    redeVarejo,
    redeDigital,
    redeAgro,
    snsVired,
    gnsVired,
    subordinadas,
    vired
  ) => {
    let lista: Unidade[] = [];
    switch (filtro) {
      case 'todas':
        lista = [...listaTodos];
        break;
      case 'subordinadas':
        lista = subordinadas;
        break;
      case 'rv':
        lista = redeVarejo;
        break;
      case 'rv_matriz':
        lista = [...redeVarejo, ...snsVired, ...gnsVired];
        break;
      case 'rvd':
        lista = vired ? [...redeDigital, vired] : redeDigital;
        break;
      case 'rvd_matriz':
        lista = vired
          ? [...redeDigital, vired, ...gnsVired, ...snsVired]
          : [...redeDigital, ...gnsVired, ...snsVired];
        break;
      case 'rva':
        lista = vired ? [...redeAgro, vired] : redeAgro;
        break;
      case 'rva_matriz':
        lista = vired
          ? [...redeAgro, vired, ...snsVired, ...gnsVired]
          : [...redeAgro, ...snsVired, ...gnsVired];
        break;
      default:
        return redeVarejo;
    }
    return lista.sort((a, b) => (a?.nu_unidade ?? -1) - (b?.nu_unidade ?? -1));
  }
);

const unidadesSubordinadas = createSelector(
  lista,
  cgcSelecionado,
  (lista, nu_unidade) =>
    lista.filter(
      (unidade) =>
        unidade.nu_unidade !== nu_unidade &&
        (unidade.nu_sup === nu_unidade ||
          unidade.nu_sup2x === nu_unidade ||
          unidade.nu_sup3x === nu_unidade)
    )
);

const tiposUnidadesSubordinadas = createSelector(
  unidadesSubordinadas,
  (lista) => [...new Set(lista.map((unidade) => unidade.tipo_unidade))].sort()
);

// const selecionada = createSelector(state, (state) => state.unidadeSelecionada);

const selecionada = createSelector(cgcSelecionado, lista, (cgc, lista) => {
  return lista.find((unidade) => Number(unidade.nu_unidade) == cgc);
});

const infoUnidade = (cgc: number) =>
  createSelector(lista, (lista) =>
    lista.find((unidade) => Number(unidade.nu_unidade) === cgc)
  );

export const fromUnidades = {
  lista,
  cgcSelecionado,
  selecionada,
  agencias,
  srs,
  sevs,
  redeAgro,
  redeDigital,
  redeFisica,
  redeGoverno,
  redeHabitacao,
  redePrivate,
  redeSingular,
  tiposUnidade,
  tiposRede,
  vired,
  snsVired,
  gnsVired,
  redeVarejo,
  redeVarejoEspecializada,
  carregando,
  sucesso,
  erro,
  listaFiltrada,
  unidadesSubordinadas,
  tiposUnidadesSubordinadas,
  filtro,
  infoUnidade,
};
