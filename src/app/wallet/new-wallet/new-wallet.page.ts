import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Wallet } from 'src/app/models/wallet.model';
import { ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-new-wallet',
  templateUrl: './new-wallet.page.html',
  styleUrls: ['./new-wallet.page.scss'],
})
export class NewWalletPage implements OnInit {

  tokenAdd;
  tokenName;
  tokenDes;
  constructor(public auth: AuthService,
              public toastController: ToastController,
              private navCtrl: NavController) { }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Token Addded',
      duration: 1000
    });
    toast.present();
  }

  ngOnInit() {
  }
  onClick() {
    const length = this.auth.presentUser.wallets.length;
    const id = this.auth.presentUser.wallets[length - 1].id + 1;
    this.auth.presentUser.wallets.push(
      new Wallet(id,
        this.tokenName,
        this.tokenAdd,
        this.auth.presentUser.wallets[0].privateKey,
        this.tokenDes,
        'https://www.tokenfactory.com/Tokens.png',
        0)
      );
    this.presentToast();
    this.auth.updateUser();
    
    this.navCtrl.pop();
  }
}
