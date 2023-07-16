import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-field-error',
  template: `
    <p-message
      severity="error"
      *ngIf="errorMessage"
      text="{{ errorMessage }}"
    ></p-message>
  `,
  styleUrls: ['./form-field-error.component.sass'],
})
export class FormFieldErrorComponent implements OnInit {
  @Input('form-control')
  formControl: any = new FormControl();

  constructor() { }

  ngOnInit() { }

  public get errorMessage(): string | null {
    if (this.mustShowErrorMessage()) return this.getErrorMessage();
    else return null;
  }

  private mustShowErrorMessage(): boolean {
    return this.formControl?.invalid && this.formControl.touched;
  }

  private getErrorMessage(): string | null {
    if (this.formControl.errors?.required) return 'Dado obrigatório';
    else if (this.formControl.errors?.email) return 'Formato de email inválido';
    else if (this.formControl.errors?.minlength) {
      const requiredLength = this.formControl.errors.minlength.requiredLength;
      return `Deve ter no mínimo ${requiredLength} caracteres`;
    } else if (this.formControl.errors?.maxlength) {
      const requiredLength = this.formControl.errors.maxlength.requiredLength;
      return `Deve ter no máximo ${requiredLength} caracteres`;
    } else if (this.formControl.errors?.lowerCase) {
      return 'Os caracteres devem ser iguais';
    } else if (this.formControl.errors?.lowerCase) {
      return 'Os caracteres devem ser iguais';
    }

    return null;
  }
}
