import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import {
  debounceTime,
  filter,
  map,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subject } from 'rxjs';
import { MenuState, Item } from 'src/app/core/store/menu/menu.reducer';
import { fromMenu } from 'src/app/core/store/menu/menu.selectors';
import { menuActions } from 'src/app/core/store/menu/menu.actions';
import { AuthState } from 'src/app/core/store/auth/auth.reducer';
import { fromAuth } from 'src/app/core/store/auth/auth.selectors';

@Component({
  selector: 'app-face-menu',
  templateUrl: './face-menu.component.html',
  styleUrls: ['./face-menu.component.sass'],
})
export class FaceMenuComponent implements OnInit, OnDestroy {
  @Input('cardLike') isCardLike = true;
  @Input() isExpandAll = false;
  @Input() menuLateral = false;

  isLoadingSearch: boolean = false;

  menuIcons: any = [];
  menuTxtSearch: string = '';
  noMenuItens: boolean = false;
  srcTimeOut: any;
  showingMenu: any = [];
  isSearching: boolean = false;
  canShowMenu: boolean = true;
  setOpenMenus: any = [0, 1];
  iconMode: boolean = false;

  favoritos$ = this.menuStore.select(fromMenu.favoritos);
  menu$ = this.menuStore.select(fromMenu.menuFiltradoComFavoritos);
  pesquisaStore$ = this.menuStore.select(fromMenu.pesquisa);
  pesquisa$ = new BehaviorSubject('');
  carregandoPesquisa$ = this.menuStore.select(fromMenu.carregandoPesquisa);
  carregando$ = this.menuStore.select(fromMenu.carregando);
  sucesso$ = this.menuStore.select(fromMenu.sucesso);
  status$ = this.menuStore.select(fromMenu.status);
  gesun$ = this.authStore.select(fromAuth.gesun);
  dialogEditarVisivel = false;
  destroy$ = new Subject();
  constructor(
    private authStore: Store<AuthState>,
    private menuStore: Store<MenuState>
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

  ngOnInit(): void {
    this.menuStore.dispatch(menuActions.fetch());

    this.menu$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.setOpenedMenus());

    this.pesquisaStore$
      .pipe(
        takeUntil(this.destroy$),
        withLatestFrom(this.pesquisa$),
        filter(([storeValue, componentValue]) => componentValue !== storeValue)
      )
      .subscribe(([value, _]) => this.pesquisa$.next(value));

    this.pesquisa$
      .pipe(
        takeUntil(this.destroy$),
        tap(() =>
          this.menuStore.dispatch(
            menuActions.setStatusPesquisa({ statusPesquisa: 'CARREGANDO' })
          )
        ),
        debounceTime(500)
      )
      .subscribe((pesquisa) => {
        this.menuStore.dispatch(menuActions.setPesquisa({ pesquisa }));
        this.menuStore.dispatch(
          menuActions.setStatusPesquisa({ statusPesquisa: 'SUCESSO' })
        );
      });
  }

  setOpenedMenus() {
    if (this.isExpandAll)
      setTimeout(() => {
        this.setOpenMenus = this.menuIcons.map(
          (item: Item, index: number) => index
        );
      }, 0);
    else this.setOpenMenus = [0, 1];
  }

  async toggleMenu(arrowDiv: HTMLSpanElement, currIdx: number) {
    arrowDiv.classList.toggle('menu-is-expanded');
    if (this.setOpenMenus.includes(currIdx)) {
      this.setOpenMenus.splice(this.setOpenMenus.indexOf(currIdx), 1);
    } else {
      this.setOpenMenus.push(currIdx);
    }
  }

  searchIt() {
    window.location.href =
      window.location.origin +
      `/#/gesoon/pesquisa?s=${this.menuTxtSearch}&p=1&c=0&t=padrao`;
  }

  addToFavorites(id: number): void {
    this.menuStore.dispatch(menuActions.postFavorito({ id }));
  }

  removeFromFavorites(id: number): void {
    this.menuStore.dispatch(menuActions.deleteFavorito({ id }));
  }

  getGroupId(index: number, group: any) {
    return group.id;
  }

  changeViewMode() {
    this.iconMode = !this.iconMode;
  }
}
