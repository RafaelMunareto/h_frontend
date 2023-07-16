import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Unidade } from 'src/app/core/models/Unidade';
import { PrimengExptsModule } from '../../utils/primeng-expts/primeng-expts.module';
import { AutocompleteUnidadesStore } from './autocomplete-unidades.store';
import { AutoComplete } from 'primeng/autocomplete';

@Component({
  standalone: true,
  selector: 'app-autocomplete-unidades',
  template: `
    <p-autoComplete
      #ac
      [ngModel]="unidadeSelecionada$ | async"
      (completeMethod)="alteraSelecionado($event)"
      [suggestions]="(listaFiltrada$ | async) ?? []"
      (onSelect)="onSelectHandler($event)"
      field="no_unidade"
      appendTo="body"
      inputStyleClass="w-full"
      styleClass="block"
      class="flex-grow-1"
      [disabled]="disabled"
      [showClear]="showClear"
      (onClear)="onClearHandler()"
    ></p-autoComplete>
  `,
  imports: [CommonModule, FormsModule, PrimengExptsModule],
  providers: [AutocompleteUnidadesStore],
})
export class AutocompleteUnidadesComponent implements OnInit {

  @ViewChild('ac') ac?:AutoComplete;

  @Output() onChange = new EventEmitter<string>();
  @Input() disabled = false;
  @Input() showClear = false;
  @Input()
  set nuUnidade(value: number | undefined) {
    if (value) {
      this.store.putUnidadeSelecionada(value);
    }
  }

  lista$ = this.store.lista$;
  listaFiltrada$ = this.store.listaFiltrada$;
  unidadeSelecionada$ = this.store.unidadeSelecionada$;

  constructor(private store: AutocompleteUnidadesStore) {}

  ngOnInit() {}

  alteraSelecionado(pesquisa: any): void {
    this.store.setPesquisa(pesquisa.query);
  }

  onSelectHandler(unidade: Unidade): void {
    this.store.setUnidadeSelecionada(unidade);
    this.onChange.emit(String(unidade.nu_unidade));
  }

  onClearHandler(): void {
    this.onChange.emit('');
  }

  // Limpa manualmente o campo de autocomplete
  // Utilize o @ViewChild para poder chamar esse método
  onClear() : void {
    this.ac?.clear();
  }

}
