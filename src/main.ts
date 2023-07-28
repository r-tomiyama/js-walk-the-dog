import { WalkTheDogGame } from './domains/WalkTheDogGame.ts'
import { GameLoop } from './engines/GameLoop.ts';

const game = await WalkTheDogGame.new();
GameLoop.start(game);

