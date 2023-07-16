import { Component } from '@angular/core';

@Component({
  selector: 'app-rv-inputswitch',
  templateUrl: './rv-inputswitch.component.html',
  styleUrls: ['./rv-inputswitch.component.scss'],
})
export class RVInputSwitchComponent {
  checked1: boolean = false;
  checked2: boolean = true;

  constructor() {}
}
