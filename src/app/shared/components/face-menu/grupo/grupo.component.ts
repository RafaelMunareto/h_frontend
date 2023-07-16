import { animate, style, transition, trigger } from '@angular/animations';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Item } from 'src/app/core/store/menu/menu.reducer';
import { clone } from 'lodash-es';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.sass'],
})
export class GrupoComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() nome = '';
  @Input() icone = '';
  @Input() itens: Item[] = [];
  @Input() favoritos: Item[] = [];
  @Input() searching = false;
  @Input() search = '';
  @Input() iconMode: boolean = true;
  @Input() isExpanded: boolean = false;

  @Output() addToFavorites = new EventEmitter<number>();
  @Output() removeFromFavorites = new EventEmitter<number>();
  @ViewChild('expDest') expDest!: ElementRef;

  itensOrdenados: Item[] = [];
  // open = true;

  estiloListaIcones = {
    height: 'auto',
  };

  gruposAbertos = ['destaques', 'favoritos', 'principal'];
  alwaysOpen = false;

  constructor(private chgDet: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    if (
      !this.search.length &&
      !this.gruposAbertos.includes(this.nome.toLowerCase())
    ) {
      this.expand(false);
    } else {
      this.expand(true);
      this.isExpanded = true;
    }
    this.chgDet.detectChanges();
  }

  ngOnInit(): void {
    this.alwaysOpen = this.isExpanded;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['itens']) {
      const values = changes['itens'].currentValue ?? [];
      this.itensOrdenados = values.map((a:any) => {return {...a}});
      if(this.itensOrdenados.length > 1){
        this.itensOrdenados = this.itensOrdenados.sort((a: Item, b: Item) =>
          (a.nome != null ? (typeof a.nome === 'string' ? a.nome : '0') : '0')
            .toLowerCase()
            .replace('#', '')
            .localeCompare(
              (b.nome != null ? (typeof b.nome === 'string' ? b.nome : '0') : '0')
                .toLowerCase()
                .replace('#', '')
            )
        );
      }

      // if (!values.length) {
      //   this.itensOrdenados = [];
      // }
      // else {
      //   if (values.length < 2) {
      //     this.itensOrdenados = [...values];
      //   }
      //   else {
      //     // if (!(typeof nome === 'string')) {
      //     //   this.itensOrdenados = [];
      //     // }
      //     // else {
      //     //   if ( (nome ? nome.toLowerCase() === 'favoritos' : false) ) {
      //         this.itensOrdenados = [...values].sort((a: Item, b: Item) =>
      //           (typeof a.nome === 'string' ? a.nome : '0')
      //             .toLowerCase()
      //             .replace('#', '')
      //             .localeCompare(
      //               (typeof b.nome === 'string' ? b.nome : '0')
      //                 .toLowerCase()
      //                 .replace('#', '')
      //             )
      //         );
      //       // }
      //       // else {
      //       //   this.itensOrdenados = [...values].sort((a: Item, b: Item) =>
      //       //     (a.nome ? a.nome : '0')
      //       //       .toLowerCase()
      //       //       .replace('#', '')
      //       //       .localeCompare(
      //       //         (b.nome ? b.nome : '0')
      //       //           .toLowerCase()
      //       //           .replace('#', '')
      //       //       )
      //       //   );
      // }}    //}}
      if (this.alwaysOpen || (this.isExpanded && this.expDest)) {
        setTimeout(() => this.expand(true), 10);
      }
    }
  }

  get ehDestaques() {
    return this.nome === 'Destaques';
  }

  get ehFavoritos() {
    return this.nome === 'Favoritos';
  }

  toggle() {
    if (!this.alwaysOpen) {
      this.isExpanded = !this.isExpanded;
      this.expand(this.isExpanded);
    }
  }

  expand(value?: boolean) {
    // this.open = value ?? !this.open;
    if (this.alwaysOpen) {
      this.estiloListaIcones = { height: 'auto' };
    } else {
      const height = value
        ? `${this.expDest.nativeElement.clientHeight}px`
        : '0';
      this.estiloListaIcones = { height };
    }
  }

  getItemId(id:number, item: Item) {
    return item.id;
  }
}
