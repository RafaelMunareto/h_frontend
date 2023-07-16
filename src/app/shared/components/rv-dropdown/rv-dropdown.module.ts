import { DropdownModule } from 'primeng/dropdown';
import { NgModule } from '@angular/core';

import { RVDropdownComponent } from './rv-dropdown.component';

@NgModule({
  declarations: [RVDropdownComponent],
  imports: [DropdownModule],
  exports: [RVDropdownComponent],
  providers: [],
  bootstrap: [RVDropdownComponent],
})
export class RVDropdownModule {}
