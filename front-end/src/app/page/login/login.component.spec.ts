import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { of, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';
import { LoginComponent } from './login.component';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { LoginResponse } from 'src/app/interfaces/LoginResponse';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PasswordModule } from 'primeng/password';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RegisterComponent } from '../register/register.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthServiceService>;
  let messageService: jasmine.SpyObj<MessageService>;

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthServiceService', ['loginUser']);
    messageService = jasmine.createSpyObj('MessageService', ['add']);

    TestBed.configureTestingModule({
      declarations: [LoginComponent, RegisterComponent],
      imports: [
        ReactiveFormsModule,
        BrowserModule,
        BrowserAnimationsModule,
        PasswordModule,
        RouterTestingModule.withRoutes([
          { path: 'register', component: RegisterComponent }
        ]),
      ],
      providers: [
        { provide: AuthServiceService, useValue: authService },
        { provide: MessageService, useValue: messageService },
        Router,
        HttpClient,
        HttpHandler
      ]
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the login form with correct controls', () => {
    expect(component.loginForm.contains('email')).toBeTrue();
    expect(component.loginForm.contains('password')).toBeTrue();
    expect(component.loginForm.get('email')?.validator).toBeTruthy();
    expect(component.loginForm.get('password')?.validator).toBeTruthy();
  });

  it('should mark fields as touched if form is invalid on submit', () => {
    component.onSubmit();

    expect(component.loginForm.get('email')?.touched).toBeTrue();
    expect(component.loginForm.get('password')?.touched).toBeTrue();
  });
  
});
