import { Component } from '@angular/core';
import { Doctor } from '../../models/doctor';
import { DoctorService } from '../../services/doctor/doctor.service';
import { ActivatedRoute } from '@angular/router';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
})
export class ReservationComponent {
  doctor: Doctor | null = null
  imageUrl: SafeUrl | null = null;
  category: string | undefined
  rating: Array<number> | undefined

  //TODO add cv parsing and dynamic key-value initialization from server request
  entries: { key: string; value: any }[] = [
    { key: '2017 - დღემდე', value: 'ჩვენი კლინიკის გენერალური დირექტორი' },
    { key: '2002 - დღემდე', value: 'ჩვენი კომპიუტერული ტომოგრაფიის განყოფილების ხელმძღვანელი' },
    { key: '1995 - დღემდე', value: 'კარდიოლოგი / არითმოლოგი'}
  ];

  constructor(private route: ActivatedRoute, private doctorService: DoctorService){}

  ngOnInit(){
    const doctorId = parseInt(this.route.snapshot.paramMap.get('id') || '0', 10)
    this.doctorService.getDoctorData(doctorId).subscribe(data => {
      this.doctor = data
      this.category = this.doctorService.getDoctorCategory(this.doctor!)
      this.rating = this.doctorService.getDoctorRating(this.doctor!)
      this.doctorService.getDoctorImage(this.doctor!).subscribe(safeUrl => this.imageUrl = safeUrl)
    }) 
  }
}
