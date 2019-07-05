
export class Transaction {
    constructor(
        public id: number,
        public name: string,
        public from: string,
        public to: string,
        public imageUrl: string,
        public amount: number,
        public hash: string,
        public status: string,
         ) {}
}
