import { Component } from '@angular/core';
import { ItemMenu } from 'dsc-components';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent {
  acionaMenu: boolean = false;
  arrayMenu: Array<ItemMenu> = [
    {
      nome: 'Botões',
      icone: '',
      filhos: [
        {
          nome: 'Item 1',
          icone: 'menu',
          callBack: () => {
            console.log('Ação');
          },
        },
      ],
    },
  ];
  constructor() {}

  buttonAcion() {
    this.acionaMenu = !this.acionaMenu;
  }
}
