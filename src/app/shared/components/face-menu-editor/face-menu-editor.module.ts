import { AutocompleteIconesComponent } from './../autocomplete-icones/autocomplete-icones.component';
import { FaceMenuEditorComponent } from './face-menu-editor.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FaceMenuEditorService } from './face-menu-editor.service';
import { FaceMenuEditorStore } from './face-menu-editor.store';
import { ToolbarModule } from 'primeng/toolbar';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';
import { TabelaGruposComponent } from './tabela-grupos/tabela-grupos.component';
import { TabelaItensComponent } from './tabela-itens/tabela-itens.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { UploadService } from '../../services/upload.service';
import { TemplateItemComponent } from './tabela-grupos/template-item/template-item.component';
import { OrderListModule } from 'primeng/orderlist';
import { SkeletonModule } from 'primeng/skeleton';
import { FormGrupoComponent } from './tabela-grupos/form-grupo/form-grupo.component';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TemplateGrupoComponent } from './tabela-grupos/template-grupo/template-grupo.component';
import { TabViewModule } from 'primeng/tabview';
import { ScrollPanelModule } from 'primeng/scrollpanel';

@NgModule({
  declarations: [
    FaceMenuEditorComponent,
    TabelaGruposComponent,
    TabelaItensComponent,
    TemplateItemComponent,
    FormGrupoComponent,
    TemplateGrupoComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ToolbarModule,
    DropdownModule,
    TooltipModule,
    ButtonModule,
    TableModule,
    OrderListModule,
    SkeletonModule,
    InputTextModule,
    InputTextareaModule,
    FileUploadModule,
    ButtonModule,
    ToggleButtonModule,
    ReactiveFormsModule,
    TabViewModule,
    ScrollPanelModule,
    AutocompleteIconesComponent,
    DropdownModule,
  ],
  exports: [FaceMenuEditorComponent],
  providers: [FaceMenuEditorService, FaceMenuEditorStore, UploadService],
})
export class FaceMenuEditorModule {}
