/**
 * The Character class represents a controllable figure on a game screen.
 * It contains properties including the current position,
 * the direction the character is facing, an image element
 * and other properties related to the animation of the character's movement.
 *
 * The class provides methods to draw the character on a canvas context,
 * change the direction the character is facing, and move the character
 * in various directions.
 *
 * The class also provides a way to control the animation frames
 * for creating a walking animation effect.
 *
 * The constructor takes in an x and y coordinate for the initial
 * position of the character and a HTMLImageElement object which
 * is used to draw the character.
 *
 * The class is mainly used for manipulating the state of the character,
 * including its position, orientation and animated state.
 *
 */
import { Direction } from '../MotionControl/Direction';

const CANVAS_UNIT = 32;

// eslint-disable-next-line import/prefer-default-export
export class Character {
  // walkable
  enableWalk:boolean;

  // Character holds an HTML image object
  xPos:number;

  yPos:number;

  originX:number;

  originY:number;

  imageElement:HTMLImageElement;

  direction: string;

  // motion related to crop and render the spreadsheet
  frameNum:number;

  currFrame:number;

  waitFrame:number;

  constructor(xPos:number, yPos:number, imageElement:HTMLImageElement) {
    this.enableWalk = false;
    this.xPos = xPos;
    this.yPos = yPos;
    this.imageElement = imageElement;
    this.direction = Direction.Down;
    this.originX = xPos;
    this.originY = yPos;
    this.frameNum = 4;
    this.currFrame = 0;
    this.waitFrame = 5;
  }

  draw = (canvasCxt:CanvasRenderingContext2D) => {
    canvasCxt.drawImage(
      this.imageElement,
      // eslint-disable-next-line no-mixed-operators
      this.currFrame * this.imageElement.width / this.frameNum,
      0,
      this.imageElement.width / this.frameNum,
      this.imageElement.height,
      this.xPos,
      this.yPos,
      this.imageElement.width / this.frameNum,
      this.imageElement.height,
    );
    // accumulate the frame
    this.frameControl();
    if (this.currFrame === 0 && this.waitFrame === 5 && this.enableWalk) {
      this.enableWalk = false;
    }
  };

  setEnableWalk = () => {
    this.enableWalk = true;
  };

  frameControl = () => {
    if (!this.enableWalk) return;
    this.waitFrame -= 1;
    // eslint-disable-next-line eqeqeq
    if (this.waitFrame == 0) {
      // iterate through the currFrame to make dynamic motion
      if (this.currFrame < this.frameNum - 1) {
        this.currFrame += 1;
      } else {
        this.currFrame = 0;
      }
      this.waitFrame = 5;
    }
  };

  // vision control and picture switch
  changeDirection = (direction:string) => {
    // please put them into constants
    switch (direction) {
      case (Direction.Up):
        this.imageElement.src = 'img/BackWalk.png';
        break;
      case (Direction.Down):
        this.imageElement.src = 'img/FrontWalk.png';
        break;
      case (Direction.Left):
        this.imageElement.src = 'img/LeftWalk.png';
        break;
      case (Direction.Right):
        this.imageElement.src = 'img/RightWalk.png';
        break;
      default:
    }
  };

  // Motion related
  xEquiv = () => this.xPos === this.originX;

  yEquiv = () => this.yPos === this.originY;

  moveDown = () => {
    this.yPos += CANVAS_UNIT;
    return this.yPos !== this.originY;
  };

  moveUp = () => {
    this.yPos -= CANVAS_UNIT;
    return this.yPos !== this.originY;
  };

  moveLeft = () => {
    this.xPos -= CANVAS_UNIT;
    return this.xPos !== this.originX;
  };

  moveRight = () => {
    this.xPos += CANVAS_UNIT;
    return this.xPos !== this.originX;
  };
}
