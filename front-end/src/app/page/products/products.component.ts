import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Product } from 'src/app/interfaces/Product';
import { ProductServiceService } from 'src/app/services/product-service.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {

  products!: Product[];

  constructor(
    private productService: ProductServiceService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts() {
    this.productService.getProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Something gone wrong', detail: 'Please, try again later', life: 3000 });
      }
    });
  }

  onProductChange(updatedProducts: Product[]) {
    this.products = updatedProducts;
  }

  createProduct(product: Product) {

    const newItem: Product = {
      title: product.title,
      body: product.body,
      userId: "1"
    }

    this.productService.createProduct(newItem).subscribe({
      next: (res: Product) => {
        const updatedProducts = [res, ...this.products]
        this.onProductChange(updatedProducts)
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Something gone wrong', detail: 'Please, try again later', life: 3000 });
      }
    })
  }

  updateProduct(product: Product) {
    this.productService.updateProduct(product).subscribe({
      next: (updatedProduct: Product) => {
        const productIndex = this.products.findIndex((p) => p.id === updatedProduct.id);
        if (productIndex !== -1) {
          this.products[productIndex] = updatedProduct;
          this.products = [...this.products];
        }
        this.messageService.add({ severity: 'success', summary: 'Product Updated', detail: 'The product was successfully updated.', life: 3000 });
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Something went wrong', detail: 'Please try again later.', life: 3000 });
      }
    });
  }

  deleteProduct(product: Product) {
    this.productService.deleteProduct(product).subscribe({
      next: (res: Product) => {
        this.products = this.products.filter((val) => val.id !== product.id);
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Something gone wrong', detail: 'Please, try again later', life: 3000 });
      }
    })
  }
}
