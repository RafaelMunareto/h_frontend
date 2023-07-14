import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DirectiveModule } from 'src/app/shared/directive/directive.module';
import { RouterModule } from '@angular/router';
import { DscHeaderModule } from 'dsc-components';
import { HeaderComponent } from './header.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    FormsModule,
    DirectiveModule,
    RouterModule,
    DscHeaderModule,
  ],
  exports: [HeaderComponent],
})
export class HeaderModule {}
