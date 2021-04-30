import { Cell } from "./cell";
import { SpaceShip } from "./space-ship";

export abstract class Rules {

    // https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
    // Every cell interacts with its eight neighbours, which are the cells that are horizontally, vertically, or diagonally adjacent. At each step in time, the following transitions occur:

    // Any live cell with fewer than two live neighbours dies, as if by underpopulation.
    // Any live cell with two or three live neighbours lives on to the next generation.
    // Any live cell with more than three live neighbours dies, as if by overpopulation.
    // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

    static underpopulationDies(cells: Array<Cell>, spaceShip: SpaceShip) {
        let liveCells = cells.filter(cell => cell.alive);
        liveCells.forEach(cell => {
            let cellNeighbours = spaceShip.getBufferedCells(cell);
            let cellsAlive = cellNeighbours.filter(cellNeighbour => cellNeighbour.alive);
            if (cellsAlive.length < 2) {
                cell.sentencedToDie = true;
            }
        });
    }

    static nextGeneration(cells: Array<Cell>, spaceShip: SpaceShip) {
        let liveCells = cells.filter(cell => cell.alive);
        liveCells.forEach(cell => {
            let cellNeighbours = spaceShip.getBufferedCells(cell);
            let cellsAlive = cellNeighbours.filter(cellNeighbour => cellNeighbour.alive);
            if (cellsAlive.length == 2 || cellsAlive.length == 3) {
                cell.nextGeneration = true;
            }
        });
    }

    static overpopulation(cells: Array<Cell>, spaceShip: SpaceShip) {
        let liveCells = cells.filter(cell => cell.alive);
        liveCells.forEach(cell => {
            let cellNeighbours = spaceShip.getBufferedCells(cell);
            let cellsAlive = cellNeighbours.filter(cellNeighbour => cellNeighbour.alive);
            if (cellsAlive.length > 3) {
                cell.sentencedToDie = true;
            }
        });
    }

    static reproduction(cells: Array<Cell>, spaceShip: SpaceShip) {
        let deadCells = cells.filter(cell => !cell.alive);
        deadCells.forEach(cell => {
            let cellNeighbours = spaceShip.getBufferedCells(cell);
            let cellsAlive = cellNeighbours.filter(cellNeighbour => cellNeighbour.alive);
            if (cellsAlive.length === 3) {
                cell.reproduce = true;
            }
        });
    }
}
