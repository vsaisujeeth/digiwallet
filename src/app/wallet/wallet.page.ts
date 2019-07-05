import { Component, OnInit } from '@angular/core';
import { Wallet } from '../models/wallet.model';
import { IonItemSliding } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {

  wallets: Wallet[];
  constructor(
    private auth: AuthService,
    private route: Router
    ) { }

  ngOnInit() {
    this.wallets = this.auth.presentUser.wallets;
  }

  ionViewWillEnter() {
    this.wallets = this.auth.presentUser.wallets;
   }

  onSlide(id, sliding: IonItemSliding) {
    const index = this.auth.presentUser.wallets.findIndex(data => data.id === id);
    this.auth.presentUser.wallets.splice(index, 1);
    this.auth.updateUser();
    sliding.close();
  }

  onClick() {
  }
}
