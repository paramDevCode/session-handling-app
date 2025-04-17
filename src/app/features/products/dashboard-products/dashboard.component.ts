import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { Router } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/models/product.model';
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { SearchComponent } from '../../../shared/components/search/search.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ProgressSpinnerModule,
    HeaderComponent,
    SearchComponent,
    ButtonModule,ConfirmDialogModule 
  ],
  providers:[ConfirmationService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  searchTerm: string = '';
  allProducts: Product[] = [];
  products: Product[] = [];
  loading = true;

  constructor(
    private productService: ProductService,
    public router: Router, private confirmationService: ConfirmationService 
  ) {}

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.allProducts = data;
        this.products = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching products', err);
        this.loading = false;
      },
    });
  }

  onSearch(term: string): void {
    const normalize = (str: string) =>
      str.toLowerCase().replace(/['"]/g, '');

    const normalizedTerm = normalize(term);

    this.products = this.allProducts.filter(product =>
      normalize(product.title).includes(normalizedTerm) ||
      normalize(product.category).includes(normalizedTerm)
    );
  }

  goToAddProduct(): void {
    this.router.navigate(['/products/add']);
  }

  goToEditProduct(product: Product): void {
    this.router.navigate(['/products/edit', product.id]);
  }
  confirmDelete(id: number): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this product?',
      accept: () => {
        this.deleteProduct(id);
      }
    });
  }
  
  

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(() => {
      this.getProduct();  
    });
  }
}
