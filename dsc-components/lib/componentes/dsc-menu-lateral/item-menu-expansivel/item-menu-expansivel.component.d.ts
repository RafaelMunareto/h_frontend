import { EventEmitter, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { MenuNivelEnum } from "../../../enum/menuNivelEnum";
import { MatExpansionPanel } from "@angular/material/expansion";
import * as ɵngcc0 from '@angular/core';
export declare class ItemMenuExpansivelComponent implements OnInit, OnChanges {
    icone: string;
    nome: string;
    nivelItem: MenuNivelEnum;
    referenciaSuperior?: ItemMenuExpansivelComponent;
    callBack: EventEmitter<void>;
    matExpanselPanel: MatExpansionPanel;
    classePainel: string;
    constructor();
    ngOnChanges(changes: SimpleChanges): void;
    ngOnInit(): void;
    definirClassePainel($event: boolean): void;
    tratarCallBack($event: MouseEvent): void;
    abrirPainel(): void;
    fecharPainel(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<ItemMenuExpansivelComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDeclaration<ItemMenuExpansivelComponent, "item-menu-expansivel", never, { "icone": "icone"; "nome": "nome"; "nivelItem": "nivelItem"; "referenciaSuperior": "referenciaSuperior"; }, { "callBack": "callBack"; }, never, ["*"]>;
}

//# sourceMappingURL=item-menu-expansivel.component.d.ts.map