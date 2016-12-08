import { Component }        from '@angular/core';
import { Router,
         NavigationExtras } from '@angular/router';
import { AuthService }      from '../auth.service';

@Component({
  templateUrl: './forgotpassword.component.html'
})

export class ForgotPasswordComponent {
  message: string;

  constructor(public authService: AuthService, public router: Router) {
    //this.setMessage();
  }
  
}
