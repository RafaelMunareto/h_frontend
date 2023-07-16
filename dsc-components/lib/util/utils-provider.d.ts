import { SimpleChange } from '@angular/core';
export declare class UtilsProvider {
    static ifChanged(change: SimpleChange, callback: (value: any) => void): void;
}
