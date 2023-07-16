import { NgModule } from '@angular/core';

import { RadioButtonModule } from 'primeng/radiobutton';

import { RVRadiobuttonComponent } from './rv-radiobutton.component';

@NgModule({
  declarations: [RVRadiobuttonComponent],
  imports: [RadioButtonModule],
  exports: [RVRadiobuttonComponent],
  providers: [],
  bootstrap: [RVRadiobuttonComponent],
})
export class RVRadiobuttonModule {}
