import { NgModule } from '@angular/core';

import { ToggleButtonModule } from 'primeng/togglebutton';

import { RVToggleButtonComponent } from './rv-togglebutton.component';

@NgModule({
  declarations: [RVToggleButtonComponent],
  imports: [ToggleButtonModule],
  exports: [RVToggleButtonComponent],
  providers: [],
  bootstrap: [RVToggleButtonComponent],
})
export class RVToggleButtonModule {}
