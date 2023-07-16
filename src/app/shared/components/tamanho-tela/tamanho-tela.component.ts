import { Component, HostListener, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
@Component({
  selector: 'app-tamanho-tela',
  template: ` <p>Tamanho da tela: {{ width }} x {{ height }}</p> `,
})
export class TamanhoTelaComponent {
  width?: number;
  height?: number;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe((result) => {
        this.width = result.breakpoints[Breakpoints.XSmall]
          ? 576
          : result.breakpoints[Breakpoints.Small]
          ? 768
          : result.breakpoints[Breakpoints.Medium]
          ? 992
          : result.breakpoints[Breakpoints.Large]
          ? 1200
          : result.breakpoints[Breakpoints.XLarge]
          ? 1400
          : 0;
        this.height = window.innerHeight;
      });
  }
}
