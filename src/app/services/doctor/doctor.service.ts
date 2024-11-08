import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Doctor } from '../../models/doctor';
import { Observable } from 'rxjs';
import { Category } from '../../data/Category';
import { CategoryInfo } from '../../models/categoryInfo';

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

  getDoctorCategoryCount() : Observable<CategoryInfo[]>{
    return this.httpClient.get<CategoryInfo[]>(`http://localhost:5161/api/Doctors/Get-Category-List`)
  }
}
