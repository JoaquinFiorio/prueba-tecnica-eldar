import { Injectable } from '@angular/core';
import { Product } from '../interfaces/Product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  url: string = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url)
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.url}/${id}`)
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.url, product)
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.url}/${product.id}`, product)
  }

  deleteProduct(product: Product): Observable<Product> {
    return this.http.delete<Product>(`${this.url}/${product.id}`)
  }
}
