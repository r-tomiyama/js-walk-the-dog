export interface Rect {
    x: number;
    y: number;
    w: number;
    h: number;
  }
  
export interface Cell {
    frame: Rect;
  }
  
export interface Sheet {
    frames: { [key: string]: Cell };
  }