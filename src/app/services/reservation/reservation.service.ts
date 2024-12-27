import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from '../../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private httpClient: HttpClient) { }

  getReservationsByDoctor(doctorId: number) : Observable<Reservation[]>{
    return this.httpClient.get<Reservation[]>(`http://localhost:5161/api/Reservations/Get-Reservations-By-Doctor/${doctorId}`)
  }

  getReservationsByPatient(patiendId: number) : Observable<Reservation[]>{
    return this.httpClient.get<Reservation[]>(`http://localhost:5161/api/Reservations/Get-Reservations-By-Patient/${patiendId}`)
  }

  addReservation(reservation: Reservation){
    return this.httpClient.post<any>(`http://localhost:5161/api/Reservations/Add-Reservation`,reservation)
  }

  updateReservation(reservationId: number, reservation: Partial<Reservation>){
    return this.httpClient.put<any>(`http://localhost:5161/api/Reservations/Update-Reservation/${reservationId}`, reservation)
  }

  deleteReservation(reservationId: number){
    return this.httpClient.delete<any>(`http://localhost:5161/api/Reservations/Delete-Reservation/${reservationId}`)
  }
}
