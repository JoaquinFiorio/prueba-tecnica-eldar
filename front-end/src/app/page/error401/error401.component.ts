import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error401',
  templateUrl: './error401.component.html',
  styleUrls: ['./error401.component.css']
})
export class Error401Component {
  constructor(private router: Router) { }

  goToLogin() {
    localStorage.removeItem('token')
    this.router.navigate(['/login']);
  }
}
