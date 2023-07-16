import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'NomeProprio',
  standalone: true,
})
export class NomeProprio implements PipeTransform {
  transform(value: string){
      return value.toLowerCase().replace(/(?<!\p{L})\p{L}(?=\p{L}{2})/gu, m => m.toUpperCase());
  }
}