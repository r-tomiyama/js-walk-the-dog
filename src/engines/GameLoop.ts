import { context } from "../utils";
import { IGame } from "./IGame";
import { Renderer } from "./Renderer";

export class GameLoop {
    private lastFrame: number;
    private accumulatedDelta: number;

    private readonly FRAME_SIZE: number = 1.0 / 60.0 * 1000.0;
  
    private constructor() {
      this.lastFrame = performance.now();
      this.accumulatedDelta = 0.0;
    }
  
    public static start(game: IGame): void {
      const gameLoop = new GameLoop();
      const renderer = new Renderer(context); 
  
  
      const rafLoop = (perf: number) => {
        gameLoop.processFrame(game, renderer, perf);
  
        // Request next animation frame
        requestAnimationFrame(rafLoop);
      };

      // Start the animation loop
      requestAnimationFrame(rafLoop);
    }
  
    private processFrame(game: IGame, renderer: Renderer, perf: number): void {
      // processInput(keyEventReceiver);
  
      this.accumulatedDelta += perf - this.lastFrame;
      while (this.accumulatedDelta > this.FRAME_SIZE) {
        game.update();
        this.accumulatedDelta -= this.FRAME_SIZE;
      }
      this.lastFrame = performance.now();
      game.draw(renderer);
    }
  }