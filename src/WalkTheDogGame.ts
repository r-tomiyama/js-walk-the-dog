import { IGame } from "./engines/IGame";
import { KeyState } from "./engines/KeyState";
import { Renderer } from "./engines/Renderer";
import { Point, Sheet } from "./types";
import { fetchJson, loadImage } from "./utils";

export class WalkTheDogGame implements IGame {
  private image: HTMLImageElement;
  private sheet: Sheet;
  private frame: number;
  private position: Point;

  constructor(image: HTMLImageElement, sheet: Sheet) {
    this.image = image;
    this.sheet = sheet;
    this.frame = 0;
    this.position = { x: 0, y: 0 };
  }

  public static async new(): Promise<WalkTheDogGame> {
    const image = await loadImage("./assets/rhb.png");
    const sheet = await fetchJson<Sheet>("./assets/rhb.json");

    return new WalkTheDogGame(image, sheet);
  }

  public update(keyState: KeyState): void {
    const velocity: Point = { x: 0, y: 0 };
    if (keyState.isPressed("ArrowDown")) {
      velocity.y += 3;
    }

    if (keyState.isPressed("ArrowUp")) {
      velocity.y -= 3;
    }

    if (keyState.isPressed("ArrowRight")) {
      velocity.x += 3;
    }

    if (keyState.isPressed("ArrowLeft")) {
      velocity.x -= 3;
    }

    this.position.x += velocity.x;
    this.position.y += velocity.y;

    if (this.frame < 23) {
      this.frame += 1;
    } else {
      this.frame = 0;
    }
  }

  public draw(renderer: Renderer): void {
    renderer.clear({ x: 0, y: 0, w: 600, h: 600 });

    const currentSprite = Math.floor(this.frame / 3) + 1;
    const frameName = `Run (${currentSprite}).png`;
    const sprite = this.sheet?.frames[frameName];

    if (sprite && this.image) {
      renderer.drawImage(
        this.image,
        {
          x: sprite.frame.x,
          y: sprite.frame.y,
          w: sprite.frame.w,
          h: sprite.frame.h,
        },
        {
          x: this.position.x,
          y: this.position.y,
          w: sprite.frame.w,
          h: sprite.frame.h,
        },
      );
    }
  }
}
