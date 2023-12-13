import { Background } from '../Background/backgroud';
import { Character } from '../Character/Character';
import { DirectionKey } from '../DirectionalKey/DirectionKey';
import { TextBoard } from '../TextBoard';
import { ComponentConstants as constant } from './ComponentConstants';
import loadImage from '../Util/imageUtil';
import { NPC } from '../Character/NPC';

/**
 * The ComponentController class orchestrates the initialization and animation
 * of various game components - Background, Character, DirectionKey, and TextBoard.
 *
 * It contains properties for each game component and a canvas context for rendering.
 *
 * The class provides methods for initialization of game components where it instantiates
 * components, sets up their individual properties, and ties them with the necessary resources.
 *
 * The animate method is responsible for repeatedly rendering the game components on each
 * animation frame, thereby driving the entire game loop.
 *
 * The constructor of the class sets up the canvas context
 * where all the components will be rendered.
 *
 * This class essentially bridges together various game components, manages their lifecycle,
 * and controls their render on the canvas, making it a crucial part of the game engine.
 */

// eslint-disable-next-line import/prefer-default-export
export class ComponentController {
  canvasCxt:CanvasRenderingContext2D;

  background:Background;

  character:Character;

  directionKey:DirectionKey;

  textBoard:TextBoard;

  npcs: NPC[];

  constructor() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.canvasCxt = document.querySelector('canvas').getContext('2d')!;
  }

  initialize = async () => {
    this.background = new Background(
      constant.INIT_PALLET_X,
      constant.INIT_PALLET_Y,
      await loadImage(constant.DEFAULT_BACKGROUND_IMG),
      constant.PALLET_TOWN_RESOURCE,
    );

    this.character = new Character(
      constant.INIT_CHARACTER_X,
      constant.INIT_CHARACTER_Y,
      await loadImage(constant.DEFAULT_CHARACTER_IMG),
    );

    this.npcs = [new NPC(
      'Test',
      10 * 32,
      15 * 32,
      await loadImage(constant.DEFAULT_CHARACTER_IMG),
      this.background,
    )];

    this.directionKey = new DirectionKey(
      constant.INIT_DIRECTION_KEY_X,
      constant.INIT_DIRECTION_KEY_Y,
      await loadImage(constant.DEFAULT_ARROW_KEY_IMG),
    );

    this.textBoard = new TextBoard(
      await loadImage(constant.DEFAULT_DIALOG_IMG),
      this.canvasCxt,
    );
    this.animate();
  };

  // rendering out the pictures
  animate = () => {
    window.requestAnimationFrame(this.animate);
    this.background.draw(this.canvasCxt);
    this.character.draw(this.canvasCxt);
    this.directionKey.draw(this.canvasCxt);
    this.textBoard.draw();
    this.npcs.forEach(((npc) => npc.draw(this.canvasCxt)));
  };
}
