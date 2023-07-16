import { NgModule } from '@angular/core';

import { ListboxModule } from 'primeng/listbox';
import { RVListboxComponent } from './rv-listbox.component';

@NgModule({
  declarations: [RVListboxComponent],
  imports: [ListboxModule],
  exports: [RVListboxComponent],
  providers: [],
  bootstrap: [RVListboxComponent],
})
export class RVListboxModule {}
