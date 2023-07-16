import { Component } from '@angular/core';

@Component({
  selector: 'app-rv-togglebutton',
  templateUrl: './rv-togglebutton.component.html',
  styleUrls: ['./rv-togglebutton.component.scss'],
})
export class RVToggleButtonComponent {
  checked1: boolean = false;
  checked2: boolean = true;

  constructor() {}
}
