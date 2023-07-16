import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'cpfcnpj',
  standalone: true,
})
@Injectable({
  providedIn: 'root',
})
export class CpfCnpjPipe implements PipeTransform {
  transform(value: any, mascarar: boolean = false): string {
    if (!value) return '';
    value = String(value);
    let primeiraParte, segundaParte, terceiraParte, quartaParte, digito;
    if (!value && value.length < 10) {
      return value;
    }
    if (value.length < 12) {
      primeiraParte = value.substr(0, 3);
      segundaParte = mascarar ? '***' : value.substr(3, 3);
      terceiraParte = mascarar ? '***' : value.substr(6, 3);
      digito = value.substr(-2);

      return `${primeiraParte}.${segundaParte}.${terceiraParte}-${digito}`;
    } else {
      primeiraParte = value.substr(0, 2);
      segundaParte = mascarar ? '***' : value.substr(2, 3);
      terceiraParte = mascarar ? '***' : value.substr(5, 3);
      quartaParte = mascarar = value.substr(8, 4);
      digito = value.substr(12);

      return `${primeiraParte}.${segundaParte}.${terceiraParte}/${quartaParte}-${digito}`;
    }
  }
}
