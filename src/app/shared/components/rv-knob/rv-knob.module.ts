import { NgModule } from '@angular/core';

import { KnobModule } from 'primeng/knob';
import { RVKnobComponent } from './rv-knob.component';

@NgModule({
  declarations: [RVKnobComponent],
  imports: [KnobModule],
  exports: [RVKnobComponent],
  providers: [],
  bootstrap: [RVKnobComponent],
})
export class RVKnobModule {}
