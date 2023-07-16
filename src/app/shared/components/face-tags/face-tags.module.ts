import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaceTagsComponent } from './face-tags.component'
import { EditorModule } from 'primeng/editor';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
    declarations: [FaceTagsComponent],
    imports: [
        CommonModule,
        EditorModule,
        FormsModule,
        MultiSelectModule

    ],
    exports: [FaceTagsComponent]
})
export class FaceTagsModule {}
