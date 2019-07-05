import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Wallet } from 'src/app/models/wallet.model';
import { EthereumService } from 'src/app/services/ethereum.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {
  wallet: Wallet;
  id: number;
  balance;
  constructor(public router: Router,
              public act: ActivatedRoute,
              public auth: AuthService,
              public eth: EthereumService ) {
    this.id = act.snapshot.params.Id;
   }

   async getBalance()
   {
     this.balance = await this.eth.balance(this.wallet.address);
     console.log(this.balance);
     document.getElementById('bal').innerHTML = (this.balance / 1000000000000000000).toString() + ' eth' ;
     this.auth.presentUser.wallets[0].balance = this.balance  / 1000000000000000000 ;
     this.auth.updateUser();
   }

   async getBalanceOf()
   {
     this.balance = await this.eth.balanceOf(this.auth.presentUser.wallets[0].address, this.wallet.address);
     console.log(this.balance);
     document.getElementById('bal').innerHTML = (this.balance/1e18).toString() + ' Tokens' ;
     this.auth.presentUser.wallets.find(data => data.id == this.id).balance = this.balance/1e18;
     this.auth.updateUser();
   }

  ngOnInit() {
    this.wallet = this.auth.presentUser.wallets.find(data => data.id == this.id);

    if (this.id == 0){
      this.getBalance();
    } else {
      this.getBalanceOf();
    }

  }

}
