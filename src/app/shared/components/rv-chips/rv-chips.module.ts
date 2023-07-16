import { NgModule } from '@angular/core';
import { ChipsModule } from 'primeng/chips';

import { RVChipsComponent } from './rv-chips.component';

@NgModule({
  declarations: [RVChipsComponent],
  imports: [ChipsModule],
  exports: [RVChipsComponent],
  providers: [],
  bootstrap: [RVChipsComponent],
})
export class RVChipsModule {}
