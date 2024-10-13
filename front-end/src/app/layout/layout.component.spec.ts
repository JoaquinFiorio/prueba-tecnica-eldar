import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutComponent } from './layout.component';
import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from '../components/nav-bar/nav-bar.component';
import { FooterComponent } from '../components/footer/footer.component';
import { RouterTestingModule } from '@angular/router/testing'; // Importa RouterTestingModule
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { LayoutRoutingModule } from './layout-routing.module';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutComponent, NavBarComponent, FooterComponent],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        CardModule,
        InputTextareaModule,
        MenuModule,
        CommonModule,
        LayoutRoutingModule,
        MenubarModule,
        DialogModule,
        ButtonModule,
        PanelModule,
        ReactiveFormsModule,
        FormsModule,
        ConfirmDialogModule,
        InputTextModule,
        TableModule
      ]
    });
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
