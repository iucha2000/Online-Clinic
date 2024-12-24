import { Component, Input, SimpleChanges } from '@angular/core';
import { Patient } from '../../models/patient';
import { Doctor } from '../../models/doctor';
import { addDays, startOfWeek, addWeeks, format } from 'date-fns';
import { da, ka } from 'date-fns/locale';
import { Reservation } from '../../models/reservation';
import { ReservationService } from '../../services/reservation/reservation.service';
import { TokenService } from '../../services/authentication/token.service';
import { DisplayMessageService } from '../../services/display-message.service';
import { MessageConstants } from '../../data/MessageConstants';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  @Input() user: Doctor | Patient | null = null;
  reservations: Reservation[] | null = null;

  currentYear: string = '';
  currentMonth: string = '';
  currentWeekStart: Date = new Date();
  timeslots: string[] = [
    '9:00 - 10:00',
    '10:00 - 11:00',
    '11:00 - 12:00',
    '12:00 - 13:00',
    '13:00 - 14:00',
    '14:00 - 15:00',
    '15:00 - 16:00',
    '16:00 - 17:00'
  ];
  weekdays: { date: Date; dateLabel: string, dayLabel: string }[] = [];

  constructor(private reservationService: ReservationService, private tokenService: TokenService, private displayMessage: DisplayMessageService){}

  ngOnInit(): void {
    this.updateWeekdays();
    this.updateMonthYear();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user']) {
      this.getAllReservations();
    }
  }

  updateMonthYear(): void {
    this.currentMonth = format(this.currentWeekStart, 'MMMM', { locale: ka });
    this.currentYear = format(this.currentWeekStart, 'yyyy');
  }

  updateWeekdays(): void {
    const start = startOfWeek(this.currentWeekStart, { weekStartsOn: 1 });
    this.weekdays = Array.from({ length: 7 }, (_, i) => {
      const date = addDays(start, i);
      return {
        date,
        dateLabel: format(date, 'dd', { locale: ka }),
        dayLabel: format(date, '( EEE )', { locale: ka })
      };
    });
  }

  changeWeek(offset: number): void {
    this.currentWeekStart = addWeeks(this.currentWeekStart, offset);
    this.updateWeekdays();
    this.updateMonthYear();
  }

  getAllReservations(){
    if(this.user && this.user.role == 1){
      this.reservationService.getReservationsByPatient(this.user!.id).subscribe(data => {
        this.reservations = data
      })
    }
    else if(this.user && this.user.role == 2){
      this.reservationService.getReservationsByDoctor(this.user!.id).subscribe(data => {
        this.reservations = data
      })
    }
  }

  getReservationByTimeSlot(date: Date) : Reservation {
    const currRes = this.reservations?.find(reservation => {
      const reservationDate = new Date(reservation.reservationDate);
      return reservationDate.getDate() === date.getDate() &&
             reservationDate.getHours() === date.getHours();
    });
    return currRes ?? new Reservation();
  }

  addReservation(date: Date, timeslot: string): void {
    if(this.tokenService.getUserId() == 0){
      this.displayMessage.showError(MessageConstants.PLEASE_AUTHORIZE)
    }
    else{
      //TODO add modal for description
      const reservation = {id: 0, patientId: this.tokenService.getUserId(), doctorId: this.user!.id, description: "problem description", reservationDate: this.formatDate(date, timeslot)}
      this.reservationService.addReservation(reservation).subscribe(() => {
        this.getAllReservations();
      })
    }
  }

  isReserved(currentDate: Date, currentTimeslot: string){
    const formattedDate = this.formatDate(currentDate, currentTimeslot);

    return this.reservations?.some(date => 
      this.compareTimeSlots(formattedDate, new Date(date.reservationDate))
    ) ?? false;
  }

  formatDate(date: Date, timeslot: string){
    const startTime = timeslot.split(' - ')[0];
    const [hours, minutes] = startTime.split(':').map(num => parseInt(num, 10));
    
    const newDate = new Date(date);
    newDate.setHours(hours, minutes, 0, 0);
    return newDate;
  }

  compareTimeSlots(date1: Date, date2: Date){
    const date1WithoutTime = new Date(date1);
    const date2WithoutTime = new Date(date2);
  
    date1WithoutTime.setMinutes(0, 0, 0);
    date2WithoutTime.setMinutes(0, 0, 0);
    return date1WithoutTime.getTime() === date2WithoutTime.getTime();
  }
}
