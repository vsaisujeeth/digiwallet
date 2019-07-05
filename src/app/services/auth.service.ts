import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Wallet } from '../models/wallet.model';
import { Transaction } from '../models/transaction.model';
import { Storage } from '@ionic/storage';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public users = [
    new User(
      0,
      'hello world world',
      'password',
      [
      new Wallet(
        0,
        'Ethereum',
        '0x501938d5c17442C9a54B522021702101d9415D14',
        'FB7DC2E493FD50D5B8ED13FDB4902954CC1CCD3D890669F81AE088CDB2043ACD',
        'your most used cryptocurrency',
 // tslint:disable-next-line: max-line-length
        'https://s.yimg.com/ny/api/res/1.2/79GZvpsBiB0w.4UMxQEijw--~A/YXBwaWQ9aGlnaGxhbmRlcjtzbT0xO3c9ODAw/http://media.zenfs.com/en-US/homerun/coin_rivet_596/45607ac1ecdfb82f720db97b79887702',
        979
      ),
      new Wallet(
        1,
        'Bit Coin', '', '',
        'The most popular cryptocurreny',
        'https://www.theblockcrypto.com/wp-content/uploads/2019/05/bitcoin-buy-1-1200x675.jpg',
        1500
      ),
      new Wallet(
        2,
        'lite coin', '', '',
        'Cool place near charminar',
 // tslint:disable-next-line: max-line-length
        'https://static.coindesk.com/wp-content/uploads/2014/02/Litecoin-logo-e1517247177826.png',
        150
      )],
      [
        new Transaction(
          0,
          'ethereum',
          '234543',
          '23454342',
// tslint:disable-next-line: max-line-length
          'https://lh4.googleusercontent.com/njmacjXG5DhDcvSpCy6xd584sMRXIwoFxXliEZitBH4OqvK4IT_Zfi6DOuUQcsZNBeURhMtJoBhpLiiTqq6HL3yWmV9Kbpeq0LNbtxLANgAoYfk8rzJMsBYrzSKfTxyQp5Fw499f',
          78,
          '',
          'completed',
        ),
        new Transaction(
          1,
          'litecoin',
          '234543',
          '23454342',
// tslint:disable-next-line: max-line-length
          'https://lh4.googleusercontent.com/njmacjXG5DhDcvSpCy6xd584sMRXIwoFxXliEZitBH4OqvK4IT_Zfi6DOuUQcsZNBeURhMtJoBhpLiiTqq6HL3yWmV9Kbpeq0LNbtxLANgAoYfk8rzJMsBYrzSKfTxyQp5Fw499f',
          56,
          '',
          'completed',
        ),
        new Transaction(
          2,
          'blockchain',
          '234543',
          '23454342',
// tslint:disable-next-line: max-line-length
          'https://lh4.googleusercontent.com/njmacjXG5DhDcvSpCy6xd584sMRXIwoFxXliEZitBH4OqvK4IT_Zfi6DOuUQcsZNBeURhMtJoBhpLiiTqq6HL3yWmV9Kbpeq0LNbtxLANgAoYfk8rzJMsBYrzSKfTxyQp5Fw499f',
          78,
          '',
          'completed',
        ),
        new Transaction(
          3,
          'ethereum',
          '234543',
          '23454342',
// tslint:disable-next-line: max-line-length
          'https://lh4.googleusercontent.com/njmacjXG5DhDcvSpCy6xd584sMRXIwoFxXliEZitBH4OqvK4IT_Zfi6DOuUQcsZNBeURhMtJoBhpLiiTqq6HL3yWmV9Kbpeq0LNbtxLANgAoYfk8rzJMsBYrzSKfTxyQp5Fw499f',
          88,
          '',
          'completed',
        ),
      ])
  ];


  presentUser;
 // presentUser = this.users[0];

  userIsAuthenticated = true;
  constructor(private storage: Storage, ) {
     // storage.set('presentUser', this.presentUser);

     storage.get('presentUser').then(val => {
      this.presentUser = val;
      console.log(val);
    });
 }

  logout() {
    this.userIsAuthenticated = false;
  }

  login() {
    this.userIsAuthenticated = true;
  }

  updateUser() {
    this.storage.set('presentUser', this.presentUser);
    console.log('updated');
    console.log(this.presentUser);
  }
}
