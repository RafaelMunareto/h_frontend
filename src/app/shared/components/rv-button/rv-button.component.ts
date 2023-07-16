import { Component } from '@angular/core';

@Component({
  selector: 'app-rv-button',
  templateUrl: './rv-button.component.html',
  styleUrls: ['./rv-button.component.scss'],
})
export class RVButtonComponent {
  loading = [false, false, false, false];

  disabled: boolean = false;

  constructor() {}

  load(index: any) {
    this.loading[index] = true;
    setTimeout(() => (this.loading[index] = false), 1000);
  }
}
