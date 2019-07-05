
export class Wallet {
    constructor(
        public id: number,
        public Name: string,
        public address: string,
        public privateKey: string,
        public description: string,
        public imageUrl: string,
        public balance: number
         ) {}
}
