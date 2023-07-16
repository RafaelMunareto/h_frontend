import { EventEmitter, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { MenuNivelEnum } from "../../../enum/menuNivelEnum";
import { ItemMenuExpansivelComponent } from "../item-menu-expansivel/item-menu-expansivel.component";
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
}
