import { Routes } from '@angular/router';
import { DashboardComponent } from './features/products/dashboard-products/dashboard.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
 

export  const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'products', component: DashboardComponent },
      {
        path: 'products/add',
        loadComponent: () => import('./features/products/add-product/add-product.component').then(m => m.AddProductComponent)
      },
      {
        path: 'products/edit/:id',
        loadComponent: () => import('./features/products/edit-product/edit-product.component').then(m => m.EditProductComponent),
       
      },
      { path: '', redirectTo: 'products', pathMatch: 'full' }
    ]
  }
 ];
