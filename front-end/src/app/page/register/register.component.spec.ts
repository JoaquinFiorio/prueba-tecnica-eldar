import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { of, throwError } from 'rxjs';
import { RegisterComponent } from './register.component';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { MessageRepsonse } from 'src/app/interfaces/MessageResponse';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from '../login/login.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: jasmine.SpyObj<AuthServiceService>;
  let messageService: jasmine.SpyObj<MessageService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthServiceService', ['registerUser']);
    router = jasmine.createSpyObj('Router', ['navigate']);
    messageService = jasmine.createSpyObj('MessageService', ['add']);

    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        PasswordModule,
        CheckboxModule,
        RouterTestingModule.withRoutes([
          { path: 'login', component: LoginComponent }
        ]),
        BrowserAnimationsModule
      ],
      declarations: [RegisterComponent, LoginComponent],
      providers: [
        { provide: AuthServiceService, useValue: authService },
        { provide: MessageService, useValue: messageService },
        HttpClient,
        HttpHandler
      ]
    });

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form correctly', () => {
    expect(component.registerForm.valid).toBeFalse();
    expect(component.registerForm.controls['name'].value).toBe('');
    expect(component.registerForm.controls['lastName'].value).toBe('');
    expect(component.registerForm.controls['username'].value).toBe('');
    expect(component.registerForm.controls['email'].value).toBe('');
    expect(component.registerForm.controls['password'].value).toBe('');
    expect(component.registerForm.controls['termsAccepted'].value).toBeFalse();
  });

  it('should call registerUser and navigate on success', () => {
    const mockResponse: MessageRepsonse = { message: 'User registered successfully' };
    authService.registerUser.and.returnValue(of(mockResponse));
  
    component.registerForm.setValue({
      name: 'John',
      lastName: 'Doe',
      username: 'john.doe',
      email: 'john.doe@example.com',
      password: 'password123',
      termsAccepted: true
    });
  
    console.log('Form valid:', component.registerForm.valid); 
  
    component.onRegister();
  
    expect(authService.registerUser).toHaveBeenCalledWith({
      username: 'john.doe',
      name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123'
    });

    expect(messageService.add).toHaveBeenCalledWith({ severity: 'success', summary: 'Successful', detail: mockResponse.message, life: 3000 });
  });

  it('should show error message on registerUser failure', () => {
    const errorResponse = { error: { message: 'Registration failed' } };
    authService.registerUser.and.returnValue(throwError(errorResponse));

    component.registerForm.setValue({
      name: 'John',
      lastName: 'Doe',
      username: 'john.doe',
      email: 'john.doe@example.com',
      password: 'password123',
      termsAccepted: true
    });

    component.onRegister();

    expect(authService.registerUser).toHaveBeenCalled();
    expect(messageService.add).toHaveBeenCalledWith({ severity: 'error', summary: 'Something wrong', detail: errorResponse.error.message, life: 3000 });
  });

  it('should show info message if form is invalid', () => {
    component.onRegister();

    expect(messageService.add).toHaveBeenCalledWith({ severity: 'info', summary: 'Form error', detail: 'Form data is not valid or some input missing', life: 3000 });
  });
});
