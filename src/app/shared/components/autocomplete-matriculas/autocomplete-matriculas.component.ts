import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { SkeletonModule } from 'primeng/skeleton';
import { lastValueFrom } from 'rxjs';
import { AutocompleteMatriculasService } from './autocomplete-matriculas.service';
import isEqual from 'lodash-es/isEqual';

@Component({
  selector: 'app-autocomplete-matriculas',
  template: `
    <p-autoComplete
      [(ngModel)]="matriculas"
      appendTo="body"
      [suggestions]="results"
      (completeMethod)="search($event)"
      field="matriculaNome"
      [disabled]="disabled"
      [showClear]="showClear"
      (onClear)="onClearHandler()"
      [multiple]="true"
    ></p-autoComplete>
  `,
  styles: [],
  providers: [AutocompleteMatriculasService],
  imports: [AutoCompleteModule, FormsModule, CommonModule, SkeletonModule],
  standalone: true,
})
export class AutocompleteMatriculasComponent implements OnInit, OnChanges {
  constructor(private service: AutocompleteMatriculasService) {}

  @Input() showLabel = true;
  @Input() disabled = false;
  @Input() showClear = false;

  private _matriculas: any = [];

  @Input() set matriculas(values: any) {
    this.onChange.emit(values);
    this._matriculas = values;
  }

  get matriculas() {
    return this._matriculas;
  }

  results: any[] = [];

  @Output() onChange = new EventEmitter<string>();

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    // Verifica se matricula está definida e é diferente da anterior
    if (
      changes['matriculas']?.currentValue &&
      !isEqual(
        changes['matriculas']?.currentValue,
        changes['matriculas']?.previousValue
      )
    ) {
      this._matriculas = changes['matriculas']?.currentValue;
    }
  }

  search(event: any) {
    const fetchMunicipio$ = this.service.getSugestoes(event.query);
    lastValueFrom(fetchMunicipio$).then((data: any) => {
      this.results = data;
    });
  }

  onClearHandler(): void {
    this.onChange.emit('');
  }
}
