import { informacoesActions } from './../../../store/informacoes/informacoes.actions';
import { Subject, combineLatest, map } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { InformacoesState } from 'src/app/core/store/informacoes/informacoes.reducer';
import { fromInformacoes } from 'src/app/core/store/informacoes/informacoes.selectors';
import { AuthState } from 'src/app/core/store/auth/auth.reducer';
import { fromAuth } from 'src/app/core/store/auth/auth.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  gesoonSearch = '';
  modalSimulacaoVisivel = false;

  hTemas = {
    hClass: '',
    logoRede: '',
    logoGesun: '',
    menuLogo: '',
    hashTag: { texto: '', cor: '' },
  };

  msgText: string =
    'Você foi selecionado para participar da construção do sistema Raio X Versão 3.0! Estamos redesenhando o sistema e gostaríamos de contar com você no grupo de especialistas que irão ajudar a GESUN a tornar o Raio X melhor e mais adequado às necessidades da rede através de dicas, sugestões e críticas em um grupo de trabalho no Teams. Podemos contar com mais um especialista no nosso time?';

  constructor(
    private authStore: Store<AuthState>,
    private informacoesStore: Store<InformacoesState>
  ) {}

  infoGesun$ = this.authStore.select(fromAuth.infoGesun);
  simulado$ = this.authStore.select(fromAuth.simulado);
  gesun$ = this.authStore.select(fromAuth.gesun);
  sured$ = this.infoGesun$.pipe(
    map((infoGesun) => {
      return infoGesun.lotacao === 5094 && infoGesun.ic_gestor_unidade;
    })
  );
  podeSimular$ = combineLatest([this.gesun$, this.sured$]).pipe(
    map(([gesun, sured]) => gesun || sured)
  );
  autocompleteVisivel$ = this.informacoesStore.select(
    fromInformacoes.autocompleteVisivel
  );
  autocompleteTipo$ = this.informacoesStore.select(
    fromInformacoes.autocompleteTipo
  );
  classificacao$ = this.informacoesStore.select(fromInformacoes.classificacao);
  rede$ = this.informacoesStore.select(fromInformacoes.rede);
  destroy$ = new Subject();
  headerBackgroundColor$ = this.informacoesStore.select(
    fromInformacoes.headerBackgroundColor
  );

  ngOnInit(): void {
    this.headerBackgroundColor$.subscribe((c) => {
      //console.log(c)
    });
    let monthIndex: number = new Date().getMonth() + 1;
    //monthIndex = 12;
    let arrAcoes = [8, 9, 10, 11, 12];
    let hashText: any = {
      '0': { texto: '', cor: '' },
      '2': { texto: '#mêsCarnaval', cor: '' },
      // '3': { texto: '#semanaDaMulher', cor: '#a50067' },
      '8': { texto: '#agostoLilás', cor: '#994ec3' },
      '9': { texto: '#setembroAmarelo', cor: '#614b00' },
      '10': { texto: '#outubroRosa', cor: '#a50067' },
      '11': { texto: '#novembroAzul', cor: '#375fa1' },
      '12': { texto: '#dezembroLaranja', cor: '#375fa1' },
    };
    if (!arrAcoes.includes(monthIndex)) {
      monthIndex = 0;
    }
    this.hTemas = {
      hClass: 'header-' + monthIndex,
      logoRede: 'assets/img/logos/logo_rede_varejo_' + monthIndex + '.png',
      logoGesun: 'assets/img/logos/logo_gesun_' + monthIndex + '.png',
      menuLogo: 'assets/img/logos/logo_menu_' + monthIndex + '.png',
      hashTag: hashText[monthIndex.toString()],
    };
  }

  ngOnDestroy(): void {
    if (this.destroy$) this.destroy$.next(true);
  }

  abreModalSimulacao(): void {
    this.modalSimulacaoVisivel = true;
  }

  fechaModalSimulacao(): void {
    this.modalSimulacaoVisivel = false;
  }

  onAutocompleteSelectHandler(selecao: any): void {
    this.informacoesStore.dispatch(
      informacoesActions.setAutocompleteHeaderSelecionado({ selecao })
    );
  }

  searchIt() {
    window.location.href = `http://redevarejo.caixa/#/gesoon/pesquisa?s=${this.gesoonSearch}&p=1&c=0&t=padrao`;
  }
}
