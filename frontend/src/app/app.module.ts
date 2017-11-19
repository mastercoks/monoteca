import { MonographComponent } from './monograph/monograph.component';
import { AuthenticationService } from './authentication.service';
import { HomeComponent } from './home/home.component';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'monograph', component: MonographComponent},
]
@NgModule({
  declarations: [
    AppComponent, LoginComponent, HomeComponent, RegisterComponent, MonographComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(routes), ReactiveFormsModule, BrowserAnimationsModule, HttpModule
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent],
  exports: [ RouterModule ]
})
export class AppModule { }
