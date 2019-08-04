import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { TransactionService } from './transaction.service';
import { Transaction } from '../models/transaction.model';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class EthereumService {

  mnemonic = 'helo helo helo helo helo helo helo helo helo helo ';
  address = '0x501938d5c17442c9a54b522021702101d9415d14';
  privateKey = 'FB7DC2E493FD50D5B8ED13FDB4902954CC1CCD3D890669F81AE088CDB2043ACD';
  mnemonicWords: string[];

  constructor(
    private toastController: ToastController,
    private http: HttpClient,
    private auth: AuthService,
    private trans: TransactionService
    ) {
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Transaction broadcasted!',
      duration: 3000
    });
    toast.present();
  }


  send(Amount, toAddress) {
    this.http.post('http://localhost:4000/send',
    {
     fromAccount : this.auth.presentUser.wallets[0].address ,
     fromPrivateKey: this.auth.presentUser.wallets[0].privateKey,
      toAccount : toAddress,
      amount: Amount
    }, {responseType: 'text'})
    .subscribe(
    data  => {
    console.log('POST Request is successful ', data);
    if (data == '') {
      document.getElementById('result').innerHTML = 'Error: Please check funds or try again later' ;
    } else {
      document.getElementById('result').innerHTML = 'Hash: ' + data  ;
      this.presentToast();
      this.auth.presentUser.Transactions.push(new Transaction(
        this.auth.presentUser.Transactions.length,
        'Eth',
        this.auth.presentUser.wallets[0].address,
        toAddress,
        'https://lh4.googleusercontent.com/njmacjXG5DhDcvSpCy6xd584sMRXIwoFxXliEZitBH4OqvK4IT_Zfi6DOuUQcsZNBeURhMtJoBhpLiiTqq6HL3yWmV9Kbpeq0LNbtxLANgAoYfk8rzJMsBYrzSKfTxyQp5Fw499f',
        Amount,
        data,
        ''
      ));
      this.auth.updateUser();
      console.log('after trans');
    }
    this.trans.update();
    },
    (error)  => {
    console.log('Error', error);
    document.getElementById('result').innerHTML = 'Error: ' + error['error']  ;
    return 'Transaction Failed! please try again';

    }
    );
  }

  sendToken(amount, toAddress,tokenAddress, name) {
    this.http.post('http://localhost:4000/sendTokens',
    {
     fromAccount : this.auth.presentUser.wallets[0].address ,
     tokenAddress: tokenAddress,
     fromPrivateKey: this.auth.presentUser.wallets[0].privateKey,
     toAccount : toAddress,
     amount: amount
    }, {responseType: 'text'})
    .subscribe(
    data  => {
    console.log('POST Request is successful ', data);
    if (data == '') {
      document.getElementById('result').innerHTML = 'Error: Please check funds or try again later' ;
    } else {
      document.getElementById('result').innerHTML = 'Hash: ' + data  ;
      this.auth.presentUser.Transactions.push(new Transaction(
        this.auth.presentUser.Transactions.length,
        name,
        this.auth.presentUser.wallets[0].address,
        toAddress,
        'https://www.tokenfactory.com/Tokens.png',
        amount,
        data,
        ''
      ));
      this.auth.updateUser();
      console.log('after trans');
    }
    this.trans.update();
    },
    (error)  => {
    console.log('Error', error);
    document.getElementById('result').innerHTML = 'Error: ' + error  ;
    return 'Transaction Failed! please try again';

    }
    );
  }



   balance(account) {
     let that = this;
     return new Promise(function(resolve, reject) {
      that.http.post('http://localhost:4000/balance', {account: account}, {responseType: 'text'}).subscribe(data => {
        resolve(data);
      });
     });
  }

  balanceOf(fromAddress, tokenAddress) {
    let that = this;
    return new Promise(function(resolve, reject) {
     that.http.post('http://localhost:4000/balanceOf', {fromAddress: fromAddress, tokenAddress:tokenAddress}, {responseType: 'text'}).subscribe(data => {
       resolve(data);
     });
    });
 }

  newaccount() {
    this.http.post('http://localhost:4000/new', {}, {}).subscribe((res: Response) => {
      this.address = res['address'];
      this.mnemonic = res['mnemonic'];
      this.privateKey = res['privateKey'];
      this.mnemonicWords = this.mnemonic.split(' ');

      console.log(this.mnemonicWords);
    });
  }

}
