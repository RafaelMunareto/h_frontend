import { EventEmitter, OnChanges, OnInit, SimpleChanges, TemplateRef } from "@angular/core";
export declare class DscTabComponent implements OnInit, OnChanges {
    dscAbas: Array<itemAba>;
    dscAbas_: Array<itemAba>;
    dscIndex?: number;
    dscIndex_?: number;
    dscIndexChange: EventEmitter<number>;
    constructor();
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    tratarMudancaIndex($event: number): void;
}
export interface itemAba {
    nome: string;
    icone?: string;
    templateRef: TemplateRef<any>;
}
