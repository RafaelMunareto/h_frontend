import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'phonebr',
})
export class PhoneBrPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return '';
    }

    const phone = value.replace(/[^\d]/g, '');
    if (phone.length !== 11) {
      return value;
    }

    return `(${phone.substr(0, 2)}) ${phone.substr(2, 5)}-${phone.substr(
      7,
      4
    )}`;
  }
}
