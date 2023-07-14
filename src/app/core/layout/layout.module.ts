import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { DirectiveModule } from 'src/app/shared/directive/directive.module';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [LayoutComponent, FooterComponent, HeaderComponent],
  imports: [CommonModule, FormsModule, DirectiveModule, RouterModule],
  exports: [LayoutComponent],
})
export class LayoutModule {}
