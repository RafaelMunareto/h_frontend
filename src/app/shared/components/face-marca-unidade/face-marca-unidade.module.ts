import { forwardRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarcaUnidadeComponent } from './face-marca-unidade.component'
import { EditorModule } from 'primeng/editor';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [MarcaUnidadeComponent],
    imports: [
        CommonModule,
        EditorModule,
        FormsModule

    ],
    exports: [MarcaUnidadeComponent]
})
export class MarcaUnidadeModule {}
