import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MessageRepsonse } from 'src/app/interfaces/MessageResponse';
import { RegisterUser } from 'src/app/interfaces/RegisterUser';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthServiceService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      termsAccepted: [false, Validators.requiredTrue]
    });
  }

  ngOnInit(): void {}

  onRegister(): void {
    if (this.registerForm.valid) {

      const registerForm: RegisterUser = {
        username: this.registerForm.value.username,
        name: this.registerForm.value.name,
        last_name: this.registerForm.value.lastName,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password
      }

      this.authService.registerUser(registerForm).subscribe({
        next: (response: MessageRepsonse) => {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: response.message, life: 3000 });
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Something wrong', detail: err?.error?.message, life: 3000 });
        }
      });
    } else {
      this.messageService.add({ severity: 'info', summary: 'Form error', detail: 'Form data is not valid or some input missing', life: 3000 });
    }
  }
}
