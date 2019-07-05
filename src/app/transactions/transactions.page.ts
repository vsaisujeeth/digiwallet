import { Component, OnInit } from '@angular/core';
import { Transaction } from '../models/transaction.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
})
export class TransactionsPage implements OnInit {

  transactions: Transaction[];
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.transactions = this.auth.presentUser.Transactions;
  }
  ionViewWillEnter() {
    this.transactions = this.auth.presentUser.Transactions;
   }

}
