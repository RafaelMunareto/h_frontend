import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AvatarEmpregadoSrcDirective } from './avatar-empregado-src.directive';
import { ColorNumberAbsDirective } from './color-number-abs.directive';
import { ColorNumberDirective } from './color-number.directive';
import { WidgetsDirective } from './face-widgets.directive';
import { IdImageDirective } from './id-image.directive';
import { LazyLoadImagesDirective } from './lazy-load-images.directive';

@NgModule({
  declarations: [
    AvatarEmpregadoSrcDirective,
    ColorNumberDirective,
    ColorNumberAbsDirective,
    WidgetsDirective,
    LazyLoadImagesDirective,
  ],
  imports: [CommonModule, IdImageDirective],
  exports: [
    LazyLoadImagesDirective,
    AvatarEmpregadoSrcDirective,
    ColorNumberDirective,
    ColorNumberAbsDirective,
    WidgetsDirective,
    IdImageDirective,
  ],
})
export class DirectiveModule {}
