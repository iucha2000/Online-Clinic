import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Doctor } from '../../models/doctor';
import { map, Observable } from 'rxjs';
import { Category } from '../../data/Category';
import { CategoryInfo } from '../../models/categoryInfo';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FileService } from './file.service';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private httpClient: HttpClient, private fileService: FileService, private sanitizer: DomSanitizer) { }

  addDoctor(doctor: Doctor){
    return this.httpClient.post<any>(`http://localhost:5161/api/Doctors/Add-Doctor`, doctor);
  }

  updateDoctor(id: number, doctor: Partial<Doctor>){
    return this.httpClient.put<any>(`http://localhost:5161/api/Doctors/Update-Doctor/${id}`, doctor)
  }

  deleteDoctor(id: number){
    return this.httpClient.delete<any>(`http://localhost:5161/api/Doctors/Delete-Doctor/${id}`)
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

  getDoctorCategory(doctor: Doctor){
    return doctor.category ? Category[doctor.category] : '';
  }

  getDoctorRating(doctor: Doctor){
    return new Array(doctor.rating);
  }

  getDoctorImage(doctor: Doctor): Observable<SafeUrl> {
    return this.fileService.getDoctorImage(doctor.id).pipe(
      map((blob) => {
        const objectUrl = URL.createObjectURL(blob);
        return this.sanitizer.bypassSecurityTrustUrl(objectUrl);
      })
    );
  }

  getDoctorExperience(doctor: Doctor):Observable<any>{
    return this.fileService.getDoctorCvParsed(doctor.id)
  }
}
