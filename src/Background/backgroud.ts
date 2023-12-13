import { ComponentConstants } from '../ComponentControl/ComponentConstants';
import { CANVAS_HEIGHT_DEFAULT, CANVAS_WIDTH_DEFAULT } from '../constants';
import { MapLayer, MapLayers } from '../Models/mapLayer';
import { checkTwoPointsCollide, Coordinate } from '../Util/pointUtil';

/**
 * The Background class represents the background of a game screen.
 *
 * It contains properties for the x and y coordinates and an image element.
 * It also includes arrays for collision coordinates and dialogue map coordinates.
 *
 * The class provides methods to draw the background, move the vision on the screen,
 * check for collisions at given coordinates, and check for dialogue triggers.
 *
 * It also includes methods to extract collision and dialogue maps from provided static
 * data.
 *
 * This class is the primary means of navigating through the 2D grid of the game while
 * managing collisions and dialogues.
 */
export default class Background {
  xPos: number;

  yPos: number;

  imageElement:HTMLImageElement;

  // each background have their own layer settings
  collisionArray:Coordinate[] = [];

  dialogueMap:Map<number, Coordinate[]>;

  // extract the collision Map, targeted collision
  /**
   * Extracts the collision map from the given background map information.
   * The collision map is a 2D array of coordinate pairs indicating the positions
   * where collisions occur in the map.
   *
   * @param {Record<string, unknown>} backgroundMapInfo - The background map information
   */
  extractCollisionMap = (backgroundMapInfo:Record<string, unknown>) => {
    const rawCollisionData = (backgroundMapInfo.layers as Array<MapLayer>).filter((element) => element.name === 'Collision')[0];
    for (let i = 0; i < rawCollisionData.data.length; i += 1) {
      if (rawCollisionData.data[i] !== 0) {
        this.collisionArray.push(
          [i % rawCollisionData.width, Math.trunc(i / rawCollisionData.width)],
        );
      }
    }
  };

  /**
   * Extracts dialogue map from given background map information.
   *
   * @param {Record<string, unknown>} backgroundMapInfo - The background map information.
   * @returns {void}
   */
  extractDialogueMap = (backgroundMapInfo:Record<string, unknown>): void => {
    const rawDialogue = (backgroundMapInfo.layers as Array<MapLayers>).filter((element) => element.name === 'Dialogue_Group')[0].layers;
    rawDialogue.forEach((dialogueLayer) => {
      const layerKey = Number(dialogueLayer.name);
      const dialogueBlock: Coordinate[] = [];
      for (let i = 0; i < dialogueLayer.data.length; i += 1) {
        if (dialogueLayer.data[i] !== 0) {
          dialogueBlock.push([Math.trunc(i / dialogueLayer.width), i % dialogueLayer.width]);
        }
      }
      this.dialogueMap.set(layerKey, dialogueBlock);
    });
  };

  /**
   * Draws an image on the canvas context at a specified position.
   *
   * @param {CanvasRenderingContext2D} canvasCxt - The canvas context on which to draw the image.
   */
  draw = (canvasCxt:CanvasRenderingContext2D) => {
    canvasCxt.drawImage(this.imageElement, this.xPos, this.yPos);
  };

  // vision control
  moveDown = () => {
    if (this.yPos !== 0) {
      this.yPos += ComponentConstants.CANVAS_UNIT;
      return true;
    }
    return false;
  };

  moveUp = () => {
    if (this.yPos + this.imageElement.height !== CANVAS_HEIGHT_DEFAULT) {
      this.yPos -= ComponentConstants.CANVAS_UNIT;
      return true;
    }
    return false;
  };

  moveLeft = () => {
    if (this.xPos + this.imageElement.width !== CANVAS_WIDTH_DEFAULT) {
      this.xPos -= ComponentConstants.CANVAS_UNIT;
      return true;
    }
    return false;
  };

  moveRight = () => {
    if (this.xPos !== 0) {
      this.xPos += ComponentConstants.CANVAS_UNIT;
      return true;
    }
    return false;
  };

  /**
   * Checks if there is a collision at the specified coordinates.
   *
   * @param {number} currX - The current X coordinate.
   * @param {number} currY - The current Y coordinate.
   * @returns {boolean} - true if there is a collision, false otherwise.
   */
  checkCollision = (currX:number, currY:number): boolean => {
    for (let i = 0; i < this.collisionArray.length; i += 1) {
      const collisionItem = this.collisionArray[i];
      if (checkTwoPointsCollide(collisionItem, [currX, currY])) return true;
    }
    return false;
  };

  /**
   * Searches for a key in a dialogue map that matches the given coordinates.
   * @param {number} currX - The current x-coordinate to match.
   * @param {number} currY - The current y-coordinate to match.
   * @returns {number | null} - The key that matches the coordinates, or null if no match is found.
   */
  checkDialogue = (currX:number, currY:number): number | null => {
    let keyResult: number | null = null;
    this.dialogueMap.forEach((value, key) => {
      value.forEach((coordinate) => {
        if (coordinate[0] === currY && coordinate[1] === currX) {
          keyResult = key;
        }
      });
    });
    return keyResult;
  };

  constructor(
    xPos:number,
    yPos:number,
    imageElement:HTMLImageElement,
    backgroundMapInfo:Record<string, unknown>,
  ) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.imageElement = imageElement;
    this.dialogueMap = new Map<number, Coordinate[]>();
    this.extractCollisionMap(backgroundMapInfo);
    this.extractDialogueMap(backgroundMapInfo);
  }
}
