import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{
  items: MenuItem[] | undefined;

  constructor(private router: Router) {}

  ngOnInit() {
        this.items = [
            {
                label: 'Home',
                icon: 'pi pi-home',
                command: () => {
                    this.router.navigate(['/eldar/home']);
                }
            },
            {
                label: 'Products',
                icon: 'pi pi-list',
                command: () => {
                    this.router.navigate(['/eldar/products']);
                }
            },
            {
                label: 'Profile',
                icon: 'pi pi-user',
                command: () => {
                    this.router.navigate(['/eldar/profile']);
                }
            },
        ];
    }
}
