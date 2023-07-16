import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, filter, Subject, takeUntil } from 'rxjs';
import { InformacoesState } from 'src/app/core/store/informacoes/informacoes.reducer';
import { fromInformacoes } from 'src/app/core/store/informacoes/informacoes.selectors';

@Component({
  selector: 'app-pagina-nao-encontrada',
  templateUrl: './pagina-nao-encontrada.component.html',
  styleUrls: ['./pagina-nao-encontrada.component.sass'],
})
export class PaginaNaoEncontradaComponent implements OnInit, OnDestroy {
  constructor(
    private acessoStore: Store<InformacoesState>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  redirecionarParaRedeVarejo = true;

  destroy$ = new Subject();
  rede$ = this.acessoStore.select(fromInformacoes.rede);
  rede = '';
  ngOnInit(): void {
    if (this.redirecionarParaRedeVarejo) {
      const path = this.route.snapshot.url.map((url) => url.path).join('/');
      const queryParams = this.route.snapshot.queryParamMap.keys.length
        ? '?' +
          Object.entries(this.route.snapshot.queryParams)
            .map((key) => key.join('='))
            .join('&')
        : '';
      const redirectUrl = `http://redevarejo.caixa/frontend/#/${path}${queryParams}`;
      window.location.replace(redirectUrl);
    }
    this.rede$
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged((previous, current) => previous != current),
        filter((rede) => Boolean(rede))
      )
      .subscribe((rede) => (this.rede = rede!));
  }

  voltarAoInicio(event: any) {
    event.preventDefault();
    const path = ['/', this.rede];
    this.router.navigate(path);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
