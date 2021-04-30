export class Extent {

    minx: number;
    miny: number;
    maxx: number;
    maxy: number;
    extent: [number, number, number, number];

    constructor(minx: number, miny: number, maxx: number, maxy: number) {

        this.minx = minx;
        this.miny = miny;
        this.maxx = maxx;
        this.maxy = maxy;
        this.extent = [minx, miny, maxx, maxy];
    }

    getTopLeft() {
        return [this.minx, this.maxy];
    }

    getBottomRight() {
        return [this.maxx, this.miny];
    }

    contains(extent: Extent): boolean {

        const result = 
               this.minx <= extent.minx
            && extent.maxx <= this.maxx
            && this.miny <= extent.miny
            && extent.maxy <= this.maxy;

        return result;
    }
}
