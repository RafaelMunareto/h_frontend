import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayNewsService } from './overlay-news.service';
import { OverlayNewsComponent } from './overlay-news.component';
import { TimelineModule } from 'primeng/timeline';
import { OverlayPanelModule } from 'primeng/overlaypanel';

@NgModule({
  declarations: [
    OverlayNewsComponent,
  ],
  imports: [
    CommonModule,
    TimelineModule,
    OverlayPanelModule,
  ],
  exports: [
    OverlayNewsComponent
  ],
  providers: [
    OverlayNewsService
  ]
})
export class OverlayNewsModule { }
