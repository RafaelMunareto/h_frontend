import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DscMenuLateralComponent } from "./dsc-menu-lateral.component";
import { MatSidenavModule } from "@angular/material/sidenav";
import { DscInputModule } from "../dsc-input/dsc-input.module";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { ItemMenuExpansivelComponent } from "./item-menu-expansivel/item-menu-expansivel.component";
import { ItemMenuNormalComponent } from "./item-menu-normal/item-menu-normal.component";
import { ReactiveFormsModule } from "@angular/forms";
export class DscMenuLateralModule {
}
DscMenuLateralModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    DscMenuLateralComponent,
                    ItemMenuExpansivelComponent,
                    ItemMenuNormalComponent
                ],
                imports: [
                    CommonModule,
                    MatSidenavModule,
                    DscInputModule,
                    MatExpansionModule,
                    MatIconModule,
                    ReactiveFormsModule,
                ],
                exports: [DscMenuLateralComponent]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHNjLW1lbnUtbGF0ZXJhbC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9kc2MtY29tcG9uZW50cy9zcmMvbGliL2NvbXBvbmVudGVzL2RzYy1tZW51LWxhdGVyYWwvZHNjLW1lbnUtbGF0ZXJhbC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDdkUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSx1REFBdUQsQ0FBQztBQUNwRyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUN4RixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQW1CckQsTUFBTSxPQUFPLG9CQUFvQjs7O1lBaEJoQyxRQUFRLFNBQUM7Z0JBQ1IsWUFBWSxFQUFFO29CQUNaLHVCQUF1QjtvQkFDdkIsMkJBQTJCO29CQUMzQix1QkFBdUI7aUJBQ3hCO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxZQUFZO29CQUNaLGdCQUFnQjtvQkFDaEIsY0FBYztvQkFDZCxrQkFBa0I7b0JBQ2xCLGFBQWE7b0JBQ2IsbUJBQW1CO2lCQUNwQjtnQkFDRCxPQUFPLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQzthQUNuQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcbmltcG9ydCB7IERzY01lbnVMYXRlcmFsQ29tcG9uZW50IH0gZnJvbSBcIi4vZHNjLW1lbnUtbGF0ZXJhbC5jb21wb25lbnRcIjtcbmltcG9ydCB7IE1hdFNpZGVuYXZNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvbWF0ZXJpYWwvc2lkZW5hdlwiO1xuaW1wb3J0IHsgRHNjSW5wdXRNb2R1bGUgfSBmcm9tIFwiLi4vZHNjLWlucHV0L2RzYy1pbnB1dC5tb2R1bGVcIjtcbmltcG9ydCB7IE1hdEV4cGFuc2lvbk1vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9tYXRlcmlhbC9leHBhbnNpb25cIjtcbmltcG9ydCB7IE1hdEljb25Nb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvbWF0ZXJpYWwvaWNvblwiO1xuaW1wb3J0IHsgSXRlbU1lbnVFeHBhbnNpdmVsQ29tcG9uZW50IH0gZnJvbSBcIi4vaXRlbS1tZW51LWV4cGFuc2l2ZWwvaXRlbS1tZW51LWV4cGFuc2l2ZWwuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBJdGVtTWVudU5vcm1hbENvbXBvbmVudCB9IGZyb20gXCIuL2l0ZW0tbWVudS1ub3JtYWwvaXRlbS1tZW51LW5vcm1hbC5jb21wb25lbnRcIjtcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcblxuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBEc2NNZW51TGF0ZXJhbENvbXBvbmVudCxcbiAgICBJdGVtTWVudUV4cGFuc2l2ZWxDb21wb25lbnQsXG4gICAgSXRlbU1lbnVOb3JtYWxDb21wb25lbnRcbiAgXSxcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRTaWRlbmF2TW9kdWxlLFxuICAgIERzY0lucHV0TW9kdWxlLFxuICAgIE1hdEV4cGFuc2lvbk1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gIF0sXG4gIGV4cG9ydHM6IFtEc2NNZW51TGF0ZXJhbENvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgRHNjTWVudUxhdGVyYWxNb2R1bGUgeyB9XG4iXX0=