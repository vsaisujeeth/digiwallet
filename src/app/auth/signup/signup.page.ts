import { Component, OnInit, OnChanges } from '@angular/core';
import { EthereumService } from 'src/app/services/ethereum.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit{

  code: string;
  constructor( private eth: EthereumService) {
   }
   ionViewWillEnter() {
    this.code = this.eth.mnemonic;
    // console.log('from ' + this.code);
    // document.getElementById('par').innerHTML = this.code;
   }

  ngOnInit() {
  }

}
