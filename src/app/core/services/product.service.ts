import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://fakestoreapi.com/products';

  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSubject.asObservable();

  constructor(private http: HttpClient) {}

   //fetch products from api and update the behavior subject
  getProducts(searchTerm?: string): Observable<Product[]> {
    let url = this.apiUrl;
    if (searchTerm && searchTerm.trim() !== '') {
      url += `?q=${encodeURIComponent(searchTerm)}`;
    }
    return this.http.get<Product[]>(url).pipe(
      tap(data => {
        console.log('products:', data);
        this.productsSubject.next(data);
      }),
      catchError(this.handleError<Product[]>('getProducts', []))
    );
  }

 //fetch a single product by ID
  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`).pipe(
      tap(data => console.log(`product id=${id}`, data)),
      catchError(this.handleError<Product>('getProduct'))
    );
  }

  //add a new product
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product).pipe(
      tap(newProduct => {
        console.log('Added product:', newProduct);
        const current = this.productsSubject.getValue();
        this.productsSubject.next([...current, newProduct]);
      }),
      catchError(this.handleError<Product>('addProduct'))
    );
  }

 // update an existing product
  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product).pipe(
      tap(updated => {
        console.log('Updated product:', updated);
        const updatedList = this.productsSubject.getValue().map(p =>
          p.id === id ? updated : p
        );
        this.productsSubject.next(updatedList);
      }),
      catchError(this.handleError<Product>('updateProduct'))
    );
  }

  // delete a product
  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        console.log('deleted product:', id);
        const filtered = this.productsSubject.getValue().filter(p => p.id !== id);
        this.productsSubject.next(filtered);
      }),
      catchError(this.handleError<any>('deleteProduct'))
    );
  }

  //generic error handler
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
