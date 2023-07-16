import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import {
  debounceTime,
  filter,
  switchMap,
  tap,
  combineLatestWith,
  combineLatest,
  withLatestFrom,
} from 'rxjs';
import { Funcionario } from 'src/app/core/models/Funcionario';
import { Status } from '../../types/store/Status';
import { AutocompleteMatriculaService } from './autocomplete-matricula.service';

export interface AutoCompleteMatriculaState {
  lista: Funcionario[];
  pesquisa: string;
  status: Status;
  matriculaSelecionada?: string;
  funcionario?: Funcionario;
  unidadeLotacao?: number | string;
}

@Injectable()
export class AutoCompleteMatriculaStore extends ComponentStore<AutoCompleteMatriculaState> {
  constructor(
    private autoCompleteMatriculaService: AutocompleteMatriculaService
  ) {
    super({
      lista: [],
      pesquisa: '',
      status: 'INICIALIZADO',
    });
  }

  lista$ = this.select((state) => state.lista);
  pesquisa$ = this.select((state) => state.pesquisa);
  status$ = this.select((state) => state.status);
  carregando$ = this.select(this.status$, (status) => status === 'CARREGANDO');
  erro$ = this.select(this.status$, (status) => status === 'ERRO');
  sucesso$ = this.select(this.status$, (status) => status === 'SUCESSO');
  matriculaSelecionada$ = this.select((state) => state.matriculaSelecionada);
  funcionario$ = this.select((state) => state.funcionario);
  unidadeLotacao$ = this.select((state) => state.unidadeLotacao);

  setStatus = this.updater((state, status: Status) => ({
    ...state,
    status,
  }));

  setPesquisa = this.updater((state, pesquisa: string) => ({
    ...state,
    pesquisa,
  }));

  setMatricula = this.updater((state, matricula: string) => ({
    ...state,
    matriculaSelecionada: matricula,
  }));

  setUnidadeLotacao = this.updater(
    (state, unidadeLotacao: string | number) => ({
      ...state,
      unidadeLotacao,
    })
  );

  setFuncionario = this.updater((state, funcionario: Funcionario) => ({
    ...state,
    funcionario,
  }));

  fetchMatricula = this.effect(() => {
    return this.matriculaSelecionada$.pipe(
      filter((matricula) => !!matricula),
      tap(() => this.setStatus('CARREGANDO')),
      switchMap((matricula) =>
        this.autoCompleteMatriculaService.getMatricula(matricula!).pipe(
          tapResponse(
            (funcionario) => {
              this.setFuncionario(funcionario);
              this.setStatus('SUCESSO');
            },
            (error: HttpErrorResponse) => {
              console.error(error);
              this.setStatus('ERRO');
            }
          )
        )
      )
    );
  });

  pesquisar = this.effect(() =>
    this.pesquisa$.pipe(
      debounceTime(1200),
      filter((value) => value.length > 2),
      withLatestFrom(this.unidadeLotacao$),
      switchMap(([value, unidade]) =>
        this.autoCompleteMatriculaService.getSugestoes(value, unidade)
      ),
      tap((lista) => this.patchState({ lista }))
    )
  );
}
