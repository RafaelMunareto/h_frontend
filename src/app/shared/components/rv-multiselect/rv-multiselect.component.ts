import { Component } from '@angular/core';

@Component({
  selector: 'app-rv-multiselect',
  templateUrl: './rv-multiselect.component.html',
  styleUrls: ['./rv-multiselect.component.scss'],
})
export class RVMultiselectComponent {
  selectedCities1: any[] = [];
  selectedCities2: any[] = [];
  selectedCities3: any[] = [];
  selectedCities4: any[] = [];
  selectedCountries1: any[] = [];
  selectedCountries2: any[] = [];
  cities: any[] = [];
  groupedCities: any[] = [];
  countries: any[] = [];

  constructor() {
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
    ];

    this.countries = [
      { name: 'Australia', code: 'AU' },
      { name: 'Brazil', code: 'BR' },
      { name: 'China', code: 'CN' },
      { name: 'Egypt', code: 'EG' },
      { name: 'France', code: 'FR' },
      { name: 'Germany', code: 'DE' },
      { name: 'India', code: 'IN' },
      { name: 'Japan', code: 'JP' },
      { name: 'Spain', code: 'ES' },
      { name: 'United States', code: 'US' },
    ];

    this.groupedCities = [
      {
        label: 'Germany',
        value: 'de',
        items: [
          { label: 'Berlin', value: 'Berlin' },
          { label: 'Frankfurt', value: 'Frankfurt' },
          { label: 'Hamburg', value: 'Hamburg' },
          { label: 'Munich', value: 'Munich' },
        ],
      },
      {
        label: 'USA',
        value: 'us',
        items: [
          { name: 'Chicago', value: 'Chicago' },
          { name: 'Los Angeles', value: 'Los Angeles' },
          { name: 'New York', value: 'New York' },
          { name: 'San Francisco', value: 'San Francisco' },
        ],
      },
      {
        label: 'Japan',
        value: 'jp',
        items: [
          { name: 'Kyoto', value: 'Kyoto' },
          { name: 'Osaka', value: 'Osaka' },
          { name: 'Tokyo', value: 'Tokyo' },
          { name: 'Yokohama', value: 'Yokohama' },
        ],
      },
    ];
  }
}
