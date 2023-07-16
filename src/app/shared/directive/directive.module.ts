import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AvatarEmpregadoSrcDirective } from './avatar-empregado-src.directive';
import { ColorNumberAbsDirective } from './color-number-abs.directive';
import { ColorNumberDirective } from './color-number.directive';
import { WidgetsDirective } from './face-widgets.directive';
import { LazyLoadImagesDirective } from './lazy-load-images.directive';

@NgModule({
  declarations: [
    AvatarEmpregadoSrcDirective,
    ColorNumberDirective,
    ColorNumberAbsDirective,
    WidgetsDirective,
    LazyLoadImagesDirective,
  ],
  imports: [CommonModule],
  exports: [
    LazyLoadImagesDirective,
    AvatarEmpregadoSrcDirective,
    ColorNumberDirective,
    ColorNumberAbsDirective,
    WidgetsDirective,
  ],
})
export class DirectiveModule {}
