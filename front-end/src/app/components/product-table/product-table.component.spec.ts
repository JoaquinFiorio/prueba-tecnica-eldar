import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTableComponent } from './product-table.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

describe('ProductTableComponent', () => {
  let component: ProductTableComponent;
  let fixture: ComponentFixture<ProductTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductTableComponent],
      providers: [
        MessageService,
        ConfirmationService,
        HttpClient,
        HttpHandler
      ],
      imports: [
        ButtonModule,
        TableModule,
        DialogModule,
        ConfirmDialogModule
      ]
    });
    fixture = TestBed.createComponent(ProductTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
