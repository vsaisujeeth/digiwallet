import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'wallet',
    pathMatch: 'full'
  },
  { path: 'wallet', loadChildren: './wallet/wallet.module#WalletPageModule', canLoad: [AuthGuard]},
  { path: 'transactions', loadChildren: './transactions/transactions.module#TransactionsPageModule' },
  { path: 'auth', loadChildren: './auth/auth.module#AuthPageModule' },
  { path: 'signup', loadChildren: './auth/signup/signup.module#SignupPageModule' },
  { path: 'rearrange', loadChildren: './auth/rearrange/rearrange.module#RearrangePageModule' },
  { path: 'set-password', loadChildren: './auth/set-password/set-password.module#SetPasswordPageModule' },
  { path: 'forgot-password', loadChildren: './auth/forgot-password/forgot-password.module#ForgotPasswordPageModule' },
  { path: 'info/:Id', loadChildren: './wallet/wallet-details/info/info.module#InfoPageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
