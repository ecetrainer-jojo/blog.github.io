import { Background } from '../Background/backgroud';
import { Character } from '../Character/Character';
import { Direction } from './MotionConstants';
import { ComponentConstants as constant } from '../ComponentControl/ComponentConstants';
import { DirectionKey } from '../DirectionalKey/DirectionKey';
import { TextBoard } from '../TextBoard';
/* eslint-disable no-mixed-operators */

/**
 * The MotionController class orchestrates the motion aspects in the game.
 * It manages movements (both direction and pace) of a central character
 * and its position within a background.
 *
 * It contains properties to regulate the movement, references
 * to the Character, Background, DirectionKey, and TextBoard objects.
 * The controller also maintains a state that permits or prohibits the character's movement.
 *
 * The class provides methods to initialize mouse tracking and keyboard
 * listening, manage direction-based movements,
 * evaluate dialogue interactions on movement, and to disable movements.
 * Various movement methods (moveUp, moveDown, moveLeft, moveRight) control the character
 * direction as well as manage the corresponding visual and collider aspects with the background.
 *
 * The constructor of the class sets the initial state of movement enablement,
 * and an initialize function is used to link the controller with the
 * characters, background, and controls it will manage.
 *
 * This class behaves like a hub for controlling and coordinating the
 * user-interactive motion aspects within the game.
 */
// eslint-disable-next-line import/prefer-default-export
export class MotionController {
  enable:boolean;

  character:Character;

  directionKey:DirectionKey;

  background:Background;

  textBoard:TextBoard;

  mapX:number;

  mapY:number;

  backgroundAction:Record<string, boolean> = {
    up: true,
    down: true,
    left: true,
    right: true,
  };

  // disable the motion capture and prevent the character from moving
  disable() {
    this.enable = false;
  }

  // vision control for moving character and background, from perspective of character
  moveUp = () => {
    this.character.changeDirection(Direction.Up);
    // check whether any dialogue will be triggered
    if (this.checkDialogueHandler(this.mapX, this.mapY - 1)) return;
    if (this.background.checkCollision(this.mapX, this.mapY - 1)) return;
    // check for collision TDD
    this.mapY -= 1;
    if (this.character.yEquiv() && (this.backgroundAction).up) {
      // In this case background is allowed to move down
      if (!this.background.moveDown()) {
        this.backgroundAction.up = false;
        this.character.moveUp();
      }
    } else if (!this.character.moveUp()) {
      this.backgroundAction.down = true;
    }
  };

  moveDown = () => {
    this.character.changeDirection(Direction.Down);
    if (this.background.checkCollision(this.mapX, this.mapY + 1)) return;
    this.mapY += 1;
    // check for collsion TDD
    if (this.character.yEquiv() && this.backgroundAction.down) {
      // In this case backrgound is allowed to move down
      if (!this.background.moveUp()) {
        this.backgroundAction.down = false;
        this.character.moveDown();
      }
    } else if (!this.character.moveDown()) {
      this.backgroundAction.up = true;
    }
  };

  moveLeft = () => {
    this.character.changeDirection(Direction.Left);
    if (this.background.checkCollision(this.mapX - 1, this.mapY)) return;
    this.mapX -= 1;
    if (this.character.xEquiv() && this.backgroundAction.left) {
      // In this case background is allowed to move down
      if (!this.background.moveRight()) {
        this.backgroundAction.left = false;
        this.character.moveLeft();
      }
    } else if (!this.character.moveLeft()) {
      this.backgroundAction.right = true;
    }
  };

  moveRight = () => {
    this.character.changeDirection(Direction.Right);
    if (this.background.checkCollision(this.mapX + 1, this.mapY)) return;
    this.mapX += 1;
    if (this.character.xEquiv() && this.backgroundAction.right) {
      // In this case background is allowed to move down
      if (!this.background.moveLeft()) {
        this.backgroundAction.right = false;
        this.character.moveRight();
      }
    } else if (!this.character.moveRight()) {
      this.backgroundAction.left = true;
    }
  };

  iniializeMouseTracker() {
    document.querySelector('canvas').addEventListener('mousedown', (event) => {
      if (!this.enable) return;
      switch (this.directionKey.checkKey(event.clientX, event.clientY)) {
        case (Direction.Up): {
          this.character.setEnableWalk();
          this.moveUp();
          break;
        }
        case (Direction.Down): {
          this.character.setEnableWalk();
          this.moveDown();
          break;
        }
        case (Direction.Left): {
          this.character.setEnableWalk();
          this.moveLeft();
          break;
        }
        case (Direction.Right): {
          this.character.setEnableWalk();
          this.moveRight();
          break;
        }
        default:
      }
    });
  }

  initializeListener() {
    window.addEventListener('keydown', (event) => {
      console.log(`Coordinate -> ${this.mapX}, ${this.mapY}`);
      if (event.key === 'Enter' && this.textBoard.enableDialogue === true) {
        // when no remaining text to present, re-enable
        if (this.textBoard.enterForNextText()) {
          this.enable = true;
        }
      }
      if (!this.enable) return;
      if (event.key === 'w' || event.key === 'ArrowUp') {
        this.character.setEnableWalk();
        this.moveUp();
      } else if (event.key === 's' || event.key === 'ArrowDown') {
        this.character.setEnableWalk();
        this.moveDown();
      } else if (event.key === 'a' || event.key === 'ArrowLeft') {
        this.character.setEnableWalk();
        this.moveLeft();
      } else if (event.key === 'd' || event.key === 'ArrowRight') {
        this.character.setEnableWalk();
        this.moveRight();
      }
    });
  }

  checkDialogueHandler = (currX:number, currY:number) => {
    console.log('Entering the dialogue handler');
    const checkDialogueResult = this.background.checkDialogue(currX, currY);
    if (checkDialogueResult != null) {
      console.log(`Dialogue ${checkDialogueResult} will be triggered`);
      this.textBoard.setInputText('Welcome to this Town. Please enjoy your time here and get to know more about me!');
      this.disable();
      this.textBoard.enableDialogue = true;
      return true;
    }
    return false;
  };

  constructor() {
    this.enable = true;
  }

  // eslint-disable-next-line max-len
  initialize(character:Character, background:Background, directionKey:DirectionKey, textBoard: TextBoard) {
    // control the on/off event listener
    this.enable = true;
    // get the required element
    this.character = character;
    this.background = background;
    this.directionKey = directionKey;
    this.textBoard = textBoard;
    this.mapX = -1 * constant.INIT_PALLET_X / 32 + constant.INIT_CHARACTER_X / 32;
    this.mapY = -1 * constant.INIT_PALLET_Y / 32 + constant.INIT_CHARACTER_Y / 32;

    // start the event listener for keypressing
    this.initializeListener();
    this.iniializeMouseTracker();
  }
}
