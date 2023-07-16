import { UploadService } from 'src/app/shared/services/upload.service';
import { DropdownImagensSistemaService } from './dropdown-imagens-sistema.service';
import {
  tap,
  switchMap,
  filter,
  map,
  Observable,
  withLatestFrom,
  catchError,
  EMPTY,
} from 'rxjs';

import { Injectable, inject } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

import { Arquivo } from 'src/app/shared/model/administrativo/arquivo';
import { FuncoesGeraisService } from '../../functions/funcoes-gerais.service';
export interface DropdownImagensSistemaState {
  arquivos: Arquivo[];
  carregando: boolean;
  sistema?: string;
}

const initialState: DropdownImagensSistemaState = {
  arquivos: [],
  carregando: false,
  sistema: '',
};

@Injectable()
export class DropdownImagensSistemaStore extends ComponentStore<DropdownImagensSistemaState> {
  dropdownImagensSistemaService = inject(DropdownImagensSistemaService);
  funcoesGeraisService = inject(FuncoesGeraisService);

  constructor() {
    super(initialState);
  }

  sistema$ = this.select((state) => state.sistema);
  arquivos$ = this.select((state) => state.arquivos);
  carregando$ = this.select((state) => state.carregando);

  setSistema = this.updater((state, sistema: string | undefined) => ({
    ...state,
    sistema,
  }));

  addArquivo = this.updater((state, arquivo: Arquivo) => ({
    ...state,
    arquivos: [...state.arquivos, arquivo],
  }));

  uplooad = this.effect((arquivo$: Observable<File>) =>
    arquivo$.pipe(
      withLatestFrom(this.sistema$),
      filter(([arquivo, sistema]) => Boolean(sistema) && Boolean(arquivo)),
      tap(() => this.patchState({ carregando: true })),
      switchMap(([arquivo, sistema]) =>
        this.dropdownImagensSistemaService.upload(arquivo, sistema!)
      ),
      tap((arquivo) => {
        this.addArquivo(arquivo);
      }),
      tap(() => {
        this.patchState({ carregando: false });
      }),
      catchError(() => {
        this.funcoesGeraisService.actionsForError(
          'Erro',
          'Houve um erro ao enviar o arquivo. Tente novamente'
        );
        return EMPTY;
      })
    )
  );

  init = this.effect(() =>
    this.sistema$.pipe(
      tap(() => {
        this.patchState({ carregando: true });
      }),
      filter((sistema) => {
        return Boolean(sistema);
      }),
      switchMap((sistema) => this.dropdownImagensSistemaService.get(sistema!)),
      map((arquivos) => {
        return arquivos.filter((arquivo) => arquivo.tipo.includes('image'));
      }),
      tap((arquivos) => this.patchState({ arquivos, carregando: false }))
    )
  );
}
