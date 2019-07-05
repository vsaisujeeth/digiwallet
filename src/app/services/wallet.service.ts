import { Injectable } from '@angular/core';
import { Wallet } from '../models/wallet.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  private _wallets: Wallet[] = this.auth.presentUser.wallets;

  update(){
    this._wallets = this.auth.presentUser.wallets;
  }
 get wallets() {
  return [...this._wallets];
}
  constructor(private auth: AuthService ) { }
}
