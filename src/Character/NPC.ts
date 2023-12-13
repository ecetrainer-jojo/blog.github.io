import { Character } from './Character';
import { Direction, generateRandomDirection } from '../MotionControl/Direction';

// eslint-disable-next-line import/prefer-default-export
export class NPC extends Character {
  // You can add specific properties for NPC here.
  name: string;

  intervalId: number;

  startMoving() {
    this.intervalId = window.setInterval(() => {
      console.log('Should have a random movement')
      const direction = generateRandomDirection();
      this.changeDirection(direction);

      switch (direction) {
        case Direction.Up:
          this.moveUp();
          break;
        case Direction.Down:
          this.moveDown();
          break;
        case Direction.Left:
          this.moveLeft();
          break;
        case Direction.Right:
          this.moveRight();
          break;

          // Remember to handle default case for good practice
        default:
          break;
      }
    }, 5000); // 5000 milliseconds = 5 seconds
  }

  constructor(name: string, xPos: number, yPos: number, imageElement: HTMLImageElement) {
    // so it is used to call the Character constructor from within NPC constructor.
    super(xPos, yPos, imageElement);
    // NPC specific property initialization
    this.name = name;
    this.startMoving();
  }
}
