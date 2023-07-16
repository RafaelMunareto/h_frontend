import { DatePipe, DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'NumDataType',
  standalone: true
})
export class NumDataType implements PipeTransform {

  constructor(){}

  transform(value: string | null, type: string): string {
    value = value ?? '0';
    let numberPipe = new DecimalPipe('pt-BR');
    switch (type) {
      case 'int':
        return value = numberPipe.transform(value, '0.0-0') ?? value;
      case 'curr':
        return value = numberPipe.transform(value, '1.2-2') ?? value;
      case 'curr_2':
        return value = numberPipe.transform(value, '1.0-0') ?? value;
      case 'perc':
        return numberPipe.transform(parseFloat(value) * 100, '0.0-0') + '%' ?? value;
      case 'perc_2':
        return numberPipe.transform(parseFloat(value) * 100, '1.2-2') + '%' ?? value;
      case 'dt':
        let dp = new DatePipe('pt-BR');
        return dp.transform(value, 'dd/MM/YYYY') ?? value;
    }
    return value;
  }
}
