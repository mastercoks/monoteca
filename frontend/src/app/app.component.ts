import { User } from './models/user';
import { Component } from '@angular/core';

import { AuthenticationService } from './services/authentication.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // template: `
  // <div class="col-md-8 offset-md-2">
  //   <router-outlet></router-outlet>
  // </div>`,
  styleUrls: ['./app.component.css'],
  providers: [AuthenticationService]
})
export class AppComponent {
  title = 'app';
  constructor (
    private service: AuthenticationService){}  
  verify() {
    if (this.service.checkCredentials2())
      return true;
    return false;

  }
}
