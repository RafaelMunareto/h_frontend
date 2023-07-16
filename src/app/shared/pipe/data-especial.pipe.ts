import { Pipe, PipeTransform } from '@angular/core';
import dayjs from 'src/app/shared/utils/dayjs';

@Pipe({
  standalone: true,
  name: 'dataEspecial',
})
export class DataEspecialPipe implements PipeTransform {
  transform(value: any): string {
    return dayjs(value).fromNow();
  }
}
