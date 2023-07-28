import { context } from "../utils";
import { IGame } from "./IGame";
import { KeyState } from "./KeyState";
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

      const keyState = new KeyState();
      gameLoop.prepareInput(keyState);
  
      const rafLoop = (perf: number) => {
        gameLoop.processFrame(game, renderer, perf, keyState);
  
        // Request next animation frame
        requestAnimationFrame(rafLoop);
      };

      // Start the animation loop
      requestAnimationFrame(rafLoop);
    }
  
    private processFrame(game: IGame, renderer: Renderer, perf: number, keyState: KeyState): void {  
      this.accumulatedDelta += perf - this.lastFrame;
      while (this.accumulatedDelta > this.FRAME_SIZE) {
        game.update(keyState);
        this.accumulatedDelta -= this.FRAME_SIZE;
      }
      this.lastFrame = performance.now();
      game.draw(renderer);
    }

    private prepareInput(keyState: KeyState): void {
      document.addEventListener("keydown", (keyboardEvent) => {
        keyState.setPressed(keyboardEvent.code, keyboardEvent);
      });
      
      document.addEventListener("keyup", (keyboardEvent) => {
        keyState.setReleased(keyboardEvent.code);
      });
    } 
  }