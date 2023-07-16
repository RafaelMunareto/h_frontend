import { NgModule } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { ProgressBarModule } from 'primeng/progressbar';

import { RVProgressBarComponent } from './rv-progressbar.component';

@NgModule({
  declarations: [RVProgressBarComponent],
  imports: [ProgressBarModule, ToastModule],
  exports: [RVProgressBarComponent],
  providers: [],
  bootstrap: [RVProgressBarComponent],
})
export class RVProgressBarModule {}
