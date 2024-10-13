import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { SessionGuardGuard } from './guards/session-guard.guard';
import { RegisterComponent } from './page/register/register.component';
import { Error404Component } from './page/error404/error404.component';
import { Error401Component } from './page/error401/error401.component';

const routes: Routes = [
  { path: 'eldar', loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule) },
  { path: "login", component: LoginComponent, canActivate: [SessionGuardGuard] },
  { path: "register", component: RegisterComponent, canActivate: [SessionGuardGuard] },
  { path: "404", component: Error404Component },
  { path: "401", component: Error401Component },
  { path: "", pathMatch: 'full', redirectTo: "login" },
  { path: "**", redirectTo: "404" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
