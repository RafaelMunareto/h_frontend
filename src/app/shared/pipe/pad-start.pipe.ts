import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ standalone: true, name: 'padStart' })
export class PadStartPipe implements PipeTransform {
  transform(
    value: number | string,
    size: number,
    character: string = '0'
  ): string {
    return String(value).padStart(size, character);
  }
}
