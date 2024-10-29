import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patient } from '../../models/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private httpClient: HttpClient) { }

  addPatient(patient: Patient){
    return this.httpClient.post<any>(`http://localhost:5161/api/Patients/Add-Patient`, patient);
  }
}
