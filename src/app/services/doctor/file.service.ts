import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  uploadDoctorImage(doctorId: number, file: File){
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.httpClient.post(`http://localhost:5161/api/Doctors/Upload-Image/${doctorId}`, formData);
  }

  getDoctorCvParsed(doctorId: number | undefined) : Observable<any>{
    return this.httpClient.get(`http://localhost:5161/api/Doctors/Parse-CV/${doctorId}`, {})
  }

  uploadDoctorCv(doctorId: number, file: File){
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.httpClient.post(`http://localhost:5161/api/Doctors/Upload-CV/${doctorId}`, formData)
  }
}
