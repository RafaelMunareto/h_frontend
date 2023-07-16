import { NgModule } from '@angular/core';

import { MultiSelectModule } from 'primeng/multiselect';
import { RVMultiselectComponent } from './rv-multiselect.component';

@NgModule({
  declarations: [RVMultiselectComponent],
  imports: [MultiSelectModule],
  exports: [RVMultiselectComponent],
  providers: [],
  bootstrap: [RVMultiselectComponent],
})
export class RVMultiselectModule {}
