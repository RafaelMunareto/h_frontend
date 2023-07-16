import { NgModule } from '@angular/core';

import { SelectButtonModule } from 'primeng/selectbutton';
import { RVSelectButtonComponent } from './rv-selectbutton.component';

@NgModule({
  declarations: [RVSelectButtonComponent],
  imports: [SelectButtonModule],
  exports: [RVSelectButtonComponent],
  providers: [],
  bootstrap: [RVSelectButtonComponent],
})
export class RVSelectButtonModule {}
