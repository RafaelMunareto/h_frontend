import { Component } from '@angular/core';

@Component({
  selector: 'app-rv-slider',
  templateUrl: './rv-slider.component.html',
  styleUrls: ['./rv-slider.component.scss'],
})
export class RVSliderComponent {
  val1: number = 0;
  val2: number = 50;
  val3: number = 0;
  val4: number = 0;
  rangeValues: number[] = [20, 80];

  constructor() {}
}
