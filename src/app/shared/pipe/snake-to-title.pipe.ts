import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'snakeToTitle',
  standalone: true
})

export class SnakeToTitlePipe implements PipeTransform {
  transform(value: any) {
    if (!value) return '';
    const newValue = value
      .replace(/([A-Z][a-z]+)/g, ' $1')
      .replace(/([A-Z]{2,})/g, ' $1')
      .replace(/\s{2,}/g, ' ')
      .trim();
    return newValue.slice(0, 1).toUpperCase() + newValue.slice(1);
  }
}
