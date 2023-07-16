import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DscTabComponent } from './dsc-tab.component';
import { MatTabsModule } from "@angular/material/tabs";
import { MatIconModule } from "@angular/material/icon";
export class DscTabModule {
}
DscTabModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    DscTabComponent
                ],
                imports: [
                    CommonModule,
                    MatTabsModule,
                    MatIconModule
                ],
                exports: [
                    DscTabComponent
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHNjLXRhYi5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9kc2MtY29tcG9uZW50cy9zcmMvbGliL2NvbXBvbmVudGVzL2RzYy10YWIvZHNjLXRhYi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFpQnZELE1BQU0sT0FBTyxZQUFZOzs7WUFieEIsUUFBUSxTQUFDO2dCQUNSLFlBQVksRUFBRTtvQkFDWixlQUFlO2lCQUNoQjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsWUFBWTtvQkFDWixhQUFhO29CQUNiLGFBQWE7aUJBQ2Q7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLGVBQWU7aUJBQ2hCO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERzY1RhYkNvbXBvbmVudCB9IGZyb20gJy4vZHNjLXRhYi5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0VGFic01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9tYXRlcmlhbC90YWJzXCI7XG5pbXBvcnQgeyBNYXRJY29uTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL21hdGVyaWFsL2ljb25cIjtcblxuXG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIERzY1RhYkNvbXBvbmVudFxuICBdLFxuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdFRhYnNNb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgRHNjVGFiQ29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRHNjVGFiTW9kdWxlIHsgfVxuIl19