import { NgModule } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';

import { SliderModule } from 'primeng/slider';

import { RVSliderComponent } from './rv-slider.component';

@NgModule({
  declarations: [RVSliderComponent],
  imports: [SliderModule, InputTextModule],
  exports: [RVSliderComponent],
  providers: [],
  bootstrap: [RVSliderComponent],
})
export class RVSliderModule {}
