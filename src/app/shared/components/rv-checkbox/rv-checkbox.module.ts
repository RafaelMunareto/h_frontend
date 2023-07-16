import { NgModule } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';

import { RVCheckboxComponent } from './rv-checkbox.component';

@NgModule({
  declarations: [RVCheckboxComponent],
  imports: [CheckboxModule],
  exports: [RVCheckboxComponent],
  providers: [],
  bootstrap: [RVCheckboxComponent],
})
export class RVCheckboxModule {}
