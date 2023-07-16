import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoComplete, AutoCompleteModule } from 'primeng/autocomplete';
import { SkeletonModule } from 'primeng/skeleton';
import { AutocompleteMatriculaService } from './autocomplete-matricula.service';
import { AutoCompleteMatriculaStore } from './autocomplete-matricula.store';

@Component({
  selector: 'app-autocomplete-matricula',
  templateUrl: './autocomplete-matricula.component.html',
  styleUrls: ['./autocomplete-matricula.component.sass'],
  providers: [AutoCompleteMatriculaStore, AutocompleteMatriculaService],
  imports: [AutoCompleteModule, FormsModule, CommonModule, SkeletonModule],
  standalone: true,
})
export class AutocompleteMatriculaComponent implements OnInit, OnChanges {
  constructor(private autoCompleteMatriculaStore: AutoCompleteMatriculaStore) {}

  @Input() set unidade(unidade: number | string | undefined | null) {
    // console.log(unidade);
    if (unidade) this.autoCompleteMatriculaStore.setUnidadeLotacao(unidade);
  }

  @ViewChild('ac') ac?:AutoComplete;

  @Input() showLabel = true;
  @Input() disabled = false;
  @Input() showClear = false;
  @Input() modalClear = false;
  @Input() matricula?: string;
  @Input() className: string = '';

  @Output() onChange = new EventEmitter<string>();

  lista$ = this.autoCompleteMatriculaStore.lista$;
  pesquisa$ = this.autoCompleteMatriculaStore.funcionario$;
  carregando$ = this.autoCompleteMatriculaStore.carregando$;

  ngOnInit(): void {  }

  ngOnChanges(changes: SimpleChanges): void {
    // Verifica se matricula está definida e é diferente da anterior
    if (
      changes['matricula']?.currentValue !== changes['matricula']?.previousValue
    ) {
      this.autoCompleteMatriculaStore.setMatricula(this.matricula ?? '');
    }
  }

  mudaValorPesquisa(event: any): void {
    this.autoCompleteMatriculaStore.setPesquisa(event.query);
  }

  onClearHandler(): void {
    this.onChange.emit('');
  }

  // Limpa manualmente o campo de autocomplete
  // Utilize o @ViewChild para poder chamar esse método
  onClear(): void {
    this.ac?.clear();
  }
}
