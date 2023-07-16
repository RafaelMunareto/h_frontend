import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { DividerModule } from 'primeng/divider';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputTextModule } from 'primeng/inputtext';
import { TabMenuModule } from 'primeng/tabmenu';
import { PanelModule } from 'primeng/panel';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SkeletonModule } from 'primeng/skeleton';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { InputMaskModule } from 'primeng/inputmask';

@NgModule({
  declarations: [],
  imports: [
    TableModule,
    DialogModule,
    ButtonModule,
    DropdownModule,
    ScrollPanelModule,
    DividerModule,
    InputSwitchModule,
    TagModule,
    TooltipModule,
    ToggleButtonModule,
    AutoCompleteModule,
    InputTextModule,
    TabMenuModule,
    PanelModule,
    SelectButtonModule,
    SkeletonModule,
    ToolbarModule,
    CardModule,
    CheckboxModule,
    InputMaskModule,
  ],
  exports: [
    TableModule,
    DialogModule,
    ButtonModule,
    DropdownModule,
    ScrollPanelModule,
    DividerModule,
    InputSwitchModule,
    TagModule,
    TooltipModule,
    ToggleButtonModule,
    AutoCompleteModule,
    InputTextModule,
    TabMenuModule,
    PanelModule,
    SelectButtonModule,
    SkeletonModule,
    ToolbarModule,
    CardModule,
    CheckboxModule,
    InputMaskModule,
  ],
})
export class PrimengExptsModule {}
