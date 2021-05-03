import { Cell } from "./cell";

export abstract class Rules {

    // https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
    // Every cell interacts with its eight neighbours, which are the cells that are horizontally, vertically, or diagonally adjacent. At each step in time, the following transitions occur:

    // Any live cell with fewer than two live neighbours dies, as if by underpopulation.
    // Any live cell with two or three live neighbours lives on to the next generation.
    // Any live cell with more than three live neighbours dies, as if by overpopulation.
    // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

    static underpopulationDies(cell: Cell, neighbours: Array<Cell>) {
        let cellsAlive = neighbours.filter(neighbour => neighbour.alive);
        if (cellsAlive.length < 2) {
            if (cell.alive) {
                cell.sentencedToDie = true;
            }
        }
    }

    static nextGeneration(cell: Cell, neighbours: Array<Cell>) {
        let cellsAlive = neighbours.filter(neighbour => neighbour.alive);
        if (cellsAlive.length == 2 || cellsAlive.length == 3) {
            if (cell.alive) {
                cell.nextGeneration = true;
            }
        }
    }

    static overpopulation(cell: Cell, neighbours: Array<Cell>) {
        let cellsAlive = neighbours.filter(neighbour => neighbour.alive);
        if (cellsAlive.length > 3) {
            if (cell.alive) {
                cell.sentencedToDie = true;
            }
        }
    }

    static reproduction(cell: Cell, neighbours: Array<Cell>) {
        let cellsAlive = neighbours.filter(neighbour => neighbour.alive);
        if (cellsAlive.length === 3) {
            if (!cell.alive) {
                cell.reproduce = true;
            }
        }
    }
}