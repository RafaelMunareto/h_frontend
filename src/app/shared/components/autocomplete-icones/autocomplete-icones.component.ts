import {
  AutocompleteIconesComponentStore,
  Icone,
} from './autocomplete-icones.component-store';
import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-autocomplete-icones',
  standalone: true,
  imports: [CommonModule, AutoCompleteModule, FormsModule],
  templateUrl: './autocomplete-icones.component.html',
  styleUrls: ['./autocomplete-icones.component.sass'],
  providers: [AutocompleteIconesComponentStore],
})
export class AutocompleteIconesComponent
  implements OnInit, OnChanges, OnDestroy
{
  @Input() showClear = true;
  @Input() floatLabel = false;
  @Input() label = 'Ícone';
  @Input() delay = 1000;
  @Input() valorInicial?: string;
  @Output() onChange = new EventEmitter<string>();

  sugestoes$ = this.store.listaFiltrada$;
  pesquisa$ = this.store.pesquisa$;
  selecionado$ = this.store.selecionado$;
  destroy$ = new Subject();
  constructor(private store: AutocompleteIconesComponentStore) {}

  focus = false;

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['valorInicial'].currentValue) {
      this.setSelecionado(changes['valorInicial'].currentValue);
    }

    this.selecionado$.subscribe((value) => {});
  }

  setPesquisa(event: any) {
    this.store.setPesquisa(event.query);
  }

  setSelecionado(classe: string) {
    this.store.setSelecionado(classe);
    this.onChange.emit(classe);
  }

  setFocus(focus: boolean) {
    this.focus = focus;
  }
}
