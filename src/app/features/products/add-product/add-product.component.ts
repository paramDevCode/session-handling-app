import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';  
import { Product } from '../../../core/models/product.model';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,CardModule
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {
  @Output() saved = new EventEmitter<any>();

  productForm: FormGroup;
  categories = [
    { label: 'Electronics', value: 'electronics' },
    { label: 'Fashion', value: 'fashion' },
    { label: 'Home Appliances', value: 'home-appliances' },
    { label: 'Books', value: 'books' }
  ];
  imageUrl: string | undefined;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private productService: ProductService
  ) {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  get f() {
    return this.productForm.controls;
  }

  onSubmit() {
    if (this.productForm.valid) {
      const newProduct: Product = this.productForm.value;

      this.productService.addProduct(newProduct).subscribe((addedProduct) => {
        console.log('Product added:', addedProduct);
        this.router.navigate(['/products']);  
      });
    }
  }

  onImageChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files[0]) {
      const file = input.files[0];
      this.imageUrl = URL.createObjectURL(file);
    }
  }

  onCancel() {
    this.router.navigate(['/products']);
  }
  goBack() {
    this.router.navigate(['/products']); 
  }
  
}
