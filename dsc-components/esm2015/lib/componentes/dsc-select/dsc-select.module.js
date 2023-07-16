import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { ReactiveFormsModule } from '@angular/forms';
import { DscSelectComponent } from './dsc-select.component';
import { DscInputModule } from '../dsc-input/dsc-input.module';
import { DscFormFieldErrorModule } from '../dsc-form-field-error/dsc-form-field-error.module';
export class DscSelectModule {
}
DscSelectModule.decorators = [
    { type: NgModule, args: [{
                declarations: [DscSelectComponent],
                imports: [
                    CommonModule,
                    MatFormFieldModule,
                    MatSelectModule,
                    MatTooltipModule,
                    MatIconModule,
                    DscInputModule,
                    MatChipsModule,
                    ReactiveFormsModule,
                    DscFormFieldErrorModule
                ],
                exports: [DscSelectComponent]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHNjLXNlbGVjdC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9kc2MtY29tcG9uZW50cy9zcmMvbGliL2NvbXBvbmVudGVzL2RzYy1zZWxlY3QvZHNjLXNlbGVjdC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzNELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzdELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDekQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFckQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQy9ELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHFEQUFxRCxDQUFDO0FBaUI5RixNQUFNLE9BQU8sZUFBZTs7O1lBZjNCLFFBQVEsU0FBQztnQkFDUixZQUFZLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztnQkFDbEMsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osa0JBQWtCO29CQUNsQixlQUFlO29CQUNmLGdCQUFnQjtvQkFDaEIsYUFBYTtvQkFDYixjQUFjO29CQUNkLGNBQWM7b0JBQ2QsbUJBQW1CO29CQUNuQix1QkFBdUI7aUJBQ3hCO2dCQUNELE9BQU8sRUFBRSxDQUFDLGtCQUFrQixDQUFDO2FBQzlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBNYXRGb3JtRmllbGRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9mb3JtLWZpZWxkJztcbmltcG9ydCB7IE1hdFNlbGVjdE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NlbGVjdCc7XG5pbXBvcnQgeyBNYXRUb29sdGlwTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdG9vbHRpcCc7XG5pbXBvcnQgeyBNYXRJY29uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaWNvbic7XG5pbXBvcnQgeyBNYXRDaGlwc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NoaXBzJztcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IERzY1NlbGVjdENvbXBvbmVudCB9IGZyb20gJy4vZHNjLXNlbGVjdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRHNjSW5wdXRNb2R1bGUgfSBmcm9tICcuLi9kc2MtaW5wdXQvZHNjLWlucHV0Lm1vZHVsZSc7XG5pbXBvcnQgeyBEc2NGb3JtRmllbGRFcnJvck1vZHVsZSB9IGZyb20gJy4uL2RzYy1mb3JtLWZpZWxkLWVycm9yL2RzYy1mb3JtLWZpZWxkLWVycm9yLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW0RzY1NlbGVjdENvbXBvbmVudF0sXG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxuICAgIE1hdFNlbGVjdE1vZHVsZSxcbiAgICBNYXRUb29sdGlwTW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgRHNjSW5wdXRNb2R1bGUsXG4gICAgTWF0Q2hpcHNNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBEc2NGb3JtRmllbGRFcnJvck1vZHVsZVxuICBdLFxuICBleHBvcnRzOiBbRHNjU2VsZWN0Q29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBEc2NTZWxlY3RNb2R1bGUge31cbiJdfQ==