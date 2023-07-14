import { fromInformacoes } from './../../store/informacoes/informacoes.selectors';
import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { InformacoesState } from '../../store/informacoes/informacoes.reducer';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Subject, filter, takeUntil } from 'rxjs';
import { SegmentoNormalizado } from 'src/app/pages/home/shared/model/ferramentas';
import { AuthState } from '../../store/auth/auth.reducer';
import { fromAuth } from '../../store/auth/auth.selectors';
import { SegmentoStore } from 'src/app/pages/home/segmento.store';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styles: [
    `.app-container
        min-height: calc(100vh - 126px)`,
  ],
})
export class LayoutComponent implements OnInit, OnDestroy {
  estiloScrollPanel = {
    width: '100%',
    height: '100%',
  };

  appBackground: string = '';
  @Input() padrao?: any;
  backgroundColor$ = this.informacoesStore.select(
    fromInformacoes.backgroundColor
  );
  ehHome = false;
  showToolbar: boolean = true;
  destroy$ = new Subject();

  //NOVO HEADER
  segmentoEscolhido: SegmentoNormalizado = {} as SegmentoNormalizado;

  constructor(
    private informacoesStore: Store<InformacoesState>,
    private route: Router,
    private segState: SegmentoStore,
    ) {}
    
  
  ngOnDestroy(): void {
    this.destroy$.next(new Date().getTime());
  }

  ngOnInit(): void {

    this.segState.getSegmentoSelecionado.subscribe({
      next: (s) => {
        if (s) {
          this.segmentoEscolhido = s;
        }
      },
    });

    this.route.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.verificaRota();
      });

    this.verificaRota();
  }

  verificaRota() {
    this.showToolbar = !this.route.url.includes('poopshield');
    this.ehHome = this.route.url.startsWith('/home');
  }
}
