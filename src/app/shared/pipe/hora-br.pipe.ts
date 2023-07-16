import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'HoraBr',
})
export class HoraBr implements PipeTransform {
  transform(value: any, includeSeconds = true) {
    var datePipe = new DatePipe('pt-BR');
    let transformationString = 'HH:mm';
    if (includeSeconds) {
      transformationString += ':ss'
    }
    value = datePipe.transform(value, transformationString);
    return value;
  }
}
