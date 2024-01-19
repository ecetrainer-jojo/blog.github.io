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
import { ComponentConstants as constant } from '../ComponentControl/ComponentConstants';
import frontWalkImg from '../img/FrontWalk.png'
import backWalkImg from '../img/BackWalk.png'
import leftWalkImg from '../img/LeftWalk.png'
import rightWalkImg from '../img/RightWalk.png'
import loadImage from "../Util/imageUtil";

const CANVAS_UNIT = 32;

/* eslint-disable no-mixed-operators */
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

  // mapX and mapY are the global Map related Pos
  // Take account of Character rendering position
  // and background shift position
  mapX: number;

  mapY: number;

  // walking images
  frontWalkImg: HTMLImageElement | undefined;
  backWalkImg: HTMLImageElement | undefined;
  leftWalkImg: HTMLImageElement | undefined;
  rightWalkImg: HTMLImageElement | undefined;


  constructor(xPos:number, yPos:number, imageElement: HTMLImageElement) {
    console.log("entering the character initialization")
    this.enableWalk = false;
    this.xPos = xPos;
    this.yPos = yPos;
    this.direction = Direction.Down;
    this.originX = xPos;
    this.originY = yPos;
    this.frameNum = 4;
    this.currFrame = 0;
    this.waitFrame = 5;
    // eslint-disable-next-line no-mixed-operators
    this.mapX = -1 * constant.INIT_PALLET_X / 32 + this.xPos / 32;
    this.mapY = -1 * constant.INIT_PALLET_Y / 32 + this.yPos / 32;
    this.imageElement = imageElement
  }

  async initialize(){
    this.frontWalkImg = await loadImage(frontWalkImg)
    this.backWalkImg = await loadImage(backWalkImg);
    this.leftWalkImg = await loadImage(leftWalkImg);
    this.rightWalkImg = await loadImage(rightWalkImg);
  }

  draw = (canvasCxt:CanvasRenderingContext2D) => {
    canvasCxt.drawImage(
      this.imageElement!!,
      // eslint-disable-next-line no-mixed-operators
      this.currFrame * this.imageElement!!.width / this.frameNum,
      0,
      this.imageElement!!.width / this.frameNum,
      this.imageElement!!.height,
      this.xPos,
      this.yPos,
      this.imageElement!!.width / this.frameNum,
      this.imageElement!!.height,
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
    this.direction = direction;
    // please put them into constants
    switch (direction) {
      case (Direction.Up):
        this.imageElement = this.backWalkImg!!
        break;
      case (Direction.Down):
        this.imageElement = this.frontWalkImg!!
        break;
      case (Direction.Left):
        this.imageElement = this.leftWalkImg!!
        break;
      case (Direction.Right):
        this.imageElement = this.rightWalkImg!!
        break;
      default:
    }
  };

  // Motion related
  xEquiv = () => this.xPos === this.originX;

  yEquiv = () => this.yPos === this.originY;

  moveDownRenderingPosition() {
    this.yPos += CANVAS_UNIT;
    return this.yPos !== this.originY;
  }

  moveUpRenderingPosition() {
    this.yPos -= CANVAS_UNIT;
    return this.yPos !== this.originY;
  }

  moveLeftRenderingPosition() {
    this.xPos -= CANVAS_UNIT;
    return this.xPos !== this.originX;
  }

  moveRightRenderingPosition() {
    this.xPos += CANVAS_UNIT;
    return this.xPos !== this.originX;
  }
}
