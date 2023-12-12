import { ComponentConstants } from '../ComponentControl/ComponentConstants';
import { Direction } from '../MotionControl/MotionConstants';

interface ArrowKey {
  xStart:number
  xEnd:number
  yStart:number
  yEnd:number
}

/**
 * The DirectionKey class represents a directional control interface element.
 * It is mainly composed of up, down, left and right arrow keys.
 *
 * The class provides properties for handling the directional control aspects,
 * such as each arrow key boundaries for interaction, and graphics for the keys.
 * The arrow keys each have their own boundaries defined, presumably to interact
 * with some kind of input, and there's a method "checkKey" that checks which key
 * was interacted with based on these boundaries.
 *
 * Also included is a method to draw this interface element on a canvas context.
 *
 * It's used mainly for a point-and-click style control, wherein the user interacts
 * with the game GUI to control the entities instead of using traditional keyboard controls.
 *
 * The constructor requests an X and Y coordinate for the placement of the controls
 * on the screen and a HTMLImageElement that serves as the base graphic for the control.
 */

// eslint-disable-next-line import/prefer-default-export
export class DirectionKey {
  xPos: number;

  yPos: number;

  imageElement:HTMLImageElement;

  keySize:number;

  upKey:ArrowKey;

  leftKey:ArrowKey;

  rightKey:ArrowKey;

  downKey:ArrowKey;

  constructor(xPos:number, yPos:number, imageElement:HTMLImageElement) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.imageElement = imageElement;
    this.keySize = ComponentConstants.ARROW_KEY_SIZE;
    this.upKey = {
      xStart: this.xPos + 2 * this.keySize,
      yStart: this.yPos,
      xEnd: this.xPos + 4 * this.keySize,
      yEnd: this.yPos + 2 * this.keySize,
    };
    this.leftKey = {
      xStart: this.xPos,
      yStart: this.yPos + 2 * this.keySize,
      xEnd: this.xPos + 2 * this.keySize,
      yEnd: this.yPos + 4 * this.keySize,
    };
    this.downKey = {
      xStart: this.xPos + 2 * this.keySize,
      yStart: this.yPos + 4 * this.keySize,
      xEnd: this.xPos + 4 * this.keySize,
      yEnd: this.yPos + 6 * this.keySize,
    };
    this.rightKey = {
      xStart: this.xPos + 4 * this.keySize,
      yStart: this.yPos + 2 * this.keySize,
      xEnd: this.xPos + 6 * this.keySize,
      yEnd: this.yPos + 4 * this.keySize,
    };
  }

  draw = (canvasCxt:CanvasRenderingContext2D) => {
    canvasCxt.drawImage(this.imageElement, this.xPos, this.yPos);
  };

  checkKey = (xPos:number, yPos:number) => {
    if (xPos > this.upKey.xStart && xPos < this.upKey.xEnd
        && yPos > this.upKey.yStart && yPos < this.upKey.yEnd) { return Direction.Up; }

    if (xPos > this.leftKey.xStart && xPos < this.leftKey.xEnd
        && yPos > this.leftKey.yStart && yPos < this.leftKey.yEnd) return Direction.Left;

    if (xPos > this.rightKey.xStart && xPos < this.rightKey.xEnd
        && yPos > this.rightKey.yStart && yPos < this.rightKey.yEnd) { return Direction.Right; }

    if (xPos > this.downKey.xStart && xPos < this.downKey.xEnd
        && yPos > this.downKey.yStart && yPos < this.downKey.yEnd) return Direction.Down;
    return 'null';
  };
}
