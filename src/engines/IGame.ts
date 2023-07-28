import { KeyState } from "./KeyState";
import { Renderer } from "./Renderer";

export interface IGame {
  update(keyState: KeyState): void;
  draw(renderer: Renderer): void;
}
