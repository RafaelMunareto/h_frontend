import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DscInputFileComponent } from './dsc-input-file.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DscButtonModule } from "../dsc-button/dsc-button.module";
import { MatTooltipModule } from "@angular/material/tooltip";
export class DscInputFileModule {
}
DscInputFileModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    DscInputFileComponent
                ],
                imports: [
                    CommonModule,
                    MatIconModule,
                    MatButtonModule,
                    DscButtonModule,
                    MatTooltipModule
                ],
                exports: [DscInputFileComponent]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHNjLWlucHV0LWZpbGUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZHNjLWNvbXBvbmVudHMvc3JjL2xpYi9jb21wb25lbnRlcy9kc2MtaW5wdXQtZmlsZS9kc2MtaW5wdXQtZmlsZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDbkUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDbEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFpQjdELE1BQU0sT0FBTyxrQkFBa0I7OztZQWI5QixRQUFRLFNBQUM7Z0JBQ1IsWUFBWSxFQUFFO29CQUNaLHFCQUFxQjtpQkFDdEI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osYUFBYTtvQkFDYixlQUFlO29CQUNmLGVBQWU7b0JBQ2YsZ0JBQWdCO2lCQUNqQjtnQkFDRCxPQUFPLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQzthQUNqQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRHNjSW5wdXRGaWxlQ29tcG9uZW50IH0gZnJvbSAnLi9kc2MtaW5wdXQtZmlsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0SWNvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2ljb24nO1xuaW1wb3J0IHsgTWF0QnV0dG9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYnV0dG9uJztcbmltcG9ydCB7IERzY0J1dHRvbk1vZHVsZSB9IGZyb20gXCIuLi9kc2MtYnV0dG9uL2RzYy1idXR0b24ubW9kdWxlXCI7XG5pbXBvcnQgeyBNYXRUb29sdGlwTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL21hdGVyaWFsL3Rvb2x0aXBcIjtcblxuXG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIERzY0lucHV0RmlsZUNvbXBvbmVudFxuICBdLFxuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgIERzY0J1dHRvbk1vZHVsZSxcbiAgICBNYXRUb29sdGlwTW9kdWxlXG4gIF0sXG4gIGV4cG9ydHM6IFtEc2NJbnB1dEZpbGVDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIERzY0lucHV0RmlsZU1vZHVsZSB7IH1cbiJdfQ==