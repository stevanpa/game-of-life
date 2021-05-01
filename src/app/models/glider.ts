import { Cell } from "./cell";
import { Rules } from "./rules";
import { SpaceShip } from "./space-ship";

export class Glider extends SpaceShip {

    constructor(ctx: CanvasRenderingContext2D | null | undefined, boardWidth: number, boardHeight: number) {
        let x = boardWidth / 2;
        let y = boardHeight / 2;
        super(ctx, x, y, x + 30, y + 30, boardWidth, boardHeight);
        this.init();
    }

    init() {
        for (let y=0; y<5; y++) {
            for (let x=0; x<5; x++) {
                this.cells.push( new Cell(this.ctx).init(this.minx - 10 + (x * 10), this.miny - (y * 10)) );
            }
        }
        
        // Draw intial Glider
        this.cells.find(cell => cell.x === this.minx && cell.y === this.miny - 10)?.initLiveCell(this.minx, this.miny - 10);
        this.cells.find(cell => cell.x === this.minx + 10 && cell.y === this.miny - 10)?.initLiveCell(this.minx + 10, this.miny - 10);
        this.cells.find(cell => cell.x === this.minx + 20 && cell.y === this.miny - 10)?.initLiveCell(this.minx + 20, this.miny - 10);
        this.cells.find(cell => cell.x === this.minx + 20 && cell.y === this.miny - 20)?.initLiveCell(this.minx + 20, this.miny - 20);
        this.cells.find(cell => cell.x === this.minx + 10 && cell.y === this.miny - 30)?.initLiveCell(this.minx + 10, this.miny - 30);

        // this.bufferedExtent = new Extent(this.minx - 10, this.maxy - 30, this.minx + 40, this.maxy + 20);
    }

    applyRules() {
        Rules.underpopulationDies(this.cells, this);
        Rules.nextGeneration(this.cells, this);
        Rules.overpopulation(this.cells, this);
        Rules.reproduction(this.cells, this);

        this.nextCells = this.cells.filter(cell => cell.alive || cell.reproduce || cell.nextGeneration);

        this.redraw();
    }
}
