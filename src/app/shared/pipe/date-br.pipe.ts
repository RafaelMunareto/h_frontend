import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  standalone: true,
    name: 'dateBrPipe',
})
export class DateBrPipe implements PipeTransform {
    transform(value: any) {
      var datePipe = new DatePipe("pt-BR");
      value = datePipe.transform(value, 'dd/MM/yyyy hh:mm:ss');
      return value;
    }
}

