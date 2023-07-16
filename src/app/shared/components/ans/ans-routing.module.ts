import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnsComponent } from './ans.component';

const routes: Routes = [
  {
    path: '', component: AnsComponent,        
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnsRoutingModule { }
