import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { InformationComponent } from './pages/information/information.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'info', component: InformationComponent },
];
