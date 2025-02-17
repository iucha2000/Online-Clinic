import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CategoryComponent } from './components/category/category.component';
import { AddDoctorComponent } from './components/add-doctor/add-doctor.component';
import { AuthGuard } from './guards/auth-guard';
import { AdminGuard } from './guards/admin-guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'reservation/:id',
    component: ReservationComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]

  },
  {
    path: 'profile/:id',
    component: ProfileComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'category',
    component: CategoryComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'register-doctor',
    component: AddDoctorComponent,
    canActivate: [AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
