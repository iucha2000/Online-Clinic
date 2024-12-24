import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarReservationComponent } from './calendar-reservation.component';

describe('CalendarReservationComponent', () => {
  let component: CalendarReservationComponent;
  let fixture: ComponentFixture<CalendarReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalendarReservationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
