import { EventEmitter, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { MenuNivelEnum } from "../../../enum/menuNivelEnum";
import { MatExpansionPanel } from "@angular/material/expansion";
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
}
