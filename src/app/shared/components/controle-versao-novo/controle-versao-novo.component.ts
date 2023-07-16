import { ControleVersaoStore } from './controle-versao-novo.store';
import { Component, OnInit } from '@angular/core';
import { AuthState } from 'src/app/core/store/auth/auth.reducer';
import { Store } from '@ngrx/store';
import { fromAuth } from 'src/app/core/store/auth/auth.selectors';

import { ControleVersaoNovoService } from './controle-versao-novo.service';

@Component({
  selector: 'app-controle-versao-novo',
  templateUrl: './controle-versao-novo.component.html',
  styleUrls: ['./controle-versao-novo.component.sass'],
})
export class ControleVersaoNovoComponent implements OnInit {
  constructor(
    private controleVersaoService: ControleVersaoNovoService,
    private controleVersaoStore: ControleVersaoStore,
    private authStore: Store<AuthState>
  ) {}

  tagVersaoMaisRecente$ = this.controleVersaoStore.tagVersaoMaisRecente$;
  listaAgrupada$ = this.controleVersaoStore.listaAgrupada$;

  listaSistema: any[] = [];
  visivel = false;
  gesun$ = this.authStore.select(fromAuth.gesun);

  ngOnInit(): void {
    this.controleVersaoService.getDropdownBuildado().subscribe((lista) => {
      this.listaSistema = lista;
    });
    this.controleVersaoStore.fetch();
  }

  changeSistema(event: any) {
    this.controleVersaoStore.sistemaSelecionado = event.value ?? 0;
    this.controleVersaoStore.atualizaLista();
  }

  closeModal() {
    this.controleVersaoStore.sistemaSelecionado = 'RedeVarejo';
    this.controleVersaoStore.atualizaLista();
  }
}
