import { IGame } from "./IGame";
import { KeyState } from "./KeyState";
import { Renderer } from "./Renderer";

export class GameLoop {
    private lastFrame: number;
    private accumulatedDelta: number;
    private readonly game: IGame;
    private readonly renderer: Renderer;
    private readonly keyState: KeyState;

    private readonly FRAME_SIZE: number = 1.0 / 60.0 * 1000.0;
  
    constructor(context: CanvasRenderingContext2D, game: IGame) {
      this.lastFrame = performance.now();
      this.accumulatedDelta = 0.0;
      this.game = game;
      this.renderer = new Renderer(context); 
      this.keyState = new KeyState();
    }
  
    public start(): void {
      this.prepareInput();
  
      const requestAnimationFrameLoop = (perf: number) => {
        this.processFrame(perf);
  
        // Request next animation frame
        requestAnimationFrame(requestAnimationFrameLoop);
      };

      // Start the animation loop
      requestAnimationFrame(requestAnimationFrameLoop);
    }
  
    private processFrame(perf: number): void {  
      this.accumulatedDelta += perf - this.lastFrame;
      while (this.accumulatedDelta > this.FRAME_SIZE) {
        this.game.update(this.keyState);
        this.accumulatedDelta -= this.FRAME_SIZE;
      }
      this.lastFrame = performance.now();
      this.game.draw(this.renderer);
    }

    private prepareInput(): void {
      document.addEventListener("keydown", (keyboardEvent) => {
        this.keyState.setPressed(keyboardEvent.code, keyboardEvent);
      });
      
      document.addEventListener("keyup", (keyboardEvent) => {
        this.keyState.setReleased(keyboardEvent.code);
      });
    } 
  }