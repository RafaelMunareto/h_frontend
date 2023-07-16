import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rv-calendar',
  templateUrl: './rv-calendar.component.html',
  styleUrls: ['./rv-calendar.component.scss'],
})
export class RVCalendarComponent implements OnInit {
  date1: any;
  date2: any;
  date3: any;
  date4: any;
  date5: any;
  date6: any;
  date7: any;
  date8: any;
  date9: any;
  date10: any;
  date11: any;
  date12: any;
  date13: any;
  date14: any;
  dates: any[] = [];
  rangeDates: any[] = [];

  minDate: any;

  maxDate: any;

  invalidDates: Array<any> = [];

  constructor() {}

  ngOnInit() {
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = month === 0 ? 11 : month - 1;
    let prevYear = prevMonth === 11 ? year - 1 : year;
    let nextMonth = month === 11 ? 0 : month + 1;
    let nextYear = nextMonth === 0 ? year + 1 : year;
    this.minDate = new Date();
    this.minDate.setMonth(prevMonth);
    this.minDate.setFullYear(prevYear);
    this.maxDate = new Date();
    this.maxDate.setMonth(nextMonth);
    this.maxDate.setFullYear(nextYear);

    let invalidDate = new Date();
    invalidDate.setDate(today.getDate() - 1);
    this.invalidDates = [today, invalidDate];
  }
}
