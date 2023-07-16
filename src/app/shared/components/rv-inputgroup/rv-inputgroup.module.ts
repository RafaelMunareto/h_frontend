import { NgModule } from '@angular/core';

import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';

import { RVInputgroupComponent } from './rv-inputgroup.component';

@NgModule({
  declarations: [RVInputgroupComponent],
  imports: [InputTextModule, CheckboxModule, RadioButtonModule, ButtonModule],
  exports: [RVInputgroupComponent],
  providers: [],
  bootstrap: [RVInputgroupComponent],
})
export class RVInputgroupModule {}
