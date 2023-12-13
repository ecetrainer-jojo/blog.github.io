import { Character } from './Character';
import { Direction, generateRandomDirection } from '../MotionControl/Direction';
import getRandomTime from '../Util/timeUtil';
import { Background } from '../Background/backgroud';

// eslint-disable-next-line import/prefer-default-export
export class NPC extends Character {
  // You can add specific properties for NPC here.
  name: string;

  intervalId: number;

  // mapX and mapY are the global Map related Pos
  // Take account of Character rendering position
  // and background shift position
  mapX: number;

  mapY: number;

  startMoving(background: Background) {
    const setMovingInterval = () => {
      this.intervalId = window.setTimeout(() => {
        this.setEnableWalk();
        const direction = generateRandomDirection();
        this.changeDirection(direction);
        this.mapX = this.xPos - background.xPos;
        this.mapY = this.yPos - background.yPos;
        switch (direction) {
          case Direction.Up:
            if (!background.checkCollision(this.mapX / 32, this.mapY / 32 - 1)) {
              this.moveUp();
            }
            break;
          case Direction.Down:
            if (!background.checkCollision(this.mapX / 32, this.mapY / 32 + 1)) {
              this.moveDown();
            }
            break;
          case Direction.Left:
            if (!background.checkCollision(this.mapX / 32 - 1, this.mapY / 32)) {
              this.moveLeft();
            }
            break;
          case Direction.Right:
            if (!background.checkCollision(this.mapX / 32 + 1, this.mapY / 32)) {
              this.moveRight();
            }
            break;
          default:
            break;
        }
        clearTimeout(this.intervalId);
        setMovingInterval();
      }, getRandomTime()); // Set random timeout
    };

    setMovingInterval(); // Initialize the first timeout
  }

  constructor(
    name: string,
    xPos: number,
    yPos: number,
    imageElement: HTMLImageElement,
    background:Background,
  ) {
    // so it is used to call the Character constructor from within NPC constructor.
    super(xPos, yPos, imageElement);
    // NPC specific property initialization
    this.name = name;
    this.startMoving(background);
  }
}
