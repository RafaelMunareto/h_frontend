import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Unidade } from 'src/app/core/models/Unidade';
import { fromUnidades } from 'src/app/core/store/unidades/unidades.selector';
import { UnidadeStore } from 'src/app/pages/varejo/rede-responde/resposta/formulario/campo/tipos-campos/unidade/unidade.store';
import { FuncoesGeraisService } from '../../functions/funcoes-gerais.service';


@Component({
  selector: 'app-avisos-gerais',
  templateUrl: './avisos-gerais.component.html',
  styleUrls: ['./avisos-gerais.component.sass'],
})
export class AvisosGeraisComponent implements OnInit {

  @Input() innerHtml:string = '';
  @Input() showMsg:boolean = false;



  constructor() { }

  ngOnInit(): void {

  }

}
