import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { padString } from '../utils/string-fmt';
@Pipe({
  name: 'ConverteIntHHMM',
  standalone: true,
})
@Injectable({
  providedIn: 'root',
})
export class ConverteIntHHMMPipe implements PipeTransform {
  transform(value: string): string {
    value = padString(String(value), 4);
    return `${value.substring(0, 2)}:${value.substring(2)}`;
  }
}
