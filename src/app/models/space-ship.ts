import { Cell } from "./cell";
import { Extent } from "./extent";

export abstract class SpaceShip {

    ctx: CanvasRenderingContext2D | null | undefined;
    minx: number;
    maxy: number;
    maxx: number;
    miny: number;
    boardWidth: number;
    boardHeight: number;

    cells: Array<Cell> = new Array();
    extent: Extent;
    nextCells: Array<Cell> = new Array();

    constructor(ctx: CanvasRenderingContext2D | null | undefined, 
        minx: number, maxy: number, maxx: number, miny: number,
        boardWidth: number, boardHeight: number) {

        this.ctx = ctx;
        this.minx = minx;
        this.maxy = maxy;
        this.maxx = maxx;
        this.miny = miny;
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        this.extent = new Extent(minx, miny, maxx, maxy);
    }

    getBufferedCells(cell: Cell): Array<Cell> {
        let cellNeighbours = this.cells.filter(innerCell => cell.bufferExtent.contains(innerCell.extent))
                                       .filter(innerCell => innerCell.x !== cell.x || innerCell.y !== cell.y);

        return cellNeighbours;
    }

    protected redraw() {

        this.ctx?.clearRect(0, 0, this.boardWidth, this.boardHeight);

        this.cells.forEach(cell => {
            if (cell.reproduce || cell.nextGeneration) {
                cell.alive = true;
            } else { // cell.sentencedToDie
                cell.alive = false;
            }
            cell.reproduce = false;
            cell.sentencedToDie = false;
            cell.nextGeneration = false;

            cell.redraw();
            // cell.setExtent();
        });

        this.setExtent();
        this.updateCells();
    }

    protected setExtent() {
        let liveCells = this.cells.filter(cell => cell.alive == true);
        let minx = -1, maxx = -1, miny = -1, maxy = -1;
        liveCells.forEach(cell => {
            let cellMinx = cell.extent.getTopLeft()[0];
            let cellMiny = cell.extent.getTopLeft()[1];
            let cellMaxx = cell.extent.getBottomRight()[0];
            let cellMaxy = cell.extent.getBottomRight()[1];

            minx = (minx == -1 || minx >= cellMinx) ? cellMinx : minx;
            maxx = (maxx == -1 || maxx <= cellMaxx) ? cellMaxx : maxx;
            miny = (miny == -1 || miny >= cellMaxy) ? cellMaxy : miny;
            maxy = (maxy == -1 || maxy <= cellMiny) ? cellMiny : maxy;
        });

        this.extent = new Extent(minx - 10, miny - 10, maxx + 10, maxy + 10);
    }

    protected updateCells() {
        this.cells = new Array();
        for (let y=0; y<5; y++) {
            for (let x=0; x<5; x++) {
                this.cells.push( new Cell(this.ctx).init(this.extent.minx + (x * 10), this.extent.maxy - 10 - (y * 10)) );
            }
        }

        this.nextCells.forEach(nextCell => {
            let index = this.cells.findIndex(cell => cell.extent.contains(nextCell.extent));
            if (index !== -1) {
                this.cells[index] = nextCell;
            }
        });
    }
}
