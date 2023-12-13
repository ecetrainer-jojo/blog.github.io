import { Character } from './Character';

// eslint-disable-next-line import/prefer-default-export
export class NPC extends Character {
  // You can add specific properties for NPC here.
  name: string;

  intervalId: number;

  constructor(
    name: string,
    xPos: number,
    yPos: number,
    imageElement: HTMLImageElement,
  ) {
    // so it is used to call the Character constructor from within NPC constructor.
    super(xPos, yPos, imageElement);
    // NPC specific property initialization
    this.name = name;
  }

  moveUpMap = () => {
    this.mapY -= 1;
    return this.moveUp();
  };

  moveDownMap = () => {
    this.mapY += 1;
    return this.moveDown();
  };

  moveLeftMap = () => {
    this.mapX -= 1;
    return this.moveLeft();
  };

  moveRightMap = () => {
    this.mapX += 1;
    return this.moveRight();
  };
}
