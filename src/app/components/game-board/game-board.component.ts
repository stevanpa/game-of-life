import { Component, AfterViewInit , ElementRef, ViewChild } from '@angular/core';
import { Extent } from 'src/app/models/extent';
import { Glider } from 'src/app/models/glider';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements AfterViewInit  {

  @ViewChild('board', { static: false }) board: ElementRef<HTMLCanvasElement> | undefined;

  canvas: HTMLCanvasElement | undefined;
  width = 480;
  height = 480;
  ctx: CanvasRenderingContext2D | null | undefined;
  extent: Extent;

  frameCount = 0;
  fps = 10;
  fpsInterval = 0;
  startTime = Date.now();
  now = Date.now();
  then = Date.now();
  elapsed = 0;

  glider: Glider | undefined;

  drawPending = false;

  constructor() {
    this.extent = new Extent(0, 0, this.width, this.height);
    
  }

  ngAfterViewInit(): void {
    this.canvas = this.board?.nativeElement;
    if (this.canvas !== undefined) {
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      this.ctx = this.canvas?.getContext('2d');
      this.ctx?.strokeRect(0, 0, this.width, this.height);
      
      this.glider = new Glider(this.ctx, this.width / 2, this.height / 2);
    }
    
    this.fpsInterval = 1000 / this.fps;
    this.then = Date.now();
    this.startTime = this.then;
    // this.draw();
  }

  draw() {
    this.drawPending = false;

    if (!this.drawPending) {
        this.drawPending = true;
        requestAnimationFrame(() => this.draw());

        let now = Date.now();
        let elapsed = now - this.then;

        if (elapsed > this.fpsInterval) {
          this.then = now - (elapsed % this.fpsInterval);
          this.glider?.applyRules();
        }
    }
  }

  
}
