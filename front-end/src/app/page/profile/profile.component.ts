import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserResponse, UserInfo } from 'src/app/interfaces/UserInfo';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { MessageRepsonse } from 'src/app/interfaces/MessageResponse';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user: UserInfo;
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthServiceService,
    private messageService: MessageService
  ) {
    this.user = {
      id: '',
      username: '',
      name: '',
      last_name: '',
      rol: 'USER',
      createdAt: new Date()
    };

    this.userForm = this.fb.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      createdAt: [{ value: '', disabled: true }]
    });
  }

  ngOnInit() {
    this.getUserData();
  }

  getUserData() {
    this.authService.getUser().subscribe({
      next: (res: UserResponse) => {
        if (res && res.findUser) {
          this.user = res.findUser;

          this.userForm.patchValue({
            username: this.user.username,
            name: this.user.name,
            last_name: this.user.last_name,
            createdAt: this.user.createdAt
          });
        } else {
          this.messageService.add({ severity: 'error', summary: 'No User Found', detail: 'User data is not available.', life: 3000 });
        }
      },
      error: (err) => {
        const errorMessage = err?.error?.message || 'Error fetching user data';
        this.messageService.add({ severity: 'error', summary: 'Something wrong', detail: errorMessage, life: 3000 });
      }
    });
  }

  updateUser() {
    if (this.userForm.valid) {
      this.authService.updateUser(this.userForm.value).subscribe({
        next: (res: MessageRepsonse) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message, life: 3000 });
        },
        error: (err) => {
          const errorMessage = err?.error?.message || 'Update failed';
          this.messageService.add({ severity: 'error', summary: 'Something wrong', detail: errorMessage, life: 3000 });
        }
      });
    } else {
      this.messageService.add({ severity: 'info', summary: 'Form error', detail: 'Form data is not valid or some input missing', life: 3000 });
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
