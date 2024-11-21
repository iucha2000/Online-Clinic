import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private httpClient: HttpClient) { }

  getDoctorImage(doctorId: number | undefined) : Observable<Blob>{
    return this.httpClient.get(`http://localhost:5161/api/Doctors/Get-Image/${doctorId}`, {responseType: 'blob' })
  }

  getDoctorCvParsed(doctorId: number | undefined) : Observable<any>{
    return this.httpClient.get(`http://localhost:5161/api/Doctors/Parse-CV/${doctorId}`, {})
  }
}
