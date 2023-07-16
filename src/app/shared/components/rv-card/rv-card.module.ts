import { NgModule } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

import { RVCardComponent } from './rv-card.component';

@NgModule({
  declarations: [RVCardComponent],
  imports: [CardModule, ButtonModule],
  exports: [RVCardComponent],
  providers: [],
  bootstrap: [RVCardComponent],
})
export class RVCardModule {}
