import { NgModule } from '@angular/core';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { FooterComponent } from '../components/footer/footer.component';
import { NavBarComponent } from '../components/nav-bar/nav-bar.component';
import { MenubarModule } from 'primeng/menubar';
import { CommonModule } from '@angular/common';
import { SessionExpiredComponent } from '../components/session-expired/session-expired.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from '../page/profile/profile.component';
import { HomeComponent } from '../page/home/home.component';
import { ProductsComponent } from '../page/products/products.component';
import { ProductTableComponent } from '../components/product-table/product-table.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { MenuModule } from 'primeng/menu';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductTableComponent,
    HomeComponent,
    LayoutComponent,
    NavBarComponent,
    FooterComponent,
    SessionExpiredComponent,
    ProfileComponent
  ],
  imports: [
    CardModule,
    InputTextareaModule,
    MenuModule,
    CommonModule,
    LayoutRoutingModule,
    MenubarModule,
    DialogModule,
    ButtonModule,
    PanelModule,
    ReactiveFormsModule,
    FormsModule,
    ConfirmDialogModule,
    InputTextModule,
    TableModule,
  ],
})
export class LayoutModule { }
