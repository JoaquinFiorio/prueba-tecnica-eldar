import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ProfileComponent } from './profile.component';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { UserResponse } from 'src/app/interfaces/UserInfo';
import { MessageRepsonse } from 'src/app/interfaces/MessageResponse';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PanelModule } from 'primeng/panel';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let authService: jasmine.SpyObj<AuthServiceService>;
  let messageService: jasmine.SpyObj<MessageService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthServiceService', ['getUser', 'updateUser']);
    messageService = jasmine.createSpyObj('MessageService', ['add']);
    router = jasmine.createSpyObj('Router', ['navigate']);
  
    authService.getUser.and.returnValue(of({
      findUser: {
        id: '1',
        username: 'john.doe',
        name: 'John',
        last_name: 'Doe',
        rol: 'USER',
        createdAt: new Date()
      }
    }));
  
    TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [
        ReactiveFormsModule,
        PanelModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: AuthServiceService, useValue: authService },
        { provide: MessageService, useValue: messageService },
        { provide: Router, useValue: router }
      ]
    });
    
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize user and form on init', () => {
    const mockUserResponse: UserResponse = {
      findUser: {
        id: '1',
        username: 'john.doe',
        name: 'John',
        last_name: 'Doe',
        rol: 'USER',
        createdAt: new Date('2024-10-13T09:10:39Z')
      }
    };
  
    authService.getUser.and.returnValue(of(mockUserResponse));
  
    component.ngOnInit();
  
    expect(authService.getUser).toHaveBeenCalled();
    expect(component.user).toEqual(mockUserResponse.findUser);
  
    expect(component.user.createdAt.toISOString()).toEqual(mockUserResponse.findUser.createdAt.toISOString());
  });

  it('should handle error in getUserData', () => {
    const mockError = { error: { message: 'User not found' } };
    authService.getUser.and.returnValue(throwError(mockError));

    component.getUserData();

    expect(messageService.add).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Something wrong',
      detail: 'User not found',
      life: 3000
    });
  });

  it('should update user on valid form submission', () => {
    const mockResponse: MessageRepsonse = { message: 'Profile updated successfully' };
    authService.updateUser.and.returnValue(of(mockResponse));

    component.userForm.setValue({
      username: 'john.doe',
      name: 'John',
      last_name: 'Doe',
      createdAt: new Date()
    });

    component.updateUser();

    expect(authService.updateUser).toHaveBeenCalledWith(component.userForm.value);
    expect(messageService.add).toHaveBeenCalledWith({
      severity: 'success',
      summary: 'Success', // Cambié 'Something wrong' a 'Success'
      detail: mockResponse.message,
      life: 3000
    });
  });

  it('should handle error in updateUser', () => {
    const mockError = { error: { message: 'Update failed' } };
    authService.updateUser.and.returnValue(throwError(mockError));

    component.userForm.setValue({
      username: 'john.doe',
      name: 'John',
      last_name: 'Doe',
      createdAt: new Date()
    });

    component.updateUser();

    expect(messageService.add).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Something wrong',
      detail: 'Update failed',
      life: 3000
    });
  });

  it('should show form error message if form is invalid', () => {

    component.userForm.setValue({
      username: '',
      name: '',
      last_name: '',
      createdAt: null
    });
  
    authService.updateUser.and.returnValue(of({ message: 'Dummy response' }));
  
    component.updateUser();
  
    expect(messageService.add).toHaveBeenCalledWith({
      severity: 'info',
      summary: 'Form error',
      detail: 'Form data is not valid or some input missing',
      life: 3000
    });
  });

  it('should logout and navigate to login', () => {
    component.logout();

    expect(localStorage.getItem('token')).toBeNull();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
