import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unidade',
  standalone: true,
})
export class UnidadePipe implements PipeTransform {
  transform(value: string | number): string {
    return String(value).padStart(4, '0');
  }
}
