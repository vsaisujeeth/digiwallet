import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { EthereumService } from 'src/app/services/ethereum.service';
import { AuthService } from '../../services/auth.service';
import { Wallet } from 'src/app/models/wallet.model';
import { TransactionService } from 'src/app/services/transaction.service';
import { WalletService } from 'src/app/services/wallet.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.page.html',
  styleUrls: ['./set-password.page.scss'],
})
export class SetPasswordPage implements OnInit {

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

  onClick() {
    if ( this.setpass === this.repass) {
      const user = new User(
        this.auth.users.length,
        this.eth.mnemonic,
        this.setpass,
        [new Wallet(0,
          'ethereum',
          this.eth.address, this.eth.privateKey,
           'your most used wallet', 'https://s.yimg.com/ny/api/res/1.2/79GZvpsBiB0w.4UMxQEijw--~A/YXBwaWQ9aGlnaGxhbmRlcjtzbT0xO3c9ODAw/http://media.zenfs.com/en-US/homerun/coin_rivet_596/45607ac1ecdfb82f720db97b79887702',
            0)
        ],
        []
        );
      this.auth.users.push(user);
      this.auth.presentUser = user;
      this.storage.set('presentUser', user).then(data => console.log(data));
      this.trans.update();
      this.wal.update();
      this.isMatch = true;
      this.router.navigateByUrl('/auth');
    } else {
        this.isMatch = false;
    }
  }
}
