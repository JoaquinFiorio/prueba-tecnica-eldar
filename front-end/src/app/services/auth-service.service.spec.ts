import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthServiceService } from './auth-service.service';
import { LoginForm } from '../interfaces/LoginForm';
import { RegisterUser } from '../interfaces/RegisterUser';
import { MessageRepsonse } from '../interfaces/MessageResponse';
import { LoginResponse } from '../interfaces/LoginResponse';
import { UserInfo, UserResponse } from '../interfaces/UserInfo';

describe('AuthServiceService', () => {
  let service: AuthServiceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthServiceService]
    });
    service = TestBed.inject(AuthServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya peticiones HTTP pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register a user', () => {
    const mockRegisterUser: RegisterUser = {
      username: 'test', password: 'password',
      name: '',
      last_name: '',
      email: ''
    };
    const mockResponse: MessageRepsonse = { message: 'User registered successfully' };

    service.registerUser(mockRegisterUser).subscribe(response => {
      expect(response.message).toBe('User registered successfully');
    });

    const req = httpMock.expectOne(`${service.url}/register`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should login a user', () => {
    const mockLoginForm: LoginForm = { email: 'joaquin.fiorio@hotmail.com', password: 'password' };
    const mockResponse: LoginResponse = {
      token: 'fakeToken',
      message: ''
    };

    service.loginUser(mockLoginForm).subscribe(response => {
      expect(response.token).toBe('fakeToken');
    });

    const req = httpMock.expectOne(`${service.url}/login`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should get user info', () => {

    const mockUserInfo: UserInfo = {
      id: '1',
      username: 'test',
      name: 'Test Name',
      last_name: 'Test Last Name',
      rol: 'user',
      createdAt: new Date()
    };
  
    const mockUserResponse: UserResponse = { findUser: mockUserInfo };
  
    service.getUser().subscribe(response => {
      expect(response.findUser.username).toBe('test');
    });
  
    const req = httpMock.expectOne(`${service.url}/get-user`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUserResponse);
  });

  it('should update user info', () => {
    const mockUserInfo: UserInfo = {
      id: '1', username: 'updatedTest',
      name: '',
      last_name: '',
      rol: '',
      createdAt: new Date()
    };
    const mockResponse: MessageRepsonse = { message: 'User updated successfully' };

    service.updateUser(mockUserInfo).subscribe(response => {
      expect(response.message).toBe('User updated successfully');
    });

    const req = httpMock.expectOne(`${service.url}/update-user`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockResponse);
  });
});
