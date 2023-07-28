import { Sheet } from "./types";
import { fetchJson, loadImage } from "./utils";

export async function setupCanvas(canvas: HTMLCanvasElement) {
    const context = canvas.getContext("2d");

    const sheet = await fetchJson<Sheet>("./assets/rhb.json");
    const image = await loadImage("./assets/rhb.png");

    let frame = -1;
    const intervalCallback = () => {
      frame = (frame + 1) % 8;
      const frameName = `Run (${frame + 1}).png`;
      const sprite = sheet.frames[frameName];
      if (!sprite) {
        throw new Error("Cell not found");
      }

      context!.clearRect(0, 0, 600, 600);
      context!.drawImage(
        image,
        sprite.frame.x,
        sprite.frame.y,
        sprite.frame.w,
        sprite.frame.h,
        300,
        300,
        sprite.frame.w,
        sprite.frame.h
      );
    };

    window.setInterval(intervalCallback, 50);

}
