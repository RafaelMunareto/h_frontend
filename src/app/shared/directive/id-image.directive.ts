import { Directive, ElementRef, Input, OnInit, OnChanges } from '@angular/core';
import { UploadService } from '../services/upload.service';

@Directive({
  selector: '[IdImage]',
  standalone: true,
})
export class IdImageDirective implements OnInit, OnChanges {
  @Input('IdImage') id?: number;

  constructor(private uploadService: UploadService, private el: ElementRef) {}

  ngOnInit(): void {}

  ngOnChanges() {
    if (!this.id) {
      return;
    }
    (this.el.nativeElement as HTMLImageElement).src = this.uploadService.getUrl(
      this.id
    );
  }
}
