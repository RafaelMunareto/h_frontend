import { NgModule } from '@angular/core';

import { CalendarModule } from 'primeng/calendar';

import { RVCalendarComponent } from './rv-calendar.component';

@NgModule({
  declarations: [RVCalendarComponent],
  imports: [CalendarModule],
  exports: [RVCalendarComponent],
  providers: [],
  bootstrap: [RVCalendarComponent],
})
export class RVCalendarModule {}
