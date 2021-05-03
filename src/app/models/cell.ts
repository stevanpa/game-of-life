export class Cell {

    x: number;
    y: number;

    alive: boolean = false;
    sentencedToDie: boolean = false;
    reproduce: boolean = false;
    nextGeneration: boolean = false;
    
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

}