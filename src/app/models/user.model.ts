import { Transaction } from './transaction.model';
import { Wallet } from './wallet.model';

export class User {
    constructor(
        public id: number,
        public mnemonic: string,
        public password: string,
        public wallets: Wallet[],
        public Transactions: Transaction[],
        ) {}
}
