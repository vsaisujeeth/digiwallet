import { Component, OnInit } from '@angular/core';
import { EthereumService } from 'src/app/services/ethereum.service';
import { AuthService } from 'src/app/services/auth.service';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { ToastController, Platform } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-wallet-details',
  templateUrl: './wallet-details.page.html',
  styleUrls: ['./wallet-details.page.scss'],
})
export class WalletDetailsPage implements OnInit {
  id: number;
  toAddress;
  amount;
  fromAddress;
  wallet;
  constructor(private eth: EthereumService,
              private auth: AuthService,
              public route: Router,
              public act: ActivatedRoute,
              private qrScanner: QRScanner,
              public platform: Platform,
              public toastController: ToastController,
              private androidPermissions: AndroidPermissions) 
              {
                this.id = act.snapshot.params.Id;

                this.platform.backButton.subscribeWithPriority(0,()=>
                {
                  document.getElementById('cam').style.opacity = '1';
                  this.qrScanner.destroy();
                })
              }


  async presentToast() {
          const toast = await this.toastController.create({
            message: 'Text Detected',
            duration: 2000
          });
          toast.present();
        }

  ngOnInit() {
    this.fromAddress = this.auth.presentUser.wallets[0].address;
    this.wallet = this.auth.presentUser.wallets.find(data => data.id == this.id);
  }
  onScan() {
    this.qrScanner.prepare()
   .then((status: QRScannerStatus) => {
     if (status.authorized) {
       // camera permission was granted

       this.qrScanner.show();

       document.getElementById('cam').style.opacity = '0';
       // start scanning
       const scanSub = this.qrScanner.scan().subscribe((text: string) => {
         this.toAddress = text;
         document.getElementById('cam').style.opacity = '1';
         this.presentToast();
         this.qrScanner.hide(); // hide camera preview
         scanSub.unsubscribe(); // stop scanning
       });

     } else if (status.denied) {
       // camera permission was permanently denied
       // you must use QRScanner.openSettings() method to guide the user to the settings page
       // then they can grant the permission from there

       this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
        result => console.log('Has permission?', result.hasPermission),
        err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
      );
     } else {
       // permission was denied, but not permanently. You can ask for permission again at a later time.
     }
  })
  .catch((e: any) => console.log('Error is', e));
  }
  onSend() {
    document.getElementById('result').innerHTML = '' ;
    console.log('send');
    if (this.id == 0) {
      console.log('hello');
      this.eth.send(this.amount, this.toAddress);
    } else {
      this.eth.sendToken(
        this.amount,
        this.toAddress,
        this.wallet.address,
        this.wallet.name
        );
    }
    }
  onInfo()
  {
    console.log('hello');
    this.route.navigateByUrl('/info/' + this.id);
  }

}
