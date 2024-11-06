import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patient } from '../../models/patient';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private httpClient: HttpClient) { }

  addPatient(patient: Patient){
    return this.httpClient.post<any>(`http://localhost:5161/api/Patients/Add-Patient`, patient);
  }

  getPatientData(id: number) : Observable<Patient>{
    return this.httpClient.get<Patient>(`http://localhost:5161/api/Patients/Get-Patient-By-Id/${id}`)
  }
}
