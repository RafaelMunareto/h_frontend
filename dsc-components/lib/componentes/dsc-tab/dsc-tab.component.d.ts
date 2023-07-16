import { EventEmitter, OnChanges, OnInit, SimpleChanges, TemplateRef } from "@angular/core";
import * as ɵngcc0 from '@angular/core';
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
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<DscTabComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDeclaration<DscTabComponent, "dsc-tab", never, { "dscAbas": "dscAbas"; "dscIndex": "dscIndex"; }, { "dscIndexChange": "dscIndexChange"; }, never, never>;
}
export interface itemAba {
    nome: string;
    icone?: string;
    templateRef: TemplateRef<any>;
}

//# sourceMappingURL=dsc-tab.component.d.ts.map