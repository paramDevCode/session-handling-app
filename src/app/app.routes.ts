import { Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { TablePageComponent } from './pages/table-page/table-page.component';
   

export  const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: LandingPageComponent },
      { path: 'table-page', component: TablePageComponent },
    ],
  },
  { path: '**', redirectTo: '' },
 ];
