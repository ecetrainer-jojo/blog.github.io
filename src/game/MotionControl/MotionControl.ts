import { Character } from '../Character/Character';
import { DirectionKey } from '../DirectionalKey/DirectionKey';
import { TextBoard } from '../TextBoard';
import { Direction, generateRandomDirection } from './Direction';
import { NPC } from '../Character/NPC';
import getRandomTime from '../Util/timeUtil';
import {
  checkCharacterNpcCollide,
  checkHumanCollide, checkStartNpcConversation,
} from '../Util/pointUtil';
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

  character: Character;

  directionKey: DirectionKey;

  background: Background;

  textBoard: TextBoard;

  npcs: NPC[];


  constructor(character:Character,
              background:Background,
              directionKey:DirectionKey,
              textBoard: TextBoard,
              npcs:NPC[],) {
    // control the on/off event listener
    this.enable = true;
    // get the required element
    this.character = character;
    this.background = background;
    this.directionKey = directionKey;
    this.textBoard = textBoard;
    this.npcs = npcs;
  }

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

  // vision control for moving character and background, from perspective of character
  moveUp = () => {
    this.character?.changeDirection(Direction.Up);
    const currCharacterMapX = this.character.mapX;
    const currCharacterMapY = this.character.mapY;
    // check whether any dialogue will be triggered
    if (this.background.checkCollision(currCharacterMapX, currCharacterMapY - 1)) return;
    if (checkCharacterNpcCollide(this.npcs, [currCharacterMapX, currCharacterMapY - 1])) return;
    this.character.mapY -= 1;
    if (this.character.yEquiv() && (this.backgroundAction).up) {
      // In this case background is allowed to move down
      if (!this.background.backgroundMoveDown()) {
        this.backgroundAction.up = false;
        this.character.moveUpRenderingPosition();
      } else {
        this.npcs.forEach((npc) => npc.moveDownRenderingPosition());
      }
    } else if (!this.character.moveUpRenderingPosition()) {
      this.backgroundAction.down = true;
    }
  };

  moveDown = () => {
    this.character.changeDirection(Direction.Down);
    const currCharacterMapX = this.character.mapX;
    const currCharacterMapY = this.character.mapY;
    if (this.background.checkCollision(currCharacterMapX, currCharacterMapY + 1)) return;
    if (checkCharacterNpcCollide(this.npcs, [this.character.mapX, this.character.mapY + 1])) return;
    this.character.mapY += 1;
    if (this.character.yEquiv() && this.backgroundAction.down) {
      // In this case background is allowed to move down
      if (!this.background.backgroundMoveUp()) {
        this.backgroundAction.down = false;
        this.character.moveDownRenderingPosition();
      } else {
        this.npcs.forEach((npc) => npc.moveUpRenderingPosition());
      }
    } else if (!this.character.moveDownRenderingPosition()) {
      this.backgroundAction.up = true;
    }
  };

  moveLeft = () => {
    this.character.changeDirection(Direction.Left);
    const currCharacterMapX = this.character.mapX;
    const currCharacterMapY = this.character.mapY;
    if (this.background.checkCollision(currCharacterMapX - 1, currCharacterMapY)) return;
    if (checkCharacterNpcCollide(this.npcs, [currCharacterMapX - 1, currCharacterMapY])) return;
    this.character.mapX -= 1;
    if (this.character.xEquiv() && this.backgroundAction.left) {
      // In this case background is allowed to move down
      if (!this.background.backgroundMoveRight()) {
        this.backgroundAction.left = false;
        this.character.moveLeftRenderingPosition();
      } else {
        this.npcs.forEach((npc) => npc.moveRightRenderingPosition());
      }
    } else if (!this.character.moveLeftRenderingPosition()) {
      this.backgroundAction.right = true;
    }
  };

  moveRight = () => {
    this.character.changeDirection(Direction.Right);
    const currCharacterMapX = this.character.mapX;
    const currCharacterMapY = this.character.mapY;
    if (this.background.checkCollision(currCharacterMapX + 1, currCharacterMapY)) return;
    if (checkCharacterNpcCollide(this.npcs, [currCharacterMapX + 1, currCharacterMapY])) return;
    this.character.mapX += 1;
    if (this.character.xEquiv() && this.backgroundAction.right) {
      // In this case background is allowed to move down
      if (!this.background.backgroundMoveLeft()) {
        this.backgroundAction.right = false;
        this.character.moveRightRenderingPosition();
      } else {
        this.npcs.forEach((npc) => npc.moveLeftRenderingPosition());
      }
    } else if (!this.character.moveRightRenderingPosition()) {
      this.backgroundAction.left = true;
    }
  };

  initializeMouseTracker() {
    // @ts-ignore
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
      if (event.key === 'Enter') {
        // when no remaining text to present, re-enable
        if (this.textBoard.enableDialogue === true) {
          const result = this.textBoard.enterForNextText();
          if (result === true) {
            this.enable = true;
          }
        } else {
          console.log('Dialogue start');
          this.checkDialogueHandler(
            this.character.mapX,
            this.character.mapY,
            this.character.direction,
          );
          // const currCharacterMapX = this.character.mapX;
          // const currCharacterMapY = this.character.mapY;
          // // eslint-disable-next-line default-case
          // switch (this.character.direction) {
          //   case Direction.Up:
          //     this.checkDialogueHandler(currCharacterMapX, currCharacterMapY - 2);
          //     break;
          //   case Direction.Down:
          //     this.checkDialogueHandler(currCharacterMapX, currCharacterMapY + 2);
          //     break;
          //   case Direction.Left:
          //     this.checkDialogueHandler(currCharacterMapX - 2, currCharacterMapY);
          //     break;
          //   case Direction.Right:
          //     this.checkDialogueHandler(currCharacterMapX + 2, currCharacterMapY);
          //     break;
          // }
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

  checkDialogueHandler = (currX:number, currY:number, direction: string) => {
    const checkDialogueResult = this.background.checkDialogue(currX, currY, direction);
    console.log('checkDialogueHandler');
    console.log(checkDialogueResult);
    if (checkDialogueResult != null) {
      this.textBoard.setInputText('Welcome to this Town. Please enjoy your time here and get to know more about me! Welcome to this Town. Please enjoy your time here and get to know more about me! Welcome to this Town. Please enjoy your time here and get to know more about me! Welcome to this Town. Please enjoy your time here and get to know more about me!');
      this.disable();
      this.textBoard.enableDialogue = true;
      return true;
    }
    const facedToNpc = checkStartNpcConversation(this.character, this.npcs);
    if (facedToNpc) {
      this.textBoard.setInputText(facedToNpc.name);
      this.disable();
      this.textBoard.enableDialogue = true;
      return true;
    }
    return false;
  };

  /**
   * Launches the NPC by setting an interval for NPC movement.
   *
   * @param {NPC} npc - The NPC to be launched.
   */
  npcLaunch(npc: NPC) {
    const setMovingInterval = () => {
      // eslint-disable-next-line no-param-reassign
      npc.intervalId = window.setTimeout(() => {
        if (this.enable) {
          npc.setEnableWalk();
          const direction = generateRandomDirection();
          npc.changeDirection(direction);
          switch (direction) {
            case Direction.Up:
              if (!this.background.checkCollision(npc.mapX, npc.mapY - 1)
                  && !checkHumanCollide(
                    [this.character.mapX, this.character.mapY],
                    [npc.mapX, npc.mapY - 1],
                  )) {
                npc.moveUpMap();
              }
              break;
            case Direction.Down:
              if (!this.background.checkCollision(npc.mapX, npc.mapY + 1)
                  && !checkHumanCollide(
                    [this.character.mapX, this.character.mapY],
                    [npc.mapX, npc.mapY + 1],
                  )) {
                npc.moveDownMap();
              }
              break;
            case Direction.Left:
              if (!this.background.checkCollision(npc.mapX - 1, npc.mapY)
                  && !checkHumanCollide(
                    [this.character.mapX, this.character.mapY],
                    [npc.mapX - 1, npc.mapY],
                  )) {
                npc.moveLeftMap();
              }
              break;
            case Direction.Right:
              if (!this.background.checkCollision(npc.mapX + 1, npc.mapY)
                  && !checkHumanCollide(
                    [this.character.mapX, this.character.mapY],
                    [npc.mapX + 1, npc.mapY],
                  )) {
                npc.moveRightMap();
              }
              break;
            default:
              break;
          }
        }
        clearTimeout(npc.intervalId);
        setMovingInterval();
      }, getRandomTime()); // Set random timeout
    };

    setMovingInterval(); // Initialize the first timeout
  }

  initialize() {
    // start the event listener for keypressing
    this.initializeListener();
    this.initializeMouseTracker();

    // start launching npcs
    this.npcs.forEach((npc) => this.npcLaunch(npc));
  }
}
