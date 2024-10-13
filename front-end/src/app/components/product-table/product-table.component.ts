import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { BehaviorSubject, Subject } from 'rxjs';
import { Product } from 'src/app/interfaces/Product';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ProductServiceService } from 'src/app/services/product-service.service';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css']
})
export class ProductTableComponent {
  productDialog: boolean = false;

  @Input() products!: Product[];
  @Output() productChange = new EventEmitter<Product[]>();
  @Output() createProduct = new EventEmitter<Product>();
  @Output() updateProduct = new EventEmitter<Product>();
  @Output() deleteProductEvent = new EventEmitter<Product>();

  product!: Product;

  selectedProducts!: Product[] | null;

  submitted: boolean = false;

  statuses!: any[];

  isAdmin: boolean = false;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private authService: AuthServiceService
  ) { }

  ngOnInit() {

    this.authService.isAdmin.subscribe((isAdminValue: boolean) => {
      this.isAdmin = isAdminValue;
    });

  }

  getMenuItems(product: any) {
    return [
      {
        label: 'Options',
        items: [
          {
            label: 'Edit',
            icon: 'pi pi-pencil',
            command: () => this.editProduct(product)
          },
          {
            label: 'Delete',
            icon: 'pi pi-trash',
            command: () => this.deleteProduct(product)
          }
        ]
      }
    ];
  }

  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
  }

  editProduct(product: Product) {
    this.product = { ...product };
    this.productDialog = true;
  }

  deleteProduct(product: Product) {
    if(!this.isAdmin) return;
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete product id: ' + product.id + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteProductEvent.emit(product);
        this.product = {};
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
      }
    });
  }

  hideDialog() {
    this.product = {};
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    if(!this.isAdmin) return;
    this.submitted = true;

    if (this.product.id) {
      this.updateProduct.emit(this.product);
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
    } else {
      this.createProduct.emit(this.product)
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
    }

    this.productDialog = false;
    this.product = {};
  }
}
