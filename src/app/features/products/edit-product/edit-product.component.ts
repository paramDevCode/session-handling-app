import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/models/product.model';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,CardModule
  ],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent implements OnInit {
  productForm!: FormGroup;
  productId!: number;
  imageUrl: string | undefined;

  categories = [
    { label: 'Electronics', value: 'electronics' },
    { label: 'Fashion', value: 'fashion' },
    { label: 'Home Appliances', value: 'home-appliances' },
    { label: 'Books', value: 'books' }
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.productId = idParam ? +idParam : 0;

    this.productForm = this.fb.group({
      title: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
    });

    this.loadProduct();
  }

  get f() {
    return this.productForm.controls;
  }

  loadProduct() {
    this.productService.getProduct(this.productId).subscribe((product: Product) => {
      this.productForm.patchValue(product);
      this.imageUrl = product.image;
    });
  }

  onImageChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result as string;
        this.productForm.patchValue({ image: this.imageUrl });
      };
      reader.readAsDataURL(file);
    }
  }
  onSubmit() {
    if (this.productForm.valid) {
      const updatedProduct: Product = this.productForm.value;
      
      this.productService.updateProduct(this.productId, updatedProduct).subscribe(() => {
        // update the behavior subject
        this.productService.getProducts().subscribe(); 
        this.router.navigate(['/products']);
      });
    }
  }
  
   

  onCancel() {
    this.router.navigate(['/products']);
  }
  goBack() {
    this.router.navigate(['/products']); 
  }
}
