import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaceMenuComponent } from './face-menu.component';
import { FormsModule } from '@angular/forms';
import { LoadingCaixaModule } from '../loading-caixa/loading-caixa.module';
import { InputTextModule } from 'primeng/inputtext';
import { GrupoComponent } from './grupo/grupo.component';
import { ItemComponent } from './grupo/item/item.component';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { FaceCaixaService } from 'src/app/pages/varejo/face-caixa/face-caixa.service';
import { DialogModule } from 'primeng/dialog';


@NgModule({
  declarations: [FaceMenuComponent, GrupoComponent, ItemComponent],
  imports: [
    CommonModule,
    FormsModule,
    LoadingCaixaModule,
    InputTextModule,
    ButtonModule,
    MenuModule,
    TooltipModule,
    DialogModule,
  ],
  exports: [FaceMenuComponent],
  providers: [FaceCaixaService],
})
export class FaceMenuModule {}
