import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductServiceService } from './product-service.service';
import { Product } from '../interfaces/Product';

describe('ProductServiceService', () => {
  let service: ProductServiceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductServiceService]
    });
    service = TestBed.inject(ProductServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya solicitudes pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all products', () => {
    const mockProducts: Product[] = [
      { id: "1", title: 'Product 1', body: 'Description of Product 1', userId: '1' },
      { id: "2", title: 'Product 2', body: 'Description of Product 2', userId: '1' },
    ];

    service.getProducts().subscribe(products => {
      expect(products.length).toBe(2);
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne(service.url);
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should get a product by id', () => {
    const mockProduct: Product = { id: "1", title: 'Product 1', body: 'Description of Product 1', userId: '1' };

    service.getProduct(1).subscribe(product => {
      expect(product).toEqual(mockProduct);
    });

    const req = httpMock.expectOne(`${service.url}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProduct);
  });

  it('should create a product', () => {
    const newProduct: Product = { id: "3", title: 'Product 3', body: 'Description of Product 3', userId: '1' };

    service.createProduct(newProduct).subscribe(product => {
      expect(product).toEqual(newProduct);
    });

    const req = httpMock.expectOne(service.url);
    expect(req.request.method).toBe('POST');
    req.flush(newProduct);
  });

  it('should update a product', () => {
    const updatedProduct: Product = { id: "1", title: 'Updated Product', body: 'Updated Description', userId: '1' };

    service.updateProduct(updatedProduct).subscribe(product => {
      expect(product).toEqual(updatedProduct);
    });

    const req = httpMock.expectOne(`${service.url}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedProduct);
  });

  it('should delete a product', () => {
    const productToDelete: Product = { id: "1", title: 'Product 1', body: 'Description of Product 1', userId: '1' };

    service.deleteProduct(productToDelete).subscribe(response => {
      expect(response).toEqual(productToDelete);
    });

    const req = httpMock.expectOne(`${service.url}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(productToDelete);
  });
});
