import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ standalone: true, name: 'limitToPipe' })
export class LimitToPipe implements PipeTransform {
  transform(value: string = '', limit: number = 20, trail: '...'): string {
    return value?.length > limit ? value?.substring(0, limit) + trail : value;
  }
}
