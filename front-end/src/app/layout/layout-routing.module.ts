import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from '../page/products/products.component';
import { ProfileComponent } from '../page/profile/profile.component';
import { AuthGuardGuard } from '../guards/auth-guard.guard';
import { HomeComponent } from '../page/home/home.component';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: "home", component: HomeComponent, canActivate: [AuthGuardGuard] },
      { path: "products", component: ProductsComponent, canActivate: [AuthGuardGuard] },
      { path: "profile", component: ProfileComponent, canActivate: [AuthGuardGuard] },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
