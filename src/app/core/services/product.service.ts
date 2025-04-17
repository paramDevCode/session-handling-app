import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://fakestoreapi.com/products'; 

  constructor(private http: HttpClient) {}

  // Fetch all products
  getProducts(searchTerm?: string): Observable<Product[]> {
    let url = this.apiUrl;
  
    if (searchTerm && searchTerm.trim() !== '') {
      url += `?q=${encodeURIComponent(searchTerm)}`; 
    }
  
    return this.http.get<Product[]>(url).pipe(
      tap((data) => console.log('Products:', data)),
      catchError(this.handleError<Product[]>('getProducts', []))
    );
  }
  

  // Fetch a product by ID
  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`).pipe(
      tap((data) => console.log(`Fetched Product id=${id}`, data)),
      catchError(this.handleError<Product>('getProduct'))
    );
  }

  // Add a new product
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product).pipe(
      tap((data) => console.log('Added Product:', data)),
      catchError(this.handleError<Product>('addProduct'))
    );
  }

  // Update an existing product
  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product).pipe(
      tap((data) => console.log('Updated Product:', data)),
      catchError(this.handleError<Product>('updateProduct'))
    );
  }

  // Delete a product
  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
      tap(() => console.log('Deleted Product:', id)),
      catchError(this.handleError('deleteProduct'))
    );
  }

  // Handle HTTP errors
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  
}
