import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rv-checkbox',
  templateUrl: './rv-checkbox.component.html',
  styleUrls: ['./rv-checkbox.component.scss'],
})
export class RVCheckboxComponent implements OnInit {
  selectedCities: string[] = [];
  selectedCategories: any[] = ['Technology', 'Sports'];
  categories: any[] = [
    { name: 'Accounting', key: 'A' },
    { name: 'Marketing', key: 'M' },
    { name: 'Production', key: 'P' },
    { name: 'Research', key: 'R' },
  ];
  checked: boolean = false;

  constructor() {}

  ngOnInit() {
    this.selectedCategories = this.categories.slice(1, 3);
  }
}
