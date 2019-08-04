import { Component, OnInit } from '@angular/core';
import { Transaction } from '../models/transaction.model';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
})
export class TransactionsPage implements OnInit {

  transactions: Transaction[];
  constructor(private auth: AuthService,  public http: HttpClient) { }

  ngOnInit() {
    this.transactions = this.auth.presentUser.Transactions;
  }
  ionViewWillEnter() {
    this.transactions = this.auth.presentUser.Transactions;
    for ( let trans of this.transactions)
    {
      this.updateStatus(trans.id);
    }
   }


   updateStatus(id)
   {
      if (this.transactions[id].status == 'Success' || this.transactions[id].status == 'Fail') {
        return;
      }
      this.http.get(
        'https://api-ropsten.etherscan.io/api?module=transaction&action=gettxreceiptstatus&txhash='
         + this.transactions[id].hash +
        // + '0x0c94fafb6e98d74a445fb35fb52e7393102d47bfe2f1ab96196bd8afb3f66e8c' +
        '&apikey=2QVHR492AKS9PD313RFHADJ497CVT8NQMQ' ).subscribe((res) => {
          if(res['result']['status'] === '1') {
            this.transactions[id].status = 'Success';
            console.log('success');
          } else if(res['result']['status'] === '0') {
            this.transactions[id].status = 'Fail';
            console.log('Fail');
          }else if(res['result']['status'] === '') {
            this.transactions[id].status = 'Pending';
            console.log('pending');
          } else {
            this.transactions[id].status = res['result']['status'];
            console.log('Fail');
          }
        });
     }
}
