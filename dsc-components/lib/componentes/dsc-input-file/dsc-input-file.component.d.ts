import { EventEmitter, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { tamanhoInputType } from '../../types/inputTypes';
import { TamanhoInputEnum } from '../../enum/inputEnums';
import { TamanhoBotaoEnum } from '../../enum/buttonEnums';
import { tamanhoBotaoType } from '../../types/buttonTypes';
import * as ɵngcc0 from '@angular/core';
export declare class DscInputFileComponent implements OnInit, OnChanges {
    dscRotulo?: string;
    dscRotulo_?: string;
    dscInformacaoAdicional?: string;
    dscInformacaoAdicional_?: string;
    dscIconeInformativo?: string;
    dscIconeInformativo_?: string;
    dscTipoTamanhoInput: tamanhoInputType;
    dscTipoTamanhoInput_: TamanhoInputEnum;
    dscDisabled?: boolean;
    dscDisabled_: boolean;
    dscFile: EventEmitter<File>;
    inputRef: any;
    tamanhoBotao: tamanhoBotaoType;
    fileName: string;
    classeHeader: string;
    mapaHeader: Map<TamanhoInputEnum, string>;
    mapaBotao: Map<TamanhoInputEnum, TamanhoBotaoEnum>;
    mapaSize: Map<TamanhoInputEnum, string>;
    size: string;
    classeBorda: string;
    constructor();
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    tratarArquivo($event: any): void;
    clickFile(): void;
    private aplicarClasses;
    private tratarClasseBorda;
    private inicializarMapaHeader;
    private inicializarMapaBotao;
    private inicializarMapaSize;
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<DscInputFileComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDeclaration<DscInputFileComponent, "dsc-input-file", never, { "dscTipoTamanhoInput": "dscTipoTamanhoInput"; "dscRotulo": "dscRotulo"; "dscInformacaoAdicional": "dscInformacaoAdicional"; "dscIconeInformativo": "dscIconeInformativo"; "dscDisabled": "dscDisabled"; }, { "dscFile": "dscFile"; }, never, never>;
}

//# sourceMappingURL=dsc-input-file.component.d.ts.map