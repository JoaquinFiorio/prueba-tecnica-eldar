import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoginForm } from 'src/app/interfaces/LoginForm';
import { LoginResponse } from 'src/app/interfaces/LoginResponse';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthServiceService,
    private router: Router,
    private messageService: MessageService 
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const loginData: LoginForm = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };

      this.authService.loginUser(loginData).subscribe({
        next: (response: LoginResponse) => {
          this.messageService.add({ severity: 'success', summary: 'Login Successful', detail: response.message, life: 3000 });
          this.router.navigate(['/eldar/home']);
          localStorage.setItem('token', response.token);
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Login Failed', detail: err?.error?.message || 'Invalid credentials', life: 3000 });
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

}
