import { Component, Input } from '@angular/core';
import { Patient } from '../../models/patient';
import { Doctor } from '../../models/doctor';
import { addDays, startOfWeek, addWeeks, format } from 'date-fns';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  @Input() user: Doctor | Patient | null = null;

  currentMonthYear: string = '';
  currentWeekStart: Date = new Date();
  timeslots: string[] = [
    '9:00-10:00',
    '10:00-11:00',
    '11:00-12:00',
    '12:00-13:00',
    '13:00-14:00',
    '14:00-15:00',
    '15:00-16:00',
    '16:00-17:00'
  ];
  weekdays: { date: Date; label: string }[] = [];

  ngOnInit(): void {
    this.updateWeekdays();
    this.updateMonthYear();
  }

  updateMonthYear(): void {
    this.currentMonthYear = format(this.currentWeekStart, 'MMMM yyyy');
  }

  updateWeekdays(): void {
    const start = startOfWeek(this.currentWeekStart, { weekStartsOn: 1 });
    this.weekdays = Array.from({ length: 7 }, (_, i) => {
      const date = addDays(start, i);
      return { date, label: format(date, 'dd/MM (EEEE)') };
    });
  }

  changeWeek(offset: number): void {
    this.currentWeekStart = addWeeks(this.currentWeekStart, offset);
    this.updateWeekdays();
    this.updateMonthYear();
  }

  logSlot(weekday: { date: Date; label: string }, timeslot: string): void {
    console.log(`Selected: ${weekday.label}, ${timeslot}`);
  }
}
