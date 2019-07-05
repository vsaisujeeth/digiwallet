import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  public  transactions: Transaction[];
 update(){
  this.transactions = this.auth.presentUser.Transactions;
 }
  constructor(public auth: AuthService) {
  }

}
