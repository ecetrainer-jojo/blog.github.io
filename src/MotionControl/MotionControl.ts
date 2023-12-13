import { Character } from '../Character/Character';
import { DirectionKey } from '../DirectionalKey/DirectionKey';
import { TextBoard } from '../TextBoard';
import { Direction, generateRandomDirection } from './Direction';
import { NPC } from '../Character/NPC';
import getRandomTime from '../Util/timeUtil';
import { checkTwoPointsCollide, Coordinate } from '../Util/pointUtil';
import Background from '../Background/backgroud';

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

export default class MotionController {
  enable:boolean;

  character:Character;

  directionKey:DirectionKey;

  background:Background;

  textBoard:TextBoard;

  npcs: NPC[];

  backgroundAction:Record<string, boolean> = {
    up: true,
    down: true,
    left: true,
    right: true,
  };

  // disable the motion capture and prevent the characters (including npc) from moving
  disable() {
    this.enable = false;
  }

  checkCharacterNpcCollide(pos: Coordinate): boolean {
    return this.npcs.some((npc) => checkTwoPointsCollide(pos, [npc.mapX, npc.mapY]));
  }

  // vision control for moving character and background, from perspective of character
  moveUp = () => {
    this.character.changeDirection(Direction.Up);
    // check whether any dialogue will be triggered
    if (this.checkDialogueHandler(this.character.mapX, this.character.mapY - 1)) return;
    if (this.background.checkCollision(this.character.mapX, this.character.mapY - 1)) return;
    if (this.checkCharacterNpcCollide([this.character.mapX, this.character.mapY - 1])) return;
    this.character.mapY -= 1;
    if (this.character.yEquiv() && (this.backgroundAction).up) {
      // In this case background is allowed to move down
      if (!this.background.moveDown()) {
        this.backgroundAction.up = false;
        this.character.moveUp();
      } else {
        this.npcs.forEach((npc) => npc.moveDown());
      }
    } else if (!this.character.moveUp()) {
      this.backgroundAction.down = true;
    }
  };

  moveDown = () => {
    this.character.changeDirection(Direction.Down);
    if (this.background.checkCollision(this.character.mapX, this.character.mapY + 1)) return;
    if (this.checkCharacterNpcCollide([this.character.mapX, this.character.mapY + 1])) return;
    this.character.mapY += 1;
    if (this.character.yEquiv() && this.backgroundAction.down) {
      // In this case background is allowed to move down
      if (!this.background.moveUp()) {
        this.backgroundAction.down = false;
        this.character.moveDown();
      } else {
        this.npcs.forEach((npc) => npc.moveUp());
      }
    } else if (!this.character.moveDown()) {
      this.backgroundAction.up = true;
    }
  };

  moveLeft = () => {
    this.character.changeDirection(Direction.Left);
    if (this.background.checkCollision(this.character.mapX - 1, this.character.mapY)) return;
    if (this.checkCharacterNpcCollide([this.character.mapX - 1, this.character.mapY])) return;
    this.character.mapX -= 1;
    if (this.character.xEquiv() && this.backgroundAction.left) {
      // In this case background is allowed to move down
      if (!this.background.moveRight()) {
        this.backgroundAction.left = false;
        this.character.moveLeft();
      } else {
        this.npcs.forEach((npc) => npc.moveRight());
      }
    } else if (!this.character.moveLeft()) {
      this.backgroundAction.right = true;
    }
  };

  moveRight = () => {
    this.character.changeDirection(Direction.Right);
    if (this.background.checkCollision(this.character.mapX + 1, this.character.mapY)) return;
    if (this.checkCharacterNpcCollide([this.character.mapX + 1, this.character.mapY])) return;
    this.character.mapX += 1;
    if (this.character.xEquiv() && this.backgroundAction.right) {
      // In this case background is allowed to move down
      if (!this.background.moveLeft()) {
        this.backgroundAction.right = false;
        this.character.moveRight();
      } else {
        this.npcs.forEach((npc) => npc.moveLeft());
      }
    } else if (!this.character.moveRight()) {
      this.backgroundAction.left = true;
    }
  };

  initializeMouseTracker() {
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
      console.log(`Coordinate -> ${this.character.mapX}, ${this.character.mapY}`);
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
      this.textBoard.setInputText('Welcome to this Town. Please enjoy your time here and get to know more about me! Welcome to this Town. Please enjoy your time here and get to know more about me! Welcome to this Town. Please enjoy your time here and get to know more about me! Welcome to this Town. Please enjoy your time here and get to know more about me!');
      this.disable();
      this.textBoard.enableDialogue = true;
      return true;
    }
    return false;
  };

  constructor() {
    this.enable = true;
  }

  /**
   * Launches the NPC by setting an interval for NPC movement.
   *
   * @param {NPC} npc - The NPC to be launched.
   */
  npcLaunch(npc: NPC) {
    const setMovingInterval = () => {
      // eslint-disable-next-line no-param-reassign
      npc.intervalId = window.setTimeout(() => {
        npc.setEnableWalk();
        console.log(`NPC coord: ${npc.mapX}, ${npc.mapY}`);
        const direction = generateRandomDirection();
        npc.changeDirection(direction);
        switch (direction) {
          case Direction.Up:
            if (!this.background.checkCollision(npc.mapX, npc.mapY - 1)
            && !checkTwoPointsCollide(
              [this.character.mapX, this.character.mapY],
              [npc.mapX, npc.mapY - 1],
            )) {
              npc.moveUpMap();
            }
            break;
          case Direction.Down:
            if (!this.background.checkCollision(npc.mapX, npc.mapY + 1)
                && !checkTwoPointsCollide(
                  [this.character.mapX, this.character.mapY],
                  [npc.mapX, npc.mapY + 1],
                )) {
              npc.moveDownMap();
            }
            break;
          case Direction.Left:
            if (!this.background.checkCollision(npc.mapX - 1, npc.mapY)
                && !checkTwoPointsCollide(
                  [this.character.mapX, this.character.mapY],
                  [npc.mapX - 1, npc.mapY],
                )) {
              npc.moveLeftMap();
            }
            break;
          case Direction.Right:
            if (!this.background.checkCollision(npc.mapX + 1, npc.mapY)
                && !checkTwoPointsCollide(
                  [this.character.mapX, this.character.mapY],
                  [npc.mapX + 1, npc.mapY],
                )) {
              npc.moveRightMap();
            }
            break;
          default:
            break;
        }
        clearTimeout(npc.intervalId);
        setMovingInterval();
      }, getRandomTime()); // Set random timeout
    };

    setMovingInterval(); // Initialize the first timeout
  }

  initialize(
    character:Character,
    background:Background,
    directionKey:DirectionKey,
    textBoard: TextBoard,
    npcs:NPC[],
  ) {
    // control the on/off event listener
    this.enable = true;
    // get the required element
    this.character = character;
    this.background = background;
    this.directionKey = directionKey;
    this.textBoard = textBoard;
    this.npcs = npcs;

    // start the event listener for keypressing
    this.initializeListener();
    this.initializeMouseTracker();

    // start launching npcs
    npcs.forEach((npc) => this.npcLaunch(npc));
  }
}
