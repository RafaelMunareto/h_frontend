import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'email',
  standalone: true,
})
export class EmailPipe implements PipeTransform {
  transform(value: string) {
    return 'mailto:' + value + '@caixa.gov.br';
  }
}
