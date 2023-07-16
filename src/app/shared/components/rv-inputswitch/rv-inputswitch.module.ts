import { NgModule } from '@angular/core';

import { InputSwitchModule } from 'primeng/inputswitch';
import { RVInputSwitchComponent } from './rv-inputswitch.component';

@NgModule({
  declarations: [RVInputSwitchComponent],
  imports: [InputSwitchModule],
  exports: [RVInputSwitchComponent],
  providers: [],
  bootstrap: [RVInputSwitchComponent],
})
export class RVInputSwitchModule {}
