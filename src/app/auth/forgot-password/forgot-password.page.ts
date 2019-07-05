import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  enteredCode;
  hi;
  constructor(private auth: AuthService, private router: Router) { }

  onClick() {
    if (this.auth.presentUser.mnemonic === this.enteredCode)
    {
      this.router.navigateByUrl('/forgot-password/reset');
    } else {
      this.hi = -1;
      console.log('forgot');
    }
    // this.hi = this.auth.users.findIndex(obj => obj.mnemonic === this.enteredCode);
    // if (this.hi !== -1) {
    //   this.auth.presentUser = this.auth.users[this.hi];
    //   this.router.navigateByUrl('/forgot-password/reset');
    // }
  }
  ngOnInit() {
  }

}
