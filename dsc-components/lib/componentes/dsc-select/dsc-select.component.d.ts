import { EventEmitter, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { TamanhoSelectEnum } from '../../enum/selectEnums';
import { tamanhoSelectType, tipoTextoFeedBackType } from '../../types/selectTypes';
import * as ɵngcc0 from '@angular/core';
export declare class DscSelectComponent implements OnInit, OnChanges, ControlValueAccessor {
    controlDir: NgControl;
    private _unsubscribeAll;
    dscRotulo: string;
    dscRotulo_: string;
    dscInformacaoAdicional: string;
    dscInformacaoAdicional_: string;
    dscIconeInformativo: string;
    dscIconeInformativo_: string;
    dscIconLeft: string;
    dscIconLeft_: string;
    dscTipoTextoFeedBack: tipoTextoFeedBackType;
    dscTipoTextoFeedBack_: tipoTextoFeedBackType;
    dscTextoFeedBack: string;
    dscTextoFeedBack_: string;
    dscTextoComplementar: string;
    dscTextoComplementar_: string;
    dscPlaceHolder: string;
    dscPlaceHolder_: string;
    dscIsMultiple: boolean;
    dscIsMultiple_: boolean;
    dscOptions: {
        label: string;
        value: any;
    }[];
    dscOptions_: {
        label: string;
        value: any;
    }[];
    dscOptionsGroup: {
        label: string;
        options: {
            label: string;
            value: any;
        }[];
    }[];
    dscOptionsGroup_: {
        label: string;
        options: {
            label: string;
            value: any;
        }[];
    }[];
    dscTipoTamanhoSelect: tamanhoSelectType;
    dscTipoTamanhoSelect_: TamanhoSelectEnum;
    dscHasFilter: boolean;
    dscHasFilter_: boolean;
    dscSelectionChange: EventEmitter<any>;
    matSelect: MatSelect;
    optionsAux: {
        label: string;
        value: any;
    }[];
    optionsGroupAux: {
        label: string;
        options: {
            label: string;
            value: any;
        }[];
    }[];
    iconeFeedBack: string;
    classeBox: string;
    mapaClasseIcone: Map<string, string>;
    formControlSearch: FormControl;
    classComplementar: string;
    classFormField: string;
    classeHeader: string;
    mapaTamanhoSelect: Map<TamanhoSelectEnum, string>;
    mapaHeader: Map<TamanhoSelectEnum, string>;
    disabled: boolean;
    onChange: (_value: any) => void;
    onTouched: () => void;
    constructor(controlDir: NgControl);
    ngOnInit(): void;
    private escutarInputFiltro;
    private _filter;
    ngOnChanges(changes: SimpleChanges): void;
    registerOnChange(fn: (value: any) => void): void;
    setDisabledState(disabled: boolean): void;
    writeValue(value: any): void;
    registerOnTouched(fn: () => void): void;
    aplicarClasseFeedBack(): void;
    inicializarMapa(): void;
    inicializarMapaHeader(): void;
    inicializarMapaTamanhoInput(): void;
    aplicarClasseComplementar(): void;
    tratarAbertura($event: boolean): void;
    aplicarClasseMatFormField(): void;
    private unsubscribeAll;
    private _replaceAccents;
    onSelectionChange(value: any): void;
    isInvalid(): boolean;
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<DscSelectComponent, [{ self: true; }]>;
    static ɵcmp: ɵngcc0.ɵɵComponentDeclaration<DscSelectComponent, "dsc-select", never, { "dscRotulo": "dscRotulo"; "dscInformacaoAdicional": "dscInformacaoAdicional"; "dscIconeInformativo": "dscIconeInformativo"; "dscIconLeft": "dscIconLeft"; "dscTipoTextoFeedBack": "dscTipoTextoFeedBack"; "dscTextoFeedBack": "dscTextoFeedBack"; "dscTextoComplementar": "dscTextoComplementar"; "dscPlaceHolder": "dscPlaceHolder"; "dscIsMultiple": "dscIsMultiple"; "dscOptions": "dscOptions"; "dscOptionsGroup": "dscOptionsGroup"; "dscTipoTamanhoSelect": "dscTipoTamanhoSelect"; "dscHasFilter": "dscHasFilter"; }, { "dscSelectionChange": "dscSelectionChange"; }, never, never>;
}

//# sourceMappingURL=dsc-select.component.d.ts.map