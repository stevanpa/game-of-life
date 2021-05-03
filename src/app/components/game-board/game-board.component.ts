import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Board } from 'src/app/models/board';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements AfterViewInit {

  @ViewChild('canvasBoard', { static: false }) canvasBoard: ElementRef<HTMLCanvasElement> | undefined;

  canvas: HTMLCanvasElement | undefined;
  width = 250;
  height = 250;
  ctx: CanvasRenderingContext2D | null | undefined;

  frameCount = 0;
  fps = 5;
  fpsInterval = 0;
  startTime = Date.now();
  now = Date.now();
  then = Date.now();
  elapsed = 0;;

  drawPending = false;

  board: Board;

  constructor() {
    let x = this.width / 10;
    let y = this.height / 10;
    this.board = new Board(x, y);
  }

  ngAfterViewInit(): void {
    this.canvas = this.canvasBoard?.nativeElement;
    if (this.canvas !== undefined) {
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      this.ctx = this.canvas?.getContext('2d');
      this.board.setCanvas(this.ctx);
    }
    
    this.fpsInterval = 1000 / this.fps;
    this.then = Date.now();
    this.startTime = this.then;

    this.draw();
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
          this.board.draw();
        }
    }
  }

}
