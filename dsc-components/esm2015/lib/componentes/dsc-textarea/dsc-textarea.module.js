import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DscTextareaComponent } from './dsc-textarea.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DscFormFieldErrorModule } from '../dsc-form-field-error/dsc-form-field-error.module';
import { MatButtonModule } from '@angular/material/button';
export class DscTextareaModule {
}
DscTextareaModule.decorators = [
    { type: NgModule, args: [{
                declarations: [DscTextareaComponent],
                imports: [
                    CommonModule,
                    MatInputModule,
                    ReactiveFormsModule,
                    MatIconModule,
                    MatTooltipModule,
                    FormsModule,
                    DscFormFieldErrorModule,
                    MatButtonModule
                ],
                exports: [DscTextareaComponent]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHNjLXRleHRhcmVhLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2RzYy1jb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50ZXMvZHNjLXRleHRhcmVhL2RzYy10ZXh0YXJlYS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDN0QsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0scURBQXFELENBQUM7QUFDOUYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBZ0IzRCxNQUFNLE9BQU8saUJBQWlCOzs7WUFkN0IsUUFBUSxTQUFDO2dCQUNSLFlBQVksRUFBRSxDQUFDLG9CQUFvQixDQUFDO2dCQUNwQyxPQUFPLEVBQUU7b0JBQ1AsWUFBWTtvQkFDWixjQUFjO29CQUNkLG1CQUFtQjtvQkFDbkIsYUFBYTtvQkFDYixnQkFBZ0I7b0JBQ2hCLFdBQVc7b0JBQ1gsdUJBQXVCO29CQUN2QixlQUFlO2lCQUNoQjtnQkFDRCxPQUFPLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQzthQUNoQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRHNjVGV4dGFyZWFDb21wb25lbnQgfSBmcm9tICcuL2RzYy10ZXh0YXJlYS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0SW5wdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pbnB1dCc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE1hdEljb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pY29uJztcbmltcG9ydCB7IE1hdFRvb2x0aXBNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90b29sdGlwJztcbmltcG9ydCB7IERzY0Zvcm1GaWVsZEVycm9yTW9kdWxlIH0gZnJvbSAnLi4vZHNjLWZvcm0tZmllbGQtZXJyb3IvZHNjLWZvcm0tZmllbGQtZXJyb3IubW9kdWxlJztcbmltcG9ydCB7IE1hdEJ1dHRvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2J1dHRvbic7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW0RzY1RleHRhcmVhQ29tcG9uZW50XSxcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgTWF0VG9vbHRpcE1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBEc2NGb3JtRmllbGRFcnJvck1vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGVcbiAgXSxcbiAgZXhwb3J0czogW0RzY1RleHRhcmVhQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBEc2NUZXh0YXJlYU1vZHVsZSB7fVxuIl19