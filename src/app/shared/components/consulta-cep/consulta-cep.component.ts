import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FuncoesGeraisService } from 'src/app/shared/functions/funcoes-gerais.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-consulta-cep',
  template: `
    <div class="p-inputgroup">
      <input
        type="text"
        pInputText
        [(ngModel)]="cep"
        placeholder="CEP"
        mask="00000-000"
      />
      <button
        type="button"
        pButton
        pRipple
        (click)="search()"
        icon="pi pi-search"
        [loading]="loading"
        [disabled]="disabled"
      ></button>
    </div>
  `,
  styleUrls: [],
})
export class ConsultaCepComponent implements OnInit {
  @Input() set value(value: string) {
    this.cep = (value || '').replace(/\D/g, '');
  }
  private _cep = '';
  get cep() {
    return this._cep;
  }
  set cep(cep: string) {
    this._cep = cep;
    this.disabled = String(cep).length <= 0;
  }
  address?: Endereco;
  loading = false;
  disabled = true;
  @Output() onGetEndereco = new EventEmitter<Endereco | undefined>();

  constructor(
    private http: HttpClient,
    private funcoesGerais: FuncoesGeraisService
  ) {}

  ngOnInit(): void {}

  async search() {
    this.loading = true;

    try {
      const http$ = this.http.get<Endereco>(
        `https://viacep.com.br/ws/${(this.cep || '').replace(/\D/g, '')}/json/`
      );

      const data = await lastValueFrom(http$);

      if (data.erro) {
        throw new Error('CEP não encontrado');
      }

      this.address = data;
      this.onGetEndereco.emit(data);
    } catch (error) {
      this.funcoesGerais.actionsForError(
        'Erro',
        'Houve um erro ao consultar o CEP. Corrija o número ou tente novamente.'
      );
      console.error(error);
    } finally {
      this.loading = false;
    }
  }
}
export interface Endereco {
  bairro: string;
  cep: string;
  complemento: string;
  ddd: string;
  gia: string;
  ibge: string;
  localidade: string;
  logradouro: string;
  siafi: string;
  uf: string;
  erro?: boolean;
}
