import { Component, Input } from '@angular/core';
import { TokenService } from '../../services/authentication/token.service';
import { ReservationService } from '../../services/reservation/reservation.service';
import { Reservation } from '../../models/reservation';

@Component({
  selector: 'app-calendar-reservation',
  templateUrl: './calendar-reservation.component.html',
  styleUrl: './calendar-reservation.component.css'
})
export class CalendarReservationComponent {
  @Input() currentReservation: Reservation | null = null;
  reservations: Reservation[] | null = null;

  constructor(private tokenService: TokenService, private reservationService: ReservationService){}

  ngOnInit(){
    this.reservationService.getReservationsByPatient(this.tokenService.getUserId()).subscribe(data => {
      this.reservations = data
    })
  }

  isOwnReservation(){
    //TODO implement this check
    return false;
  }
}
