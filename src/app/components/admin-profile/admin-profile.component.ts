import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Doctor } from '../../models/doctor';
import { DoctorService } from '../../services/doctor/doctor.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrl: './admin-profile.component.css'
})
export class AdminProfileComponent {

  doctorSelected = false;
  doctorId: string | null = null;
  doctor: Doctor | null = null;

  constructor(private route: ActivatedRoute, private doctorService: DoctorService){}

  ngOnInit(){
    this.doctorId = this.route.snapshot.paramMap.get('id')

    if(this.doctorId != null){
      this.doctorService.getDoctorData(parseInt(this.doctorId, 10)).subscribe(data => {
        this.doctor = data
        this.doctorSelected = true
      })
    }
  }
}
