import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WalletPage } from './wallet.page';


const routes: Routes = [
  {
    path: '',
    component: WalletPage
  },
  { path: 'new-wallet',
   loadChildren: './new-wallet/new-wallet.module#NewWalletPageModule'
  },
  {
     path: 'wallet-details/:Id',
     loadChildren: './wallet-details/wallet-details.module#WalletDetailsPageModule'
   },


];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WalletPage]
})
export class WalletPageModule {}
