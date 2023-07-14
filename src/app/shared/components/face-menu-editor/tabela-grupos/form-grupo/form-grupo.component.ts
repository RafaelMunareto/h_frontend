import { Subject, takeUntil } from 'rxjs';
import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IsValidDateAfterValidator } from 'src/app/shared/validators/valid-date-after.validator';
import { IsValidDateValidator } from 'src/app/shared/validators/valid-date.validator';
import {
  Grupo,
  Exibicao,
  Decoracao,
  FormGroupForm,
} from '../../face-menu-editor.model';

@Component({
  selector: 'app-form-grupo',
  templateUrl: './form-grupo.component.html',
  styleUrls: ['./form-grupo.component.sass'],
})
export class FormGrupoComponent implements OnInit, OnChanges {
  @Input() grupo?: Grupo;
  @Input() exibicoes: Exibicao[] = [];
  @Input() decoracoes: Decoracao[] = [];
  @Output() onFormValueChange = new EventEmitter<FormGroupForm>();

  form: FormGroup = this.formBuilder.group({
    exibicao_id: [null, [Validators.required, Validators.min(1)]],
    decoracao_id: [null, [Validators.min(1)]],
    no_grupo: ['', [Validators.required, Validators.maxLength(200)]],
    no_descricao: ['', [Validators.maxLength(1000)]],
    ordem: [null, [Validators.required, Validators.min(1)]],
    validade_inicio: [null, [Validators.required, IsValidDateValidator]],
    validade_fim: [null, [IsValidDateAfterValidator('validade_inicio')]],
    fixo: [null, []],
  });

  destroy$ = new Subject();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) =>
        this.onFormValueChange.emit(value as FormGroupForm)
      );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['grupo']) {
      this.carregaValoresForm();
    }
  }


  carregaValoresForm() {
    if (!this.grupo) {
      return;
    }
    const values = { ...this.grupo };
    this.form.patchValue(values);
  }
}
