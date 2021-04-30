import { Cell } from "./cell";
import { Extent } from "./extent";

export abstract class SpaceShip {

    ctx: CanvasRenderingContext2D | null | undefined;
    x: number;
    y: number;

    bufferedCells: Array<Cell> = new Array();
    bufferedExtent: Extent = new Extent(0, 0, 0, 0);
    nextBufferedCells: Array<Cell> = new Array();

    constructor(ctx: CanvasRenderingContext2D | null | undefined, x: number, y: number) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.bufferedExtent = new Extent(x, y, x, y);
    }

    getBufferedCells(cell: Cell): Array<Cell> {
        let cellNeighbours = this.bufferedCells.filter(innerCell => 
            cell.bufferExtent.contains(innerCell.extent)
        );
        cellNeighbours = cellNeighbours.filter(innerCell => innerCell.x !== cell.x || innerCell.y !== cell.y);

        return cellNeighbours;
    }

    protected updateBufferedExtent() {
        let liveCells = this.bufferedCells.filter(cell => cell.alive == true);
        let minx = -1, maxx = -1, miny = -1, maxy = -1;
        liveCells.forEach(cell => {
            let topLeft = cell.extent.getTopLeft();
            let bottomRight = cell.extent.getBottomRight();
            minx = (minx == -1 || minx > topLeft[0]) ? minx = topLeft[0] : minx;
            maxx = (maxx == -1 || maxx < bottomRight[0]) ? maxx = bottomRight[0] : maxx;
            miny = (miny == -1 || miny > bottomRight[1]) ? miny = bottomRight[1] : miny;
            maxy = (maxy == -1 || maxy < topLeft[1]) ? maxy = topLeft[1] : maxy;
        });

        this.ctx?.clearRect(this.bufferedExtent.minx, this.bufferedExtent.maxy, 
            this.bufferedExtent.maxx - this.bufferedExtent.minx, this.bufferedExtent.maxy - this.bufferedExtent.miny);

        this.bufferedExtent = new Extent(minx - 10, miny, maxx + 10, maxy + 20);
    }

    protected updateBufferedCells() {
        this.bufferedCells = new Array();
        for (let y=0; y<5; y++) {
            for (let x=0; x<5; x++) {
                this.bufferedCells.push( new Cell(this.ctx).init(this.bufferedExtent.minx + (x * 10), this.bufferedExtent.maxy - 10 - (y * 10)) );
            }
        }

        this.nextBufferedCells.forEach(cell => {
            let index = this.bufferedCells.findIndex(bufferedCell => bufferedCell.extent.contains(cell.extent));
            if (index !== -1) {
                this.bufferedCells[index] = cell;
            }
        });
    }

    protected redraw() {
        this.bufferedCells.forEach(cell => {
            if (cell.reproduce || cell.nextGeneration) {
                cell.alive = true;
            } else { // cell.sentencedToDie
                cell.alive = false;
            }
            cell.reproduce = false;
            cell.sentencedToDie = false;
            cell.nextGeneration = false;

            cell.redraw();
        });

        this.updateBufferedExtent();
        this.updateBufferedCells();

        // redraw game-board boundary
        let width = (this.ctx) ? this.ctx.canvas.width : 0;
        let height = (this.ctx) ? this.ctx.canvas.height : 0;
        this.ctx?.strokeRect(0, 0, width, height);
    }
}
