import { JwtInterceptor } from './helpers/jwt.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { AdminPanelLayoutComponent } from './layouts/adminPanel/AdminPanelLayout.component';
import { FrontendPanelLayoutComponent } from './layouts/frontendPanel/FrontendPanel.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';

import { HeaderComponent } from './core/Header/Header.component';
import { FooterComponent } from './core/Footer/Footer.component';
import { MenuComponent } from './core/Menu/Menu.component';

import { AdminHeaderComponent } from './core/AdminHeader/AdminHeader.component';
import { AdminSidebarComponent } from './core/AdminSidebar/AdminSidebar.component';

import { MenuItems } from './core/Menu/menu-items';
import { AdminMenuItems } from './core/AdminHeader/admin-menu-items';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JwtModule } from '@auth0/angular-jwt';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
   // Change this to your upload POST address:
    url: 'https://httpbin.org/post',
    maxFilesize: 50,
    acceptedFiles: 'image/*'
  };

@NgModule({
  declarations: [
      AppComponent,
      AdminPanelLayoutComponent,
      FrontendPanelLayoutComponent,
      AuthLayoutComponent,

      HeaderComponent,
      FooterComponent,
      MenuComponent,

      AdminHeaderComponent,
      AdminSidebarComponent
  ],
  imports: [
      BrowserModule,
      BrowserAnimationsModule,
      DropzoneModule,
      RouterModule.forRoot(AppRoutes, {scrollPositionRestoration: 'enabled'}),
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      FullCalendarModule,
      NgbModule,
      JwtModule.forRoot({config: { tokenGetter: () => localStorage.getItem('access_token')}})
  ],
  providers: [
    { provide: 
      HTTP_INTERCEPTORS, 
      useClass: 
      JwtInterceptor, 
      multi: true },
      MenuItems, 
      AdminMenuItems,
      {
        provide: DROPZONE_CONFIG,
        useValue: DEFAULT_DROPZONE_CONFIG
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
