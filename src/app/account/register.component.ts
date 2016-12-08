import { Component }        from '@angular/core';
import { Router,
         NavigationExtras } from '@angular/router';
import { AuthService }      from '../auth.service';

@Component({
  templateUrl: './register.component.html'
})

export class RegisterComponent {
  message: string;

  constructor(public authService: AuthService, public router: Router) {
    //this.setMessage();
  }
  
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/