import { Component, OnInit } from '@angular/core';
import { EthereumService } from 'src/app/services/ethereum.service';

@Component({
  selector: 'app-rearrange',
  templateUrl: './rearrange.page.html',
  styleUrls: ['./rearrange.page.scss'],
})
export class RearrangePage implements OnInit {

  words;
  arrWords = new Array();
  constructor( private eth: EthereumService) {
   }

    shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
  ngOnInit() {
    this.words = this.eth.mnemonicWords;
    this.words = this.shuffle(this.words);
  }

  onClick(word)
  {
    this.arrWords.push(word);
    document.getElementById('par').innerHTML = this.arrWords.join(' ') ;
    if (this.eth.mnemonic === this.arrWords.join(' ')) {
      document.getElementById('but').setAttribute('disabled', 'false');
      document.getElementById('div').style.backgroundColor = '#88e998';
     }
  }

  onRefesh()
  {
    this.arrWords = new Array();
    document.getElementById('par').innerHTML = this.arrWords.join(' ') ;
    if (this.eth.mnemonic === this.arrWords.join(' ')) {
      document.getElementById('but').setAttribute('disabled', 'false');
      document.getElementById('div').style.backgroundColor = '#88e998';
     } else{
      document.getElementById('but').setAttribute('disabled', 'true');
      document.getElementById('div').style.backgroundColor = 'rgb(236, 196, 159)';
    }
  }

  onBack(){
    this.arrWords.pop();
    document.getElementById('par').innerHTML = this.arrWords.join(' ') ;
    if (this.eth.mnemonic === this.arrWords.join(' ')) {
      document.getElementById('but').setAttribute('disabled', 'false');
      document.getElementById('div').style.backgroundColor = '#88e998';
     } else{
      document.getElementById('but').setAttribute('disabled', 'true');
      document.getElementById('div').style.backgroundColor = 'rgb(236, 196, 159)';
    }
  }

}
