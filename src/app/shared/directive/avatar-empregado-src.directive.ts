import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { AvatarEmpregadoPipe } from '../pipe/avatar-empregado.pipe';

@Directive({
  selector: '[appAvatarEmpregadoSrc]',
})
export class AvatarEmpregadoSrcDirective implements OnInit {
  @Input() appAvatarEmpregadoSrc = '';
  @Input() onAESError = '';

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    const avatarPipe = new AvatarEmpregadoPipe();
    if (this.appAvatarEmpregadoSrc === '' || !this.appAvatarEmpregadoSrc) {
      this.setSrc(this.onAESError);
      return;
    }
    const url = avatarPipe.transform(this.appAvatarEmpregadoSrc);
    this.setSrc(url);
  }
  setSrc(url: string): void {
    (this.el as ElementRef<HTMLImageElement>).nativeElement.src = url;
  }
}
