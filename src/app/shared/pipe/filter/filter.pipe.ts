import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {
  transform(
    items: any[],
    searchTerm: string | number,
    fieldName: string
  ): any[] {
    let searchText = String(searchTerm).toLowerCase();
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    return items.filter((item) => {
      if (item && item[fieldName]) {
        return item[fieldName].toLowerCase().includes(searchText);
      }
      return false;
    });
  }
}
