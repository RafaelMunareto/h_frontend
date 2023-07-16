import { tap, switchMap } from 'rxjs/operators';
import { fromUnidades } from './unidades.selector';
import { UnidadesState } from 'src/app/core/store/unidades/unidades.reducer';
import { Router, ActivationStart } from '@angular/router';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  takeUntil,
  map,
  mergeMap,
  of,
  filter,
  distinctUntilChanged,
  Subject,
  EMPTY,
  withLatestFrom,
} from 'rxjs';
import { UnidadesService } from './unidades.service';
import { unidadesActions } from './unidades.actions';
import { Store } from '@ngrx/store';

@Injectable()
export class UnidadesEffects {
  destroy$ = new Subject();

  constructor(
    private actions$: Actions,
    private unidadesService: UnidadesService,
    private router: Router,
    private unidadesStore: Store<UnidadesState>
  ) {}

  OnDestroy() {
    this.destroy$.next(true);
  }
  setFiltros$ = createEffect(() =>
    this.router.events.pipe(
      takeUntil(this.destroy$),
      filter((event: any) => event instanceof ActivationStart),
      distinctUntilChanged(),
      filter((event) => event.snapshot.data?.['unidades']),
      map((event: any) => {
        const filtro = event.snapshot.data?.['unidades']?.['filtro'] ?? 'rv';
        return unidadesActions.filtra({ filtro });
      })
    )
  );

  fetchLocalStorage$ = createEffect(() =>
    this.actions$.pipe(
      takeUntil(this.destroy$),
      ofType(unidadesActions.fetch),
      map(() => this.unidadesService.getLocalStorage()),
      filter((lista) => (lista ?? []).length > 0),
      map((lista) => unidadesActions.sucesso({ lista: lista! }))
    )
  );

  fetchUnidades$ = createEffect(() =>
    this.actions$.pipe(
      takeUntil(this.destroy$),
      ofType(unidadesActions.fetch),
      map(() => this.unidadesService.getLocalStorage()),

      filter((lista) => {
        return (lista ?? []).length === 0;
      }),
      switchMap(() => {
        return this.unidadesService.fetch();
      }),
      filter((lista) => Array.isArray(lista)),
      tap((lista) => this.unidadesService.setLocalStorage(lista)),
      map((lista) => {
        return unidadesActions.sucesso({ lista });
      })
    )
  );

  corrigeUnidadeSelecionada$ = createEffect(() =>
    this.unidadesStore.select(fromUnidades.listaFiltrada).pipe(
      withLatestFrom(this.unidadesStore.select(fromUnidades.cgcSelecionado)),
      filter(([lista, cgc]) => Boolean(lista.length) && Boolean(cgc)),
      // tap(() => console.log('aqui')),
      map(([lista, selecionado]) => {
        let cgc = selecionado ?? 5819;

        if (!lista.find((unidade) => unidade.nu_unidade === selecionado)) {
          cgc = 5819;
        }
        return unidadesActions.seleciona({ cgc });
      })
    )
  );
}
