import { Component, OnInit } from '@angular/core';
import { EthereumService } from 'src/app/services/ethereum.service';
import { AuthService } from 'src/app/services/auth.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { WalletService } from 'src/app/services/wallet.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.page.html',
  styleUrls: ['./reset.page.scss'],
})
export class ResetPage implements OnInit {

  setpass: string;
  repass: string;
  isMatch = true;
  constructor( private router: Router,
               private eth: EthereumService,
               private auth: AuthService,
               private trans: TransactionService,
               private wal: WalletService,
               private storage: Storage) { }

  ngOnInit() {
  }

  onClick()
  {
    if ( this.setpass === this.repass)
    {
      this.auth.presentUser.password = this.setpass;
      this.trans.update();
      this.wal.update();
      this.storage.set('presentUser', this.auth.presentUser);
      this.isMatch = true;
      this.router.navigateByUrl('/auth');
    } else
    {
        this.isMatch = false;
    }
  }
}
