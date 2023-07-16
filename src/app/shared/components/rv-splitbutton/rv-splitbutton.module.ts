import { NgModule } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { SplitButtonModule } from 'primeng/splitbutton';

import { RVSplitbuttonComponent } from './rv-splitbutton.component';

@NgModule({
  declarations: [RVSplitbuttonComponent],
  imports: [SplitButtonModule, ToastModule],
  exports: [RVSplitbuttonComponent],
  providers: [],
  bootstrap: [RVSplitbuttonComponent],
})
export class RVSplitbuttonModule {}
