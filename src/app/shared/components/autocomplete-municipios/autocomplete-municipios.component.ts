import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { SkeletonModule } from 'primeng/skeleton';
import { lastValueFrom } from 'rxjs';
import { AutocompleteMunicipiosService } from './autocomplete-municipios.service';

@Component({
  selector: 'app-autocomplete-municipios',
  templateUrl: './autocomplete-municipios.component.html',
  styleUrls: ['./autocomplete-municipios.component.sass'],
  imports: [AutoCompleteModule, FormsModule, CommonModule, SkeletonModule],
  providers: [AutocompleteMunicipiosService],
  standalone: true,
})
export class AutocompleteMunicipiosComponent implements OnInit {
  @Input() showLabel = true;
  @Output() onChange = new EventEmitter<any>();

  results: any[] = [];
  carregando = false;

  _municipio: any;
  get municipio() {
    return this._municipio;
  }
  set municipio(_municipio) {
    this._municipio = _municipio;
    this.onChange.emit(_municipio);
  }

  constructor(private service: AutocompleteMunicipiosService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    // Verifica se matricula está definida e é diferente da anterior
    if (
      changes['municipio']?.currentValue &&
      changes['municipio']?.currentValue !== changes['municipio']?.previousValue
    ) {
      // this.autoCompleteMatriculaStore.setMatricula(this.matricula ?? '');
    }
  }

  search(event: any) {
    const fetchMunicipio$ = this.service.fetchQueryMunicipio(event.query);
    lastValueFrom(fetchMunicipio$).then((data: any) => {
      this.results = data;
    });
  }
}
