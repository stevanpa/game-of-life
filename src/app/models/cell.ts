import { Extent } from "./extent";

export class Cell {

    ctx: CanvasRenderingContext2D | null | undefined;
    x: number = 0;
    y: number = 0;
    extent: Extent = new Extent(0, 0, 0, 0);
    bufferExtent: Extent = new Extent(0, 0, 0, 0);

    alive: boolean = false;
    sentencedToDie: boolean = false;
    reproduce: boolean = false;
    nextGeneration: boolean = false;

    constructor(ctx: CanvasRenderingContext2D | null | undefined) {
        this.ctx = ctx;
    }

    init(x: number, y: number): Cell {
        this.x = x;
        this.y = y;
        this.extent = new Extent(x, y, x + 10, y + 10);
        this.bufferExtent = new Extent(x - 10, y - 10, x + 20, y + 20);

        return this;
    }

    initLiveCell(x: number, y: number): Cell {
        this.init(x, y);
        this.alive = true;
        this.ctx?.fillRect(x, y, 10, 10);

        return this;
    }

    redraw(): void {
        let width = (this.ctx) ? this.ctx.canvas.width : 0;
        let height = (this.ctx) ? this.ctx.canvas.height : 0;
        if (this.alive) {
            if (this.x >= width && this.y >= height) {
                this.ctx?.fillRect(this.x - width, this.y - height, 10, 10);
                // this.extent = new Extent(this.x - width, this.y - height, this.x - width + 10, this.y - height + 10);
                // this.bufferExtent = new Extent(this.x - width - 10, this.y - height - 10, this.x - width + 20, this.y - height + 20);
                // console.log(this.extent, this.bufferExtent);
            } else if (this.x >= width) {
                this.ctx?.fillRect(this.x - width, this.y, 10, 10);
                // this.extent = new Extent(this.x - width, this.y, this.x - width + 10, this.y + 10);
                // this.bufferExtent = new Extent(this.x - width - 10, this.y - 10, this.x - width + 20, this.y + 20);
                // console.log(this.extent, this.bufferExtent);
            } else if (this.y >= height) {
                this.ctx?.fillRect(this.x, this.y - height, 10, 10);
                // this.extent = new Extent(this.x, this.y - height, this.x + 10, this.y - height + 10);
                // this.bufferExtent = new Extent(this.x - 10, this.y - height - 10, this.x + 20, this.y - height + 20);
                // console.log(this.extent, this.bufferExtent);
            } else {
                this.ctx?.fillRect(this.x, this.y, 10, 10);
            }
        } else {
            if (this.x >= width && this.y >= height) {
                this.ctx?.clearRect(this.x - width, this.y - height, 10, 10);
                // this.extent = new Extent(this.x - width, this.y - height, this.x - width + 10, this.y - height + 10);
                // this.bufferExtent = new Extent(this.x - width - 10, this.y - height - 10, this.x - width + 20, this.y - height + 20);
                // console.log(this.extent, this.bufferExtent);
            } else if (this.x >= width) {
                this.ctx?.clearRect(this.x - width, this.y, 10, 10);
                // this.extent = new Extent(this.x - width, this.y, this.x - width + 10, this.y + 10);
                // this.bufferExtent = new Extent(this.x - width - 10, this.y - 10, this.x - width + 20, this.y + 20);
                // console.log(this.extent, this.bufferExtent);
            } else if (this.y >= height) {
                this.ctx?.clearRect(this.x, this.y - height, 10, 10);
                // this.extent = new Extent(this.x, this.y - height, this.x + 10, this.y - height + 10);
                // this.bufferExtent = new Extent(this.x - 10, this.y - height - 10, this.x + 20, this.y - height + 20);
                // console.log(this.extent, this.bufferExtent);
            } else {
                this.ctx?.clearRect(this.x, this.y, 10, 10);
            }
        }
    }
}
