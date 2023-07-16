import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'joinArray',
  standalone: true,
})
export class JoinArrayPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    if (!value || !Array.isArray(value)) return value;
    return value.join(', ');
  }
}
