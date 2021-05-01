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
        this.setExtent();
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
                this.x = this.x - width;
                this.y = this.y - height;
            } else if (this.x >= width) {
                this.x = this.x - width;
            } else if (this.y >= height) {
                this.y = this.y - height;
            }
            this.ctx?.fillRect(this.x, this.y, 10, 10);
        } else {
            this.ctx?.clearRect(this.x, this.y, 10, 10);
        }
    }

    setExtent() {
        this.extent = new Extent(this.x, this.y, this.x + 10, this.y + 10);
        this.bufferExtent = new Extent(this.x - 10, this.y - 10, this.x + 20, this.y + 20);
        // this.ctx?.strokeRect(this.extent.minx, this.extent.miny, this.extent.maxx - this.extent.minx, this.extent.maxy - this.extent.miny);
        // console.log(this.extent, this.bufferExtent);
        // { minx: 0, miny: 440, maxx: 10, maxy: 450, extent: (
    }
}
