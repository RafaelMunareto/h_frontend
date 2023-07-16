import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import icones from './icones';
export interface Icone {
  nome: string;
  classe: string;
}
export interface AutocompleteIconesComponentStoreState {
  lista: Icone[];
  pesquisa: string;
  selecionado?: Icone;
}
@Injectable({
  providedIn: 'root'
})
export class AutocompleteIconesComponentStore extends ComponentStore<AutocompleteIconesComponentStoreState> {
  constructor() {
    super({
      lista: icones.sort((a, b) => a.nome.localeCompare(b.nome)),
      pesquisa: '',
    });
  }

  setPesquisa = this.updater((state, pesquisa: string) => ({
    ...state,
    pesquisa,
  }));

  setSelecionado = this.updater((state, classe: string) => {
    return {
      ...state,
      selecionado: state.lista.find((icone) => icone.classe === classe),
    };
  });

  lista$ = this.select((state) => state.lista);
  pesquisa$ = this.select((state) => state.pesquisa);
  selecionado$ = this.select((state) => state.selecionado);
  listaFiltrada$ = this.select(this.lista$, this.pesquisa$, (lista, pesquisa) =>
    lista.filter((icone) =>
      icone.nome.toLowerCase().includes(pesquisa.toLowerCase())
    )
  );
}
