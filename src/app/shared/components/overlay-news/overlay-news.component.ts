import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { finalize, take } from 'rxjs/operators';
import { OverlayNewsService } from './overlay-news.service';
import { Noticia } from './overlay-news.models';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-overlay-news',
  templateUrl: './overlay-news.component.html',
  styleUrls: ['./overlay-news.component.sass'],
})
export class OverlayNewsComponent implements OnInit {
  showNoticias: boolean = false;
  noticias: Noticia[] = [];

  @Input() tituloNews: string = 'Notícias';
  @Input() showTransition: string = '500ms';
  @Input() hideTransition: string = '500ms';
  @Input() icon: string = 'fas fa-info-circle';
  @Input() iColor: string = '#0F7BB4';
  @Input() sistema!: string;
  @Input() subsistema?: string;

  constructor(private service: OverlayNewsService) {}

  ngOnInit(): void {}

  carregaNoticias(overlay: any) {
    console.log(this.sistema)
    if (!overlay.overlayVisible) return;

    this.showNoticias = false;

    this.service
      .getNoticias(this.sistema, this.subsistema)
      .pipe(finalize(() => (this.showNoticias = true)))
      .subscribe((noticias) => (this.noticias = noticias));
  }
}
