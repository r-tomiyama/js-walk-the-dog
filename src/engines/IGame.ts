import { Renderer } from "./Renderer";

export interface IGame {
    update(): void;
    draw(renderer: Renderer): void;
  }