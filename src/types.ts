import { Rect } from "./engines/types";

export type Cell = {
    frame: Rect;
  }
  
export type Sheet = {
    frames: { [key: string]: Cell };
  }

export type Point = {
  x: number;
  y: number;
}