import { Pipe, PipeTransform } from '@angular/core';
import { formatMaskCpf } from '../utils/string-fmt';

@Pipe({
  name: 'cpf',
})
export class CpfPipe implements PipeTransform {
  transform(value: any): unknown {
    if (!value) return '';

    return formatMaskCpf(`${value}`);
  }
}
