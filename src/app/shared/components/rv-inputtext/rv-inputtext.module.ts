import { InputTextModule } from 'primeng/inputtext';
import { NgModule } from '@angular/core';
import { RVInputtextComponent } from './rv-inputtext.component';

@NgModule({
  declarations: [RVInputtextComponent],
  imports: [InputTextModule],
  exports: [RVInputtextComponent],
  providers: [],
  bootstrap: [RVInputtextComponent],
})
export class RVInputtextModule {}
