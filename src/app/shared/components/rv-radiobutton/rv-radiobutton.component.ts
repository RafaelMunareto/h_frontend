import { Component } from '@angular/core';

@Component({
  selector: 'app-rv-radiobutton',
  templateUrl: './rv-radiobutton.component.html',
  styleUrls: ['./rv-radiobutton.component.scss'],
})
export class RVRadiobuttonComponent {
  city: string = '';
  selectedCategory: any = null;
  categories: any[] = [
    { name: 'Accounting', key: 'A' },
    { name: 'Marketing', key: 'M' },
    { name: 'Production', key: 'P' },
    { name: 'Research', key: 'R' },
  ];

  ngOnInit() {
    this.selectedCategory = this.categories[1];
  }

  constructor() {}
}
