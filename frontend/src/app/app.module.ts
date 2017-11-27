import { UserHomeComponent } from './userHome/userHome.component';
import { MonographService } from './services/monograph.service';
import { SideMenuComponent } from './sideMenu/side-menu.component';
import { MonographComponent } from './monograph/monograph.component';
import { AuthenticationService } from './services/authentication.service';
import { HomeComponent } from './home/home.component';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { RegisterService } from './services/register.service';
import { SearchComponent } from './search/search.component';
import { ModalComponent } from './modal/modal.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'monograph', component: MonographComponent},
  {path: 'search', component: SearchComponent},
  {path: 'user', component: UserComponent, children: [
    { 
      path: '',
      component: UserHomeComponent
    },
    { 
      path: 'monograph',
      component: MonographComponent
    },
    { 
      path: 'search',
      component: SearchComponent
    },
    {
      path: '',
      outlet: 'sidemenu',
      component: SideMenuComponent
    }
  ]},
]
@NgModule({
  declarations: [
    AppComponent, LoginComponent, HomeComponent, RegisterComponent, MonographComponent, UserComponent, SideMenuComponent, SearchComponent, UserHomeComponent, ModalComponent
  ],
  imports: [
    BrowserModule, FormsModule, RouterModule.forRoot(routes), ReactiveFormsModule, BrowserAnimationsModule, HttpModule, BootstrapModalModule
  ],
  providers: [AuthenticationService, RegisterService, MonographService],
  entryComponents: [
    ModalComponent
  ],
  bootstrap: [AppComponent],
  exports: [ RouterModule ]
})
export class AppModule { }
