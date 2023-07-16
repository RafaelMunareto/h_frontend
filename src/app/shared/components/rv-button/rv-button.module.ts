import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';

import { RVButtonComponent } from './rv-button.component';

@NgModule({
  declarations: [RVButtonComponent],
  imports: [ButtonModule],
  exports: [RVButtonComponent],
  providers: [],
  bootstrap: [RVButtonComponent],
})
export class RVButtonModule {}
