import { Cell } from "./cell";
import { Extent } from "./extent";
import { Rules } from "./rules";
import { SpaceShip } from "./space-ship";

export class Glider extends SpaceShip {

    constructor(ctx: CanvasRenderingContext2D | null | undefined, x: number, y: number) {
        super(ctx, x, y);
        this.init();
    }

    init() {
        for (let y=0; y<5; y++) {
            for (let x=0; x<5; x++) {
                this.bufferedCells.push( new Cell(this.ctx).init(this.x - 10 + (x * 10), this.y + 10 - (y * 10)) );
            }
        }
        
        // Draw intial Glider
        this.bufferedCells.find(cell => cell.x === this.x && cell.y === this.y)?.initLiveCell(this.x, this.y);
        this.bufferedCells.find(cell => cell.x === this.x + 10 && cell.y === this.y)?.initLiveCell(this.x + 10, this.y);
        this.bufferedCells.find(cell => cell.x === this.x + 20 && cell.y === this.y)?.initLiveCell(this.x + 20, this.y);
        this.bufferedCells.find(cell => cell.x === this.x + 20 && cell.y === this.y - 10)?.initLiveCell(this.x + 20, this.y - 10);
        this.bufferedCells.find(cell => cell.x === this.x + 10 && cell.y === this.y - 20)?.initLiveCell(this.x + 10, this.y - 20);

        this.bufferedExtent = new Extent(this.x - 10, this.y - 30, this.x + 40, this.y + 20);
    }

    applyRules() {
        Rules.underpopulationDies(this.bufferedCells, this);
        Rules.nextGeneration(this.bufferedCells, this);
        Rules.overpopulation(this.bufferedCells, this);
        Rules.reproduction(this.bufferedCells, this);

        this.nextBufferedCells = this.bufferedCells.filter(cell => cell.alive || cell.reproduce || cell.nextGeneration);

        this.redraw();
    }
}
