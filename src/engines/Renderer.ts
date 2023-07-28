import { Rect } from "../types";

export class Renderer {
    private context: CanvasRenderingContext2D;
    constructor(context: CanvasRenderingContext2D) {
      this.context = context;
    }
  
    clear(rect: Rect): void {
      this.context.clearRect(rect.x, rect.y, rect.w, rect.h);
    }
  
    drawImage(image: HTMLImageElement, frame: Rect, destination: Rect): void {
      this.context.drawImage(
        image,
        frame.x,
        frame.y,
        frame.w,
        frame.h,
        destination.x,
        destination.y,
        destination.w,
        destination.h
      );
    }
  }
  