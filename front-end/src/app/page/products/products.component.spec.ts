import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsComponent } from './products.component';
import { ProductServiceService } from 'src/app/services/product-service.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { of, throwError } from 'rxjs';
import { Product } from 'src/app/interfaces/Product';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ProductTableComponent } from 'src/app/components/product-table/product-table.component';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productService: jasmine.SpyObj<ProductServiceService>;
  let messageService: jasmine.SpyObj<MessageService>;

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductServiceService', ['getProducts', 'createProduct', 'updateProduct', 'deleteProduct']);
    const messageServiceSpy = jasmine.createSpyObj('MessageService', ['add']);

    productServiceSpy.getProducts.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      declarations: [
        ProductsComponent,
        ProductTableComponent
      ],
      providers: [
        { provide: ProductServiceService, useValue: productServiceSpy },
        { provide: MessageService, useValue: messageServiceSpy },
        ConfirmationService,
        HttpClient,
        HttpHandler
      ],
      imports: [
        ButtonModule,
        TableModule,
        DialogModule,
        ConfirmDialogModule,
        BrowserAnimationsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductServiceService) as jasmine.SpyObj<ProductServiceService>;
    messageService = TestBed.inject(MessageService) as jasmine.SpyObj<MessageService>;
  });

  beforeEach(() => {
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getProducts on init', () => {
    const productsMock: Product[] = [{ id: "1", title: 'Product 1', body: 'Description 1', userId: '1' }];
    productService.getProducts.and.returnValue(of(productsMock));

    component.ngOnInit();

    expect(productService.getProducts).toHaveBeenCalled();
    expect(component.products).toEqual(productsMock);
});

  it('should handle error when getProducts fails', () => {
    productService.getProducts.and.returnValue(throwError('error'));

    component.ngOnInit();

    expect(messageService.add).toHaveBeenCalledWith({ severity: 'error', summary: 'Something gone wrong', detail: 'Please, try again later', life: 3000 });
  });

  it('should update products on product change', () => {
    const updatedProducts: Product[] = [{ id: "2", title: 'Product 2', body: 'Description 2', userId: '1' }];
    
    component.onProductChange(updatedProducts);

    expect(component.products).toEqual(updatedProducts);
  });

  it('should create a new product and add it to the list', () => {
    const newProduct: Product = { id: "1", title: 'Product 1', body: 'Description 1', userId: '1' };
    const productsMock: Product[] = [{ id: "2", title: 'Product 2', body: 'Description 2', userId: '1' }];
    
    productService.createProduct.and.returnValue(of(newProduct));
    component.products = productsMock;

    component.createProduct(newProduct);

    expect(productService.createProduct).toHaveBeenCalledWith(jasmine.any(Object));
    expect(component.products).toEqual([newProduct, ...productsMock]);
  });

  it('should handle error when creating a product fails', () => {
    const newProduct: Product = { title: 'Product 1', body: 'Description 1', userId: '1' };

    productService.createProduct.and.returnValue(throwError('error'));

    component.createProduct(newProduct);

    expect(messageService.add).toHaveBeenCalledWith({ severity: 'error', summary: 'Something gone wrong', detail: 'Please, try again later', life: 3000 });
  });

  it('should update an existing product', () => {
    const updatedProduct: Product = { id: "1", title: 'Updated Product', body: 'Updated Description', userId: '1' };
    const productsMock: Product[] = [{ id: "1", title: 'Product 1', body: 'Description 1', userId: '1' }];

    component.products = productsMock;
    productService.updateProduct.and.returnValue(of(updatedProduct));

    component.updateProduct(updatedProduct);

    expect(productService.updateProduct).toHaveBeenCalledWith(updatedProduct);
    expect(component.products[0]).toEqual(updatedProduct);
    expect(messageService.add).toHaveBeenCalledWith({ severity: 'success', summary: 'Product Updated', detail: 'The product was successfully updated.', life: 3000 });
  });

  it('should handle error when updating a product fails', () => {
    const product: Product = { id: "1", title: 'Product 1', body: 'Description 1', userId: '1' };

    productService.updateProduct.and.returnValue(throwError('error'));

    component.updateProduct(product);

    expect(messageService.add).toHaveBeenCalledWith({ severity: 'error', summary: 'Something went wrong', detail: 'Please try again later.', life: 3000 });
  });

  it('should delete a product', () => {
    const product: Product = { id: "1", title: 'Product 1', body: 'Description 1', userId: '1' };
    const productsMock: Product[] = [product, { id: "2", title: 'Product 2', body: 'Description 2', userId: '1' }];

    component.products = productsMock;
    productService.deleteProduct.and.returnValue(of(product));

    component.deleteProduct(product);

    expect(productService.deleteProduct).toHaveBeenCalledWith(product);
    expect(component.products).toEqual([{ id: "2", title: 'Product 2', body: 'Description 2', userId: '1' }]);
  });

  it('should handle error when deleting a product fails', () => {
    const product: Product = { id: "1", title: 'Product 1', body: 'Description 1', userId: '1' };

    productService.deleteProduct.and.returnValue(throwError('error'));

    component.deleteProduct(product);

    expect(messageService.add).toHaveBeenCalledWith({ severity: 'error', summary: 'Something gone wrong', detail: 'Please, try again later', life: 3000 });
  });
});
