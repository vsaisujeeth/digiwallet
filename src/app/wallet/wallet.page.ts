import { Component, OnInit } from '@angular/core';
import { Wallet } from '../models/wallet.model';
import { IonItemSliding } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { EthereumService } from '../services/ethereum.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {

  balance;
  wallet: Wallet;

  wallets: Wallet[];
  constructor(
    public eth: EthereumService,
    private auth: AuthService,
    private route: Router
    ) { }

    async getBalance()
    {
      this.balance = await this.eth.balance(this.auth.presentUser.wallets[0].address);
      console.log(this.balance);
      this.auth.presentUser.wallets[0].balance = this.balance  / 1000000000000000000 ;
      this.auth.updateUser();
    }
 
    async getBalanceOf(id)
    {
      this.wallet = this.auth.presentUser.wallets.find(data => data.id == id);
      this.balance = await this.eth.balanceOf(this.auth.presentUser.wallets[0].address, this.wallet.address);
      console.log(this.balance);
      this.auth.presentUser.wallets.find(data => data.id == id).balance = this.balance/1e18;
      this.auth.updateUser();
    }
  ngOnInit() {
    this.wallets = this.auth.presentUser.wallets;

  }

  ionViewWillEnter() {
    this.wallets = this.auth.presentUser.wallets;
    this.getBalance();

    let i = 1;
    for( i = 1; i < this.wallets.length; i++)
    {
      this.getBalanceOf(i);
    }

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
