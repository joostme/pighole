export interface Field {
    amount: number;
    max: number;
}

export class Field implements Field {
    constructor(max: number) {
        this.amount = 0;
        this.max = max;
    }
}