import { EventEmitter, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { MenuNivelEnum } from "../../../enum/menuNivelEnum";
import { ItemMenuExpansivelComponent } from "../item-menu-expansivel/item-menu-expansivel.component";
import * as ɵngcc0 from '@angular/core';
export declare class ItemMenuNormalComponent implements OnInit, OnChanges {
    icone: string;
    nome: string;
    nivelItem: MenuNivelEnum;
    rotaAtual: string;
    urlPropria: string;
    referenciaSuperior?: ItemMenuExpansivelComponent;
    callBack: EventEmitter<void>;
    callBackItemSelecionado: EventEmitter<void>;
    isAtivo: boolean;
    constructor();
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    tratarCallBack($event: MouseEvent): void;
    tratarRotaAtual(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<ItemMenuNormalComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDeclaration<ItemMenuNormalComponent, "item-menu-normal", never, { "icone": "icone"; "nome": "nome"; "nivelItem": "nivelItem"; "rotaAtual": "rotaAtual"; "urlPropria": "urlPropria"; "referenciaSuperior": "referenciaSuperior"; }, { "callBack": "callBack"; "callBackItemSelecionado": "callBackItemSelecionado"; }, never, never>;
}

//# sourceMappingURL=item-menu-normal.component.d.ts.map