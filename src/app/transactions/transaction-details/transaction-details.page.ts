import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Transaction } from 'src/app/models/transaction.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.page.html',
  styleUrls: ['./transaction-details.page.scss'],
})
export class TransactionDetailsPage implements OnInit {

  id;
  color;
  transactions: Transaction[];
  constructor(
    public act: ActivatedRoute,
    public auth: AuthService,
    public http: HttpClient
    ) {
    this.id = act.snapshot.params.Id;
    this.transactions = this.auth.presentUser.Transactions;
   }

   ionViewWillEnter() {
    this.transactions = this.auth.presentUser.Transactions;
    this.getStatus();
   }
   ionViewWillLeave() {
    this.auth.updateUser();
   }

   getStatus() {
    if (this.transactions[this.id].status == 'Success' || this.transactions[this.id].status == 'Fail') {
      document.getElementById('stat').innerHTML = this.transactions[this.id].status;
      return;
    }
    this.http.get(
      'https://api-ropsten.etherscan.io/api?module=transaction&action=gettxreceiptstatus&txhash='
       + this.transactions[this.id].hash +
      // + '0x0c94fafb6e98d74a445fb35fb52e7393102d47bfe2f1ab96196bd8afb3f66e8c' +
      '&apikey=2QVHR492AKS9PD313RFHADJ497CVT8NQMQ' ).subscribe((res) => {
        if(res['result']['status'] === '1') {
          this.transactions[this.id].status = 'Success';
          console.log('success');
        } else if(res['result']['status'] === '0') {
          this.transactions[this.id].status = 'Fail';
          console.log('Fail');
        }else if(res['result']['status'] === '') {
          this.transactions[this.id].status = 'Pending';
          console.log('pending');
        } else {
          this.transactions[this.id].status = res['result']['status'];
          console.log('Fail');
        }
        document.getElementById('stat').innerHTML = this.transactions[this.id].status;
      });
   }

   onClick(x)
   {
    window.open(x, '_blank');
   }

  ngOnInit() {
  }

}
