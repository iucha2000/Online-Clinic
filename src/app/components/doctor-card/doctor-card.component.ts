import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Doctor } from '../../models/doctor';
import { SafeUrl } from '@angular/platform-browser';
import { DoctorService } from '../../services/doctor/doctor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-card',
  templateUrl: './doctor-card.component.html',
  styleUrl: './doctor-card.component.css'
})
export class DoctorCardComponent {

  @Input() doctor: Doctor | null = null;
  imageUrl: SafeUrl | null = null;
  category: string | undefined
  rating: Array<number> | undefined
  @Output() pinToggled: EventEmitter<void> = new EventEmitter();

  constructor(private doctorService: DoctorService, private router: Router){}

  ngOnInit(){
    this.category = this.doctorService.getDoctorCategory(this.doctor!)
    this.rating = this.doctorService.getDoctorRating(this.doctor!)
    this.doctorService.getDoctorImage(this.doctor!).subscribe(safeUrl => this.imageUrl = safeUrl)
  }

  TogglePin(){
    this.doctor!.isPinned = !this.doctor!.isPinned
    this.pinToggled.emit();
  }

  onSelectReservation(doctor: Doctor): void {
    this.router.navigate([`/reservation/${doctor.id}`]);
  }
}
