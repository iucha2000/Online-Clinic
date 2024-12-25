import { Component, Input } from '@angular/core';
import { TokenService } from '../../services/authentication/token.service';
import { ReservationService } from '../../services/reservation/reservation.service';
import { Reservation } from '../../models/reservation';
import { Subscription } from 'rxjs';
import { ComponentCommunicatorService } from '../../services/component-communicator.service';
import { UserRole } from '../../data/UserRole';
import { da } from 'date-fns/locale';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-calendar-reservation',
  templateUrl: './calendar-reservation.component.html',
  styleUrl: './calendar-reservation.component.css'
})
export class CalendarReservationComponent {
  private loginSubscription!: Subscription;

  @Input() currentReservation: Reservation | null = null;
  userReservations: Reservation[] | null = null;
  userRole = UserRole

  constructor(private tokenService: TokenService, private reservationService: ReservationService, private componentCommunicator: ComponentCommunicatorService, private route: ActivatedRoute){}

  ngOnInit(){
    this.initializeUserReservations();

    this.loginSubscription = this.componentCommunicator.userLoggedIn$.subscribe(() => {
      this.initializeUserReservations();
    });
  }

  initializeUserReservations(){
    if(this.tokenService.getUserId() != 0){
      if(this.tokenService.getRole() == UserRole.Patient){
        this.reservationService.getReservationsByPatient(this.tokenService.getUserId()).subscribe(data => {
          this.userReservations = data
        })
      }
      else if(this.tokenService.getRole() == UserRole.Doctor){
        this.reservationService.getReservationsByDoctor(this.tokenService.getUserId()).subscribe(data => {
          this.userReservations = data
        })
      }
      else{
        const doctorId = this.route.snapshot.paramMap.get('id');
        this.reservationService.getReservationsByDoctor(parseInt(doctorId!, 10)).subscribe(data => {
          this.userReservations = data
        })
      }
    }
  }

  isPatientReservation(){
    if (!this.userReservations || !this.currentReservation) {
      return false;
    }

    const userId = this.tokenService.getUserId();
    return this.userReservations.some(reservation => reservation.id === this.currentReservation!.id && reservation.patientId == userId)
  }

  isDoctorReservation(){
    if (!this.userReservations || !this.currentReservation) {
      return false;
    }
  
    let userId: number | null = null;
    if (this.tokenService.getRole() === UserRole.Doctor) {
      userId = this.tokenService.getUserId();
    } 
    else if (this.tokenService.getRole() === UserRole.Admin) {
      const id = this.route.snapshot.paramMap.get('id');
      userId = id ? Number(id) : null;
    }
  
    return this.userReservations.some(reservation => reservation.id === this.currentReservation!.id && reservation.doctorId == userId);
  }
}
