import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Doctor } from '../../models/doctor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private httpClient: HttpClient) { }

  addDoctor(doctor: Doctor){
    return this.httpClient.post<any>(`http://localhost:5161/api/Doctors/Add-Doctor`, doctor);
  }

  getDoctorData(id: number) : Observable<Doctor>{
    return this.httpClient.get<Doctor>(`http://localhost:5161/api/Doctors/Get-Doctor-By-Id/${id}`)
  }

  getAllDoctorsData() : Observable<Doctor[]>{
    return this.httpClient.get<Doctor[]>(`http://localhost:5161/api/Doctors/Get-All-Doctors`)
  }
}
