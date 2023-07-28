import { WalkTheDogGame } from './WalkTheDogGame.ts'
import { GameLoop } from './engines/GameLoop.ts';

const canvas =  document.querySelector<HTMLCanvasElement>('canvas')!;
const game = await WalkTheDogGame.new()

const gameLoop = new GameLoop(canvas.getContext('2d')!, game);
gameLoop.start();

