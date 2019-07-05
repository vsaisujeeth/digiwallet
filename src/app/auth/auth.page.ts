import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { EthereumService } from '../services/ethereum.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {


  passEntered;
  isMatch = true;
  constructor(private auth: AuthService, private route: Router,private eth: EthereumService) { }

  ngOnInit() {
  }

   onLogin() {
     if (this.passEntered === this.auth.presentUser.password) {
        this.isMatch = true;
        this.auth.userIsAuthenticated = true;
        this.route.navigateByUrl('/wallet');
     } else {
        this.isMatch = false;
     }
  }

   ionViewWillEnter() {
    this.eth.newaccount();
   }

  onSignUp() {
    this.route.navigateByUrl('/signup');
  }

}
