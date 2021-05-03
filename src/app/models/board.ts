import { Cell } from "./cell";
import { Rules } from "./rules";

export class Board {

    x: number;
    y: number;
    grid: Array<Array<Cell>>;
    ctx: CanvasRenderingContext2D | null | undefined;

    tileSize = 10;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.grid = this.createGrid();
        this.createShape();
    }

    createGrid(): Array<Array<Cell>> {
        let grid = new Array<Array<Cell>>();

        for (let x=0; x<this.x; x++) {
            grid[x] = new Array<Cell>(this.x);
            for (let y=0; y<this.y; y++) {
                grid[x][y] = new Cell(x,y);
            }
        }

        return grid;
    }

    createShape() {
        let glider = [[12,12], [13,12], [14,12], [14,11], [13,10]];
        glider.forEach(coord => {
            this.grid[coord[0]][coord[1]].alive = true;
        });
    }

    draw() {
        let width = this.tileSize * this.x;
        let height = this.tileSize * this.y;
        this.ctx?.strokeRect(0, 0, width, height);
        this.drawGrid()
    }

    drawGrid() {
        let grid = this.calculateNextGrid()
        grid.forEach(col => {
            col.forEach(cell => {
                if (cell.alive) {
                    let dX = this.tileSize * cell.x;
                    let dY = this.tileSize * cell.y;
                    this.ctx?.fillRect(dX, dY, 10, 10);
                }
            });
        });
    }

    calculateNextGrid(): Array<Array<Cell>> {
        let currentGrid = this.grid;
        let nextGrid = this.createGrid();
        let cellsToInspect= new Array<Cell>();

        // Get the whole grid
        currentGrid.forEach(col => col.forEach(cell => cellsToInspect.push(cell)))

        // Apply rules
        cellsToInspect.forEach(cell => {
            let neighbours = this.getNeighbours(cell, currentGrid);
            Rules.underpopulationDies(cell, neighbours);
            Rules.nextGeneration(cell, neighbours);
            Rules.overpopulation(cell, neighbours);
            Rules.reproduction(cell, neighbours);
        });

        // Normalize Cell attributes
        cellsToInspect.forEach(cell => {
            if (cell.reproduce || cell.nextGeneration) {
                cell.alive = true;
            } else { // cell.sentencedToDie
                cell.alive = false;
            }
            cell.reproduce = false;
            cell.sentencedToDie = false;
            cell.nextGeneration = false;
        });

        // Populate the nextGrid with live cells
        let cellsAlive = cellsToInspect.filter(cell => cell.alive);
        for (let x=0; x<nextGrid.length; x++) {
            for (let y=0; y<nextGrid[x].length; y++) {
                cellsAlive.forEach(liveCell => {
                    if (liveCell.x === x && liveCell.y === y) {
                        nextGrid[x][y] = liveCell;
                    }
                });
            }
        }

        return nextGrid;
    }

    // returns 8 cells
    getNeighbours(cell: Cell, grid: Array<Array<Cell>>): Array<Cell> {
        let neighbours = new Array<Cell>();

        let minx = (cell.x-1 < 0) ? this.x-1 : cell.x-1;
        let miny = (cell.y-1 < 0) ? this.y-1 : cell.y-1;
        let maxx = (cell.x+1 > this.x-1) ? 0 : cell.x+1;
        let maxy = (cell.y+1 > this.y-1) ? 0 : cell.y+1;

        for (let x=minx; x!==(maxx+1) % this.x; x = (x+1) % this.x) {
            for (let y=miny; y!==(maxy+1) % this.y; y = (y+1) %this.y) {
                if (x !== cell.x || y !== cell.y && grid[x][y] !== undefined) {
                    neighbours.push(grid[x][y]);
                }
            }
        }

        return neighbours;
    }

    setCanvas(ctx: CanvasRenderingContext2D | null | undefined) {
        this.ctx = ctx;
    }
}